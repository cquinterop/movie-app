'use client';

import Link from 'next/link';
import MovieCard from '@/app/(home)/@movies/movie-card';
import BasePagination from '@/app/(home)/@movies/base-pagination';
import EmptyState from '@/components/ui/empty-state';
import { useMovies } from '@/hooks/useCustomQuery';
import { useSearchFilters } from '@/hooks/useSearchFilter';

const MovieSection = () => {
	const { search, genre, page } = useSearchFilters();
	const { data: movies, pagination, totalMovies } = useMovies({ where: { search, genre }, pagination: { page: Number.parseInt(page) || 1, perPage: 24 } });

	if (!movies.length) {
		return <EmptyState />;
	}

	return (
		<section className="container mx-auto -mt-24 pb-12">
			<p>Search Results: {totalMovies}</p>
			<div className="flex flex-wrap gap-6">
				{movies.map((movie) => (
					<Link
						href={`/movie/${movie.id}`}
						key={movie.id}
					>
						<MovieCard
							datePublished={movie.datePublished}
							posterUrl={movie.posterUrl}
							ratingValue={movie.ratingValue}
							title={movie.title}
						/>
					</Link>
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
