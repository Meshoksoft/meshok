import { types, IAnyModelType } from "mobx-state-tree";

export const Todo = types
	.model("Todo", {
		title: types.maybe(types.string),
		editTitle: false,
		showChildren: true,
		children: types.optional(
			types.array(types.late("children", (): IAnyModelType => Todo)),
			[]
		),
	})
	.actions(self => ({
		toggleChildrenVisibility() {
			self.showChildren = !self.showChildren;
		},
		setTitle(title: string) {
			self.title = title;
		},
	}))
