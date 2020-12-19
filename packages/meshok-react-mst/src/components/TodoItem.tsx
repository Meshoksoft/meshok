import React from "react";
import { Instance } from "mobx-state-tree";
import { Observer } from "mobx-react-lite";

import "./TodoItem.css";
import { Todo } from "../model/Todo";

export const TodoItem = React.memo(_TodoItem);

function _TodoItem(
	{ itemData }: { itemData: Instance<typeof Todo> }
): JSX.Element {
	const isEditing = false;

	return (
		<Observer>{() => {
			const {
				title,
				children,
				showChildren,
				toggleChildrenVisibility
			} = itemData;

			return (
				<>
					{title
						?	renderTitle(
								title,
								isEditing,
								children,
								showChildren,
								toggleChildrenVisibility
							)
						:	null}

					{showChildren
						?	renderChildren(children)
						:	null}
				</>
			);
		}}</Observer>
	);

	function renderTitle(
		title: string | undefined,
		isEditing: boolean,
		children: Array<Instance<typeof Todo>>,
		showChildren: boolean,
		toggleChildrenVisibility: () => void
	): JSX.Element {
		return (
			<>
				{renderTitleText(title, isEditing)}
				{children.length > 0
					?	renderTitleButtons(
							showChildren,
							toggleChildrenVisibility
						)
					:	null}
			</>
		);
	}

	function renderTitleText(
		title: string | undefined,
		isEditing: boolean
	): JSX.Element {
		return (
			<label>
				{isEditing
					?	<input type="text" defaultValue={title} />
					:	title}
			</label>
		);
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
		children: Array<Instance<typeof Todo>>
	): JSX.Element | null {
		return (children.length > 0)
			?	<ul>
					{children.map((child, i) =>
						<li key={i}>
							<TodoItem itemData={child} />
						</li>
					)}
				</ul>
			:	null;
	}
}
