
let createTodoItem =
	ref((~itemData as _, ~setItemData as _) => ReasonReact.null);

module TodoItem = {
	type state = {
		itemData: option(Common.todo),
	};

	type action =
		| ChangeItemData(Common.todo);

	let rec make = (
		~itemData: Common.todo,
		~setItemData: option(Common.todo => unit) = None,
		_,
	) => {
		...ReasonReact.reducerComponent("TodoItem"),

		initialState: () => {
			itemData: {
				let isRoot = setItemData == None;
				isRoot ? Some(itemData) : None;
			},
		},

		reducer: (action, _state) =>
			switch (action) {
			| ChangeItemData(itemData) =>
				ReasonReact.Update({/*...state,*/ itemData: Some(itemData)})
			},

		render: self => {
			let itemData =
				Belt.Option.getWithDefault(self.state.itemData, itemData);

			let setItemData = Belt.Option.getWithDefault(
				setItemData,
				itemData => {
					Js.log(itemData);
					self.send(ChangeItemData(itemData));
				}
			);

			<>
				{renderTitle(~itemData, ~setItemData)}
				{renderChildren(~itemData, ~setItemData)}
			</>;
		},
	}

	and renderTitle = (
		~itemData, ~setItemData
	) => {
		let {title, editTitle}: Common.todo = itemData;

		switch (title) {
		| None => ReasonReact.null;
		| Some(title) =>
			<>
				{renderTitleText(~title, ~editTitle)}
				{renderTitleButtons(~itemData, ~setItemData)}
			</>;
		};
	}

	and renderTitleText = (~title, ~editTitle) =>
		<label>{
			editTitle
				? <input type_="text" defaultValue={title} />
				: title |> ReasonReact.string
		}</label>

	and renderTitleButtons = (~itemData, ~setItemData) => {
		let {showChildren, children}: Common.todo = itemData;

		switch(children) {
		| [] => ReasonReact.null;
		| _ =>
			<button onClick=(_ => setItemData(
				{ ...itemData, showChildren: !showChildren }
			))>{
				(showChildren ? "Hide" : "Show") ++ " children"
					|> ReasonReact.string
			}</button>;
		};
	}

	and renderChildren = (~itemData, ~setItemData) => {
		let {showChildren, children}: Common.todo = itemData;

		let setNChildrenData = (n, childrenData) => {
			setItemData({
				...itemData,
				children: children
					|> Lib.setNElementOfList(n, childrenData)
					|> Belt.Option.getExn,
			})
		};

		switch(showChildren, children) {
			| (false, _) | (_, []) => ReasonReact.null;
			| (true, children) =>
				<ul>...{
					children
					|> List.mapi((i, child) =>
						<li key={i |> string_of_int}>
							/* <TodoItem itemData={child} /> */
							{createTodoItem^(
								~itemData = child,
								~setItemData = Some(setNChildrenData(i)),
							)}
						</li>,
					)
					|> Array.of_list
				}</ul>;
		}
	};
};

createTodoItem :=
	(~itemData, ~setItemData) =>
		TodoItem.make([], ~itemData, ~setItemData) |> ReasonReact.element;
