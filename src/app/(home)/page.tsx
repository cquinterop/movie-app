import HeroSection from '@/app/(home)/(hero-section)';
import MovieSection from '@/app/(home)/(movie-section)';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Spinner from '@/components/ui/spinner';
import FallbackError from '@/components/ui/fallback-error';

const Home = () => {
	return (
		<>
			<ErrorBoundary FallbackComponent={FallbackError}>
				<Suspense fallback={<Spinner />}>
					<HeroSection />
				</Suspense>
			</ErrorBoundary>
			<ErrorBoundary FallbackComponent={FallbackError}>
				<Suspense fallback={<Spinner />}>
					<MovieSection />
				</Suspense>
			</ErrorBoundary>
		</>
	);
};

export default Home;
