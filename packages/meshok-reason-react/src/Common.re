type todo = {
	title: option(string),
	children: array(todo),
};

[@bs.deriving abstract]
type todoJs = {
	[@bs.optional] title: string,
	[@bs.optional] children: array(todoJs),
};

let rec todoFromJs = (td: todoJs): todo => {
	title: td->titleGet,
	children:
		switch(td->childrenGet) {
		| None => [||];
		| Some(children) => children |> Array.map(todoFromJs);
		},
};

[@bs.val] [@bs.module "meshok-e2e"]
external rootTodoItemDataJs: todoJs = "rootTodoItemData";
let rootTodoItemData: todo = rootTodoItemDataJs |> todoFromJs;
