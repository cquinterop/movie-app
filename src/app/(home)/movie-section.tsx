'use client';

import { useMovies } from '@/hooks/useQuery';
import { useReactiveVar } from '@apollo/client';
import MovieCard from '@/components/ui/movie-card';
import { GET_MOVIES } from '@/lib/graphql/queries';
import { searchVar } from '@/providers/data-provider';
import EmptyState from '@/components/ui/empty-state';

const MovieSection = () => {
	const searchValue = useReactiveVar(searchVar);
	const {
		data: {
			movies: { nodes: movies },
		},
	} = useMovies(GET_MOVIES, { search: searchValue });

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
