import React from "react";
import "./App.css";
import { TodoItem } from "./components/TodoItem";
import { rootItemData } from "meshok-common/testData/rootItemData";

export function App(): JSX.Element {
	return <TodoItem itemData={rootItemData} />;
}
