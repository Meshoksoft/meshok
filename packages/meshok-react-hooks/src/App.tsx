import React from "react";
import "./App.css";
import { TodoItem } from "./components/TodoItem";
import { rootTodoItemData } from "meshok-e2e";

export function App(): JSX.Element {
	return <TodoItem itemData={rootTodoItemData} />;
}
