'use client';

import { useState } from 'react';
import { Item, ItemWithId } from '@/types/item';
import { isFruit } from '@/helpers/is-fruit';
import Column from '@/components/auto-delete-todo/auto-delete-column';
import { isVegetable } from '@/helpers/is-vegetable';
import AutoDeleteItem from '@/components/auto-delete-todo/auto-delete-item';

interface Props {
	data: Item[];
}

export default function AutoDeleteTodo({ data }: Props) {
	const [items, setItems] = useState<ItemWithId[]>(
		/**
		 * Note: This commenting is only for interview process.
		 * To better explain the integration.
		 * No need to write such comment on production code
		 *
		 * Backend should provide the data with IDs, otherwise we will add id like this
		 */
		() => data.map(item => ({ ...item, id: crypto.randomUUID() })),
	);
	const [vegetables, setVegetables] = useState<ItemWithId[]>([]);
	const [fruits, setFruits] = useState<ItemWithId[]>([]);
	const [timerIds, setTimerIds] = useState<Record<string, NodeJS.Timeout>>({});

	const handleRemove = (item: ItemWithId) => {
		/**
		 * Note: This commenting is only for interview process.
		 * To better explain the integration.
		 * No need to write such comment on production code
		 *
		 * Remove item from fruits or vegetables state by id and move it back to data
		 * Find the timer id from timerIds state by item id and clear the timeout
		 */

		if (isFruit(item)) {
			setFruits(prevFruits => prevFruits.filter(fruit => fruit.id !== item.id));
		} else if (isVegetable(item)) {
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
		 * Note: This commenting is only for interview process.
		 * To better explain the integration.
		 * No need to write such comment on production code
		 *
		 * Find the item in data by id
		 * If the item is a fruit, add it to the fruits state
		 * If the item is a vegetable, add it to the vegetables state
		 * Remove item from data
		 * Start a countdown of 5 seconds to automatically remove the item from fruits or vegetables state and move it back to data
		 * Store the timer id in the timerIds state with the item id as the key
		 */

		const item = items.find(item => item.id === id);

		if (!item) return;

		if (isFruit(item)) {
			setFruits(prevFruits => {
				if (prevFruits.find(fruit => fruit.id === id)) {
					return prevFruits;
				}
				return [...prevFruits, item];
			});
		} else if (isVegetable(item)) {
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
		<div className='flex-1 flex flex-wrap gap-3 text-zinc-900 dark:text-zinc-50 max-w-[800px] mx-auto my-10'>
			<div className='flex-1 basis-50 flex flex-col gap-1 p-2'>
				{items.map(item => (
					<AutoDeleteItem key={item.id} onClick={() => handleClassify(item.id)}>
						{item.name}
					</AutoDeleteItem>
				))}
			</div>

			<div className='flex-1 basis-50 rounded-md border border-zinc-300 dark:border-zinc-700'>
				<div className='text-center bg-zinc-200 dark:bg-zinc-800 p-2 font-medium'>
					Fruits
				</div>
				<div className='p-2 flex flex-col gap-1'>
					<Column data={fruits} onRemove={handleRemove} />
				</div>
			</div>

			<div className='flex-1 basis-50 rounded-md border border-zinc-300 dark:border-zinc-700'>
				<div className='text-center bg-zinc-200 dark:bg-zinc-800 p-2 font-medium'>
					Vegetables
				</div>
				<div className='p-2 flex flex-col gap-1'>
					<Column data={vegetables} onRemove={handleRemove} />
				</div>
			</div>
		</div>
	);
}
