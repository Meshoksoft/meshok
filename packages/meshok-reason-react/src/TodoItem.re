
let createTodoItem = ref((~itemData as _) => ReasonReact.null);

module TodoItem = {
	type state = {
		showChildren: bool,
		editTitle: bool,
	};

	type action = ToggleChildrenVisibility;

	let rec make = (~itemData as { title, children }: Common.todo, _) => {
		...ReasonReact.reducerComponent("TodoItem"),

		initialState: () => {
			showChildren: true,
			editTitle: false,
		},

		reducer: (action, state) =>
			switch (action) {
			| ToggleChildrenVisibility =>
				ReasonReact.Update(
					{...state, showChildren: !state.showChildren}
				)
			},

		render: self =>
			<>
				{renderTitle(
					self,
					~title,
					~editTitle=self.state.editTitle,
					~children
				)}
				{renderChildren(
					self,
					~children
				)}
			</>,
	}

	and renderTitle = (self, ~title, ~editTitle, ~children) =>
		switch (title) {
		| None => ReasonReact.null;
		| Some(title) =>
			<>
				{renderTitleText(self, ~title, ~editTitle)}
				{renderTitleButtons(self, ~children)}
			</>
		}

	and renderTitleText = (_self, ~title, ~editTitle) =>
		<label>
			{editTitle
				? <input type_="text" defaultValue={title} />
				: title |> ReasonReact.string}
		</label>

	and renderTitleButtons = (self, ~children) =>
		switch(children) {
		| [||] => ReasonReact.null;
		| _ =>
			<button onClick=(_ => self.send(ToggleChildrenVisibility))>{
				(self.state.showChildren ? "Hide" : "Show")	++ " children"
					|> ReasonReact.string
			}</button>;
		}

	and renderChildren = (self, ~children) =>
		switch(self.state.showChildren, children) {
			| (false, _) | (_, [||]) => ReasonReact.null;
			| _ =>
				<ul>{
					children
					|> Array.mapi((i, child) =>
						<li key={i |> string_of_int}>
							/* <TodoItem itemData={child} /> */
							{createTodoItem^(~itemData=child)}
						</li>,
					)
					|> ReasonReact.array
				}</ul>;
		}
};

createTodoItem :=
	(~itemData) => TodoItem.make([], ~itemData) |> ReasonReact.element;
