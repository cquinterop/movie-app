'use client';

import { useMovies } from '@/hooks/useCustomQuery';
import MovieCard from '@/components/ui/movie-card';
import EmptyState from '@/components/ui/empty-state';
import { useSearchFilters } from '@/hooks/useSearchFilter';
import BasePagination from '@/app/(home)/(movie-section)/base-pagination';

const MovieSection = () => {
	const { search, genre, page } = useSearchFilters();
	const { data: movies, pagination } = useMovies({ where: { search, genre }, pagination: { page: Number.parseInt(page) || 1, perPage: 24 } });

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
				<BasePagination
					page={Number(pagination.page)}
					totalPages={Number(pagination.totalPages)}
				/>
			</div>
		</section>
	);
};

export default MovieSection;
