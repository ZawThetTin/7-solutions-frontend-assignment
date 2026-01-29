export type Item = {
	type: 'Fruit' | 'Vegetable';
	name: string;
};

export type ItemWithId = Item & {
	id: string;
};
