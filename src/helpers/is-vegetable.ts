import { Item } from '@/types/item';

export const isVegetable = (item: Item): boolean => {
	return item.type === 'Vegetable';
};
