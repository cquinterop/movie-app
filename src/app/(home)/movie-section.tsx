'use client';

import { useSuspenseQuery } from '@apollo/client';
import MovieCard from '@/components/ui/movie-card';
import { GET_MOVIES } from '@/lib/graphql/queries';

interface MovieSectionProps {
	search: string;
}

const MovieSection = ({ search }: Readonly<MovieSectionProps>) => {
	const { data } = useSuspenseQuery(GET_MOVIES, {
		variables: { where: { search } },
	});

	return (
		<section className="container mx-auto py-12">
			<div className="flex flex-wrap gap-6">
				{data.movies.nodes.map((movie) => (
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
