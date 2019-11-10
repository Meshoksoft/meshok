import { ITodo } from "meshok-common";
import React, { memo, useState, useCallback } from "react";

export const TodoTree = memo(_TodoTree);
export const TodoItem = memo(_TodoItem);

function _TodoTree({
	initData,
}: {
	initData: ITodo;
}): JSX.Element {
	const [data, setData] = useState(initData);

	return <TodoItem data={data} setData={setData} />;
}

function _TodoItem({
	data: { title, children, showChildren = true },
	setData,
}: {
	data: ITodo;
	setData(fn: (prevData: ITodo) => ITodo): void;
}): JSX.Element {

	const toggleChildrenVisibility = useCallback(() => {
		setData(prevData => {
			const prevShowChildren = typeof prevData.showChildren === "undefined"
				? true
				: prevData.showChildren;

			return {
				...prevData,
				showChildren: !prevShowChildren,
			}
		});
	}, []);

	const setItemData = useCallback(
		(n: number) =>
			(setItemData: (prevData: ITodo) => ITodo) => {
				setData(prevData => ({
					...prevData,
					children: prevData.children && prevData.children.map(
						(value, index) =>
							index === n ? setItemData(value) : value
					)
				}))
		}, []);

	const isEditing = false;

	return (
		<>
			{title
				? renderTitle(
					title,
					isEditing,
					children ? children.length > 0 : false,
					showChildren,
					toggleChildrenVisibility
				  )
				: null }
			{showChildren && children
				? renderChildren(children, setItemData)
				: null}
		</>
	)
}

function renderTitle(
	title: string,
	isEditing: boolean,
	showButtons: boolean,
	showChildren: boolean,
	toggleChildrenVisibility: () => void
): JSX.Element {
	return (
		<>
			{renderTitleText(title, isEditing)}
			{showButtons
				? renderTitleButtons(
					showChildren,
					toggleChildrenVisibility
				  )
				: null}
		</>
	)
}

function renderTitleText(
	title: string,
	isEditing: boolean,
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
		<button onClick={toggleChildrenVisibility}>
			{`${showChildren ? "Hide" : "Show"} children`}
		</button>
	);
}

function renderChildren(
	children: ITodo[],
	setData: (n: number) =>	(setItemData: (prevData: ITodo) => ITodo) => void
): JSX.Element | null {
	return children.length > 0
		?	<ul>{
				children.map((child, i) =>
					<li key={i}>
						<TodoItem data={child} setData={setData(i)}/>
					</li>
				)
			}</ul>
		: null;
}
