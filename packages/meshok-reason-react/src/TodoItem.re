
let createTodoItem = ref((~itemData as _) => ReasonReact.null);

module TodoItem = {
	let isEditing = false;

	let rec make = (~itemData as { title, children }: Common.todo, _) => {
		...ReasonReact.statelessComponent("TodoItem"),
		render: _ =>
			<> {renderTitle(~title, ~isEditing)} {renderChildren(~children)} </>
	}

	and renderTitle = (~title, ~isEditing) =>
		switch (title, isEditing) {
		| (None, _) => ReasonReact.null;
		| (Some(title), false) => <label>{title |> ReasonReact.string}</label>;
		| (Some(title), true) =>
			<label><input type_="text" defaultValue={title} /></label>;
		}

	and renderChildren = (~children) =>
		switch (children) {
		| None => ReasonReact.null;
		| Some([||]) => ReasonReact.null;
		| Some(children) =>
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
}

createTodoItem := (~itemData) => TodoItem.make([], ~itemData) |> ReasonReact.element;
