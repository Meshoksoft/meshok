import React from "react";
import "./App.css";
import { TodoTree } from "./components/TodoItem";
import { rootTodoItemData } from "meshok-e2e";

export function App(): JSX.Element {
	return <TodoTree initData={rootTodoItemData} />;
}
