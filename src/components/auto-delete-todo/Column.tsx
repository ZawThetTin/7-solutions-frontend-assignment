import { ItemWithId } from '@/types/item';

interface Props {
	data: ItemWithId[];
	onRemove: (item: ItemWithId) => void;
}

export default function Column({ data, onRemove }: Props) {
	return (
		<>
			{data.map(item => (
				<div key={item.id}>
					<button
						className='m-2 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600'
						onClick={() => onRemove(item)}>
						{item.name}
					</button>
				</div>
			))}
		</>
	);
}
