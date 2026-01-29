import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
	onClick: () => void;
}

export default function AutoDeleteItem({ onClick, children }: Props) {
	return (
		<button
			className='rounded-md px-4 py-2 text-black dark:text-white text-left cursor-pointer dark:border dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-950 hover:bg-zinc-300 dark:hover:bg-zinc-700'
			onClick={onClick}>
			{children}
		</button>
	);
}
