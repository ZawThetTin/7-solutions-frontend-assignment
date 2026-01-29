import AutoDeleteItem from '@/components/auto-delete-todo/auto-delete-item';
import { ItemWithId } from '@/types/item';

interface Props {
	data: ItemWithId[];
	onRemove: (item: ItemWithId) => void;
}

export default function Column({ data, onRemove }: Props) {
	return (
		<>
			{data.map(item => (
				<AutoDeleteItem key={item.id} onClick={() => onRemove(item)}>
					{item.name}
				</AutoDeleteItem>
			))}
		</>
	);
}
