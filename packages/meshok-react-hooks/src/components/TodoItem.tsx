import React from "react";

import { ITodo } from "meshok-common";

interface TodoItemProps {
	itemData: ITodo;
}

export function TodoItem(
	{ itemData: { title, children } }: TodoItemProps
): JSX.Element {
	const isEditing = false;

	return (
		<>
			{renderTitle(title, isEditing)}
			{renderChildren(children)}
		</>
	);

	function renderTitle(
		title: string | undefined,
		isEditing: boolean,
	): JSX.Element | null {
		return title
			? isEditing
				?	<label>
						<input type="text" defaultValue={title} />
					</label>
				: <label>{title}</label>
			: null;
	}

	function renderChildren(
		children?: ITodo[]
	): JSX.Element | null {
		return (children && children.length > 0)
			?	<ul>{
					children.map((child, i) =>
						<li key={i}><TodoItem itemData={child} /></li>
					)
				}</ul>
			: null;
	}
}
