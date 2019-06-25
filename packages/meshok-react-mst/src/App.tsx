import React from "react";

import { connectReduxDevtools } from "mst-middlewares";

import "./App.css";
import { TodoItem } from "./components/TodoItem";
import { Todo } from "./model/Todo";
import { rootTodoItemData } from "meshok-e2e";

export function App(): JSX.Element {
	const rootTodo = Todo.create(rootTodoItemData);

	if (process.env.NODE_ENV === "development") {
		connectReduxDevtools(require("remotedev"), rootTodo);
		(window as any).rootTodo = rootTodo;
		(window as any).mst = require("mobx-state-tree");
	}

	return <TodoItem itemData={rootTodo} />;
}
