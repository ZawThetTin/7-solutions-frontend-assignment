import { Item } from '@/types/item';

export const isFruit = (item: Item): boolean => {
	return item.type === 'Fruit';
};
