import React, { useState, useCallback, useRef, useEffect, memo } from "react";

import { ITodo } from "meshok-common";

interface TodoItemProps {
	itemData: ITodo;
}

export function TodoItem({ itemData }: TodoItemProps): JSX.Element {
	const [data, setData] = useState(itemData);

	const { title, children, showChildren } = data;

	useEffect(() => {
		itemData.title = data.title;
	}, [title]);

	useEffect(() => {
		itemData.showChildren = data.showChildren;
	}, [showChildren]);

	const isChildrenVisible = typeof showChildren === "undefined" ? true : showChildren;

	const toggleChildrenVisibility = useCallback(() => {
		setData(prevData => ({
			...prevData,
			showChildren:
				typeof prevData.showChildren === "undefined"
					? false
					: !prevData.showChildren
		}));
	}, []);

	const changeTitle = useCallback((title: string) => {
		setData(prevData => ({ ...prevData, title }));
	}, []);

	return (
		<>
			{title ? (
				<TodoItemTitle
					title={title}
					hasChildren={Boolean(children && children.length)}
					showChildren={isChildrenVisible}
					toggleChildrenVisibility={toggleChildrenVisibility}
					onChangeTitle={changeTitle}
				/>
			) : null}

			{isChildrenVisible && children && children.length > 0 ? (
				<ul>
					{children.map((child, i) => (
						<li key={i}>
							<TodoItem itemData={child} />
						</li>
					))}
				</ul>
			) : null}
		</>
	);
}

const TodoItemTitle = memo(function TodoItemTitle({
	title,
	hasChildren,
	showChildren,
	toggleChildrenVisibility,
	onChangeTitle
}: {
	title: string;
	hasChildren: boolean;
	showChildren: boolean;
	toggleChildrenVisibility: () => void;
	onChangeTitle: (title: string) => void;
}): JSX.Element {
	const [isEditing, setIsEditing] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);

	const toggleIsEditing = useCallback(
		(e: React.MouseEvent | React.KeyboardEvent) => {
			if (e.type === "dblclick") {
				setIsEditing(prevIsEditing => !prevIsEditing);
			} else if (
				e.type === "keypress" &&
					(e as React.KeyboardEvent).key === "Enter"
			) {
				const newTitle = inputRef.current && inputRef.current.value;

				if (newTitle && newTitle !== title) {
					onChangeTitle(newTitle);
				}

				setIsEditing(prevIsEditing => !prevIsEditing);
			}
		},
		[]
	);

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isEditing]);

	return (
		<>
			{isEditing ? (
				<label>
					<input
						type="text"
						defaultValue={title}
						ref={inputRef}
						onKeyPress={toggleIsEditing}
					/>
				</label>
			) : (
				<label onDoubleClick={toggleIsEditing}>{title}</label>
			)}

			{hasChildren ? (
				<button onClick={toggleChildrenVisibility}>
					{`${showChildren ? "Hide" : "Show"} children`}
				</button>
			) : null}
		</>
	);
});
