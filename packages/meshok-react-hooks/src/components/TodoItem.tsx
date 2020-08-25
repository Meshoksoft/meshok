import { ITodo } from "meshok-common";
import React, { memo, useState, useCallback } from "react";

export const TodoTree = memo(_TodoTree);
export const TodoItem = memo(_TodoItem);

type SetDataStateFn = (prevData: ITodo) => ITodo;
type SetDataState = (fn: SetDataStateFn) => void;

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
	setData: SetDataState;
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

	const getSetDataForChild: (childIndex: number) => SetDataState =
		useCallback((childIndex: number) =>
			(setChildDataFn: SetDataStateFn) => {
				setData(prevData => ({
					...prevData,
					children: prevData.children && prevData.children.map(
						(value, index) =>
							index === childIndex ? setChildDataFn(value) : value
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
				? renderChildren(children, getSetDataForChild)
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
		?
			<label>
				<input type="text" defaultValue={title} />
			</label>
		:
			<label>{title}</label>;
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
	genSetDataForChild: (childIndex: number) => SetDataState
): JSX.Element | null {
	return children.length > 0
		?	<ul>{
				children.map((child, i) =>
					<li key={i}>
						<TodoItem data={child} setData={genSetDataForChild(i)}/>
					</li>
				)
			}</ul>
		: null;
}
