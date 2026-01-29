'use client';
import { useState } from 'react';
import { Item, ItemWithId } from '@/types/item';

export default function Home() {
	const data: Item[] = [
		{
			type: 'Fruit',
			name: 'Apple',
		},
		{
			type: 'Vegetable',
			name: 'Broccoli',
		},
		{
			type: 'Vegetable',
			name: 'Mushroom',
		},
		{
			type: 'Fruit',
			name: 'Banana',
		},
		{
			type: 'Vegetable',
			name: 'Tomato',
		},
		{
			type: 'Fruit',
			name: 'Orange',
		},
		{
			type: 'Fruit',
			name: 'Mango',
		},
		{
			type: 'Fruit',
			name: 'Pineapple',
		},
		{
			type: 'Vegetable',
			name: 'Cucumber',
		},
		{
			type: 'Fruit',
			name: 'Watermelon',
		},
		{
			type: 'Vegetable',
			name: 'Carrot',
		},
	];

	const [items, setItems] = useState<ItemWithId[]>(
		() => data.map(item => ({ ...item, id: crypto.randomUUID() })), // Backend should provide the data with IDs, otherwise we will add id like this
	);
	const [vegetables, setVegetables] = useState<ItemWithId[]>([]);
	const [fruits, setFruits] = useState<ItemWithId[]>([]);
	const [timerIds, setTimerIds] = useState<Record<string, NodeJS.Timeout>>({});

	const handleRemove = (item: ItemWithId) => {
		/**
		 * Remove item from fruits or vegetables state by id and move it back to data
		 * Find the timer id from timerIds state by item id and clear the timeout
		 */

		if (item.type === 'Fruit') {
			setFruits(prevFruits => prevFruits.filter(fruit => fruit.id !== item.id));
		} else if (item.type === 'Vegetable') {
			setVegetables(prevVegetables =>
				prevVegetables.filter(veg => veg.id !== item.id),
			);
		}

		setItems(prevItems => [...prevItems, item]);

		const timerId = timerIds[item.id];

		if (timerId) {
			clearTimeout(timerId);
			setTimerIds(prevTimerIds => {
				const newTimerIds = { ...prevTimerIds };
				delete newTimerIds[item.id];
				return newTimerIds;
			});
		}
	};

	const handleClassify = (id: ItemWithId['id']) => {
		/**
		 * Find the item in data by id
		 * If the item is a fruit, add it to the fruits state
		 * If the item is a vegetable, add it to the vegetables state
		 * Remove item from data
		 * Start a countdown of 5 seconds to automatically remove the item from fruits or vegetables state and move it back to data
		 * Store the timer id in the timerIds state with the item id as the key
		 */

		const item = items.find(item => item.id === id);

		if (!item) return;

		if (item.type === 'Fruit') {
			setFruits(prevFruits => {
				if (prevFruits.find(fruit => fruit.id === id)) {
					return prevFruits;
				}
				return [...prevFruits, item];
			});
		} else if (item.type === 'Vegetable') {
			setVegetables(prevVegetables => {
				if (prevVegetables.find(veg => veg.id === id)) {
					return prevVegetables;
				}
				return [...prevVegetables, item];
			});
		}

		setItems(prevItems => prevItems.filter(i => i.id !== id));

		const timerId = setTimeout(() => {
			handleRemove(item);
		}, 5000);

		setTimerIds(prevTimerIds => ({
			...prevTimerIds,
			[id]: timerId,
		}));
	};

	return (
		<div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans text-3xl font-semibold text-zinc-900 dark:bg-black dark:text-zinc-50'>
			<div className='flex-1'>
				{items.map(item => (
					<div key={item.id}>
						<button
							className='m-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
							onClick={() => handleClassify(item.id)}>
							{item.name}
						</button>
					</div>
				))}
			</div>

			<div className='flex-1'>
				{vegetables.map(veg => (
					<div key={veg.id}>
						<button
							className='m-2 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600'
							onClick={() => handleRemove(veg)}>
							{veg.name}
						</button>
					</div>
				))}
			</div>

			<div className='flex-1'>
				{fruits.map(fruit => (
					<div key={fruit.id}>
						<button
							className='m-2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600'
							onClick={() => handleRemove(fruit)}>
							{fruit.name}
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
