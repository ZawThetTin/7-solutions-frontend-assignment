import AutoDeleteTodo from '@/components/AutoDeleteTodo';
import { DUMMY_DATA } from '@/data/dummy-items';
import { Suspense } from 'react';

export default function Home() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<FetchData />
		</Suspense>
	);
}

const FetchData = async () => {
	await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

	return <AutoDeleteTodo data={DUMMY_DATA} />;
};
