import AutoDeleteTodo from '@/components/auto-delete-todo/AutoDeleteTodo';
import { DUMMY_DATA } from '@/data/dummy-items';
import Loading from '@/components/shared/loading';
import { Suspense } from 'react';

export default function Home() {
	return (
		<Suspense fallback={<Loading />}>
			<FetchData />
		</Suspense>
	);
}

const FetchData = async () => {
	await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

	return <AutoDeleteTodo data={DUMMY_DATA} />;
};
