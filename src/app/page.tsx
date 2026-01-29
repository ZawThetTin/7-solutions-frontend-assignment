import AutoDeleteTodo from '@/components/auto-delete-todo';
import { DUMMY_DATA } from '@/data/dummy-items';
import Loading from '@/components/shared/loading';
import { Suspense } from 'react';

export default function Home() {
	return (
		<main className='flex w-screen h-screen overflow-auto'>
			<Suspense fallback={<Loading />}>
				<FetchData />
			</Suspense>
		</main>
	);
}

const FetchData = async () => {
	await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

	return <AutoDeleteTodo data={DUMMY_DATA} />;
};
