import React from "react";
import { Instance } from "mobx-state-tree";
import { observer } from "mobx-react-lite";

import "./TodoItem.css";
import { Todo } from "../model/Todo";

function _TodoItem(
	{
		itemData: { title, children, showChildren, toggleChildrenVisibility }
	}: {
		itemData: Instance<typeof Todo>
	}
): JSX.Element {
	const isEditing = false;

	return (
		<>
			{title
				? renderTitle(title, isEditing, showChildren, toggleChildrenVisibility)
				: null}
			{showChildren
				? renderChildren(children)
				: null}
		</>
	);

	function renderTitle(
		title: string | undefined,
		isEditing: boolean,
		showChildren: boolean,
		toggleChildrenVisibility: () => void
	): JSX.Element {
		return (
			<>
				{renderTitleText(title, isEditing)}
				{children.length > 0
					? renderTitleButtons(showChildren, toggleChildrenVisibility)
					: null}
			</>
		);
	}

	function renderTitleText(
		title: string | undefined,
		isEditing: boolean
	): JSX.Element {
		return isEditing
			?	<label>
					<input type="text" defaultValue={title} />
				</label>
			: <label>{title}</label>;
	}

	function renderTitleButtons(
		showChildren: boolean,
		toggleChildrenVisibility: () => void
	): JSX.Element {
		return (
			<button onClick={() => toggleChildrenVisibility()}>
				{`${showChildren ? "Hide" : "Show"} children`}
			</button>
		);
	}

	function renderChildren(
		children: Instance<typeof Todo>[]
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
