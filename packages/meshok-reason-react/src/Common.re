type todo = {
	title: option(string),
	editTitle: bool,
	showChildren: bool,
	children: list(todo),
};

[@bs.deriving abstract]
type todoJs = {
	[@bs.optional] title: string,
	[@bs.optional] editTitle: bool,
	[@bs.optional] showChildren: bool,
	[@bs.optional] children: array(todoJs),
};

let rec todoFromJs = (td: todoJs): todo => {
	title: td->titleGet,
	editTitle: td->editTitleGet |> Belt.Option.getWithDefault(_, false),
	showChildren: td->showChildrenGet |> Belt.Option.getWithDefault(_, true),
	children:
		switch(td->childrenGet) {
		| None => [];
		| Some(children) => children |> Array.to_list |> List.map(todoFromJs);
		},
};

[@bs.val] [@bs.module "meshok-e2e"]
external rootTodoItemDataJs: todoJs = "rootTodoItemData";
let rootTodoItemData: todo = rootTodoItemDataJs |> todoFromJs;
