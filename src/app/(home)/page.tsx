import MovieSection from '@/app/(home)/movie-section';
import HeroSection from '@/app/(home)/(hero-section)';
import { Suspense } from 'react';
import Spinner from '@/components/ui/spinner';

export default function Home() {
	return (
		<>
			<HeroSection />
			<Suspense fallback={<Spinner />}>
				<MovieSection />
			</Suspense>
		</>
	);
}
