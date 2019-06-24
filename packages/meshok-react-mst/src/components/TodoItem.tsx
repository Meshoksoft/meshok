import React from "react";
import { SnapshotOut } from "mobx-state-tree";
import { observer } from "mobx-react-lite";

import { Todo } from "../model/Todo";

function _TodoItem(
	{ itemData: { title, children } }: { itemData: SnapshotOut<typeof Todo> }
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
		children: SnapshotOut<typeof Todo>[]
	): JSX.Element | null {
		return (children.length > 0)
			?	<ul>{
					children.map((child, i) =>
						<li key={i}><TodoItem itemData={child} /></li>
					)
				}</ul>
			: null;
	}
}

export const TodoItem = observer(_TodoItem);
