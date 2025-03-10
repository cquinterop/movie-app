import MovieSection from '@/app/(home)/movie-section';
import { Suspense } from 'react';

export default function Home() {
	return (
		<>
			<h1>Movies</h1>
			<Suspense fallback={<div>Loading...</div>}>
				<MovieSection search="" />
			</Suspense>
		</>
	);
}
