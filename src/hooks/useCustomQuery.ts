import { useSuspenseQuery } from '@apollo/client';
import { MoviesData, MoviesVariables } from '@/types/movie';
import { GenresData } from '@/types/genre';
import { GET_MOVIES, GET_GENRES } from '@/lib/graphql/queries';

export const useMovies = (variables: MoviesVariables) => {
	const { data } = useSuspenseQuery<MoviesData>(GET_MOVIES, {
		variables,
	});

	return {
		data: data?.movies?.nodes ?? [],
		pagination: data?.movies?.pagination ?? [],
	};
};

export const useGenres = () => {
	const { data } = useSuspenseQuery<GenresData>(GET_GENRES);

	return {
		data: data?.genres?.nodes ?? [],
	};
};
