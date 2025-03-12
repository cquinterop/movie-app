import MovieDetailsPage from '@/app/movie/[id]/(movie-detail)';
import { Suspense } from 'react';
import Spinner from '@/components/ui/spinner';

const MovieDetailPage = () => {
	return (
		<Suspense fallback={<Spinner />}>
			<MovieDetailsPage />
		</Suspense>
	);
};

export default MovieDetailPage;
