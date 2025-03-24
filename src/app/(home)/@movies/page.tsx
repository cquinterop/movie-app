'use client';

import Link from 'next/link';
import MovieCard from '@/app/(home)/@movies/movie-card';
import BasePagination from '@/app/(home)/@movies/base-pagination';
import EmptyState from '@/components/ui/empty-state';
import { useMovies } from '@/hooks/useCustomQuery';

const MovieSection = () => {
	const { data: movies, pagination, totalMovies } = useMovies();

	if (!movies.length) {
		return <EmptyState />;
	}

	return (
		<section className="container mx-auto pb-12">
			{!!totalMovies && <p className="m-8 text-lg font-semibold">Movie Count: {totalMovies}</p>}
			<div className="flex flex-wrap justify-center gap-6 md:justify-start">
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
