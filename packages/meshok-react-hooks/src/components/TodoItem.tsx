import React from "react";

import { ITodo } from "meshok-common";

interface TodoItemProps {
	itemData: ITodo;
}

export function TodoItem({ itemData }: TodoItemProps): JSX.Element {
	const isEditing = false;

	return (
		<>
			{itemData.title && (
				<label>
					{isEditing ? (
						<input type="text" defaultValue={itemData.title} />
					) : (
						itemData.title
					)}
				</label>
			)}
			{itemData.children && (
				<ul>
					{itemData.children.map((child, i) => (
						<li key={i}>
							<TodoItem itemData={child} />
						</li>
					))}
				</ul>
			)}
		</>
	);
}
