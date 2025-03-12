'use client';

import { useMovies } from '@/hooks/useCustomQuery';
import MovieCard from '@/components/ui/movie-card';
import EmptyState from '@/components/ui/empty-state';
import { useSearchFilters } from '@/hooks/useSearchFilter';

const MovieSection = () => {
	const { search, genre } = useSearchFilters();
	const { data: movies } = useMovies({ search, genre });

	if (!movies.length) {
		return <EmptyState />;
	}

	return (
		<section className="container mx-auto py-12">
			<div className="flex flex-wrap gap-6">
				{movies.map((movie) => (
					<MovieCard
						key={movie.id}
						posterUrl={movie.posterUrl}
						title={movie.title}
					/>
				))}
			</div>
		</section>
	);
};

export default MovieSection;
