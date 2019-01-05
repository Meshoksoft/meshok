type todo = {
	title: option(string),
	children: option(array(todo)),
}

let rootItemData: todo = {
	title: None,
	children: Some([|
		{
			title: Some("Hello World!!!"),
			children: Some([|
				{
					title: Some("Foo"),
					children: Some([|
						{
							title: Some("Hello World!!!"),
							children: None,
						},
					|]),
				},
				{
					title: Some("Baz"),
					children: None,
				}
			|]),
		}
	|]),
}
