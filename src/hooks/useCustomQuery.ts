import { useSuspenseQuery } from '@apollo/client';
import { MoviesData, MovieFilterInput } from '@/types/movie';
import { GenresData } from '@/types/genre';
import { GET_MOVIES, GET_GENRES } from '@/lib/graphql/queries';

export const useMovies = (input: MovieFilterInput = {}) => {
	const { data } = useSuspenseQuery<MoviesData>(GET_MOVIES, {
		variables: { where: input },
	});

	return {
		data: data?.movies?.nodes ?? [],
	};
};

export const useGenres = () => {
	const { data } = useSuspenseQuery<GenresData>(GET_GENRES);

	return {
		data: data?.genres?.nodes ?? [],
	};
};
