
let rec setNElementOfList =
		(n: int, newValue: 'a, list: list('a)): option(list('a)) => {
	switch(n, list) {
	| (n, _) when n < 0 => None;
	| (_, []) => None;
	| (0, [_, ...tail]) => Some([newValue, ...tail]);
	| (n, [head, ...tail]) =>
		setNElementOfList(n - 1, newValue, tail)
			|> Belt.Option.map(_, newTail => [head, ...newTail]);
	}
}
