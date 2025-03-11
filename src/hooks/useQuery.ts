import { useSuspenseQuery, DocumentNode } from '@apollo/client';
import { MoviesData, MovieFilterInput } from '@/types/movie';

export const useMovies = (query: DocumentNode, where: MovieFilterInput) => {
	const data = useSuspenseQuery<MoviesData>(query, {
		variables: { where },
	});

	return data;
};
