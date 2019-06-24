import React from "react";

import { connectReduxDevtools } from "mst-middlewares";

import "./App.css";
import { TodoItem } from "./components/TodoItem";
import { Todo } from "./model/Todo";
import { rootTodoItemData } from "meshok-e2e";

export function App(): JSX.Element {
	const rootTodo = Todo.create(rootTodoItemData);
	connectReduxDevtools(require("remotedev"), rootTodo);
	(window as any).rootTodo = rootTodo;

	return <TodoItem itemData={rootTodo} />;
}
