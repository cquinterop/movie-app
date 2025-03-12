import { useSuspenseQuery } from '@apollo/client';
import { MoviesData, MoviesVariables, MovieData, MovieVariables } from '@/types/movie';
import { GenresData } from '@/types/genre';
import { GET_MOVIES, GET_MOVIE, GET_GENRES } from '@/lib/graphql/queries';
import { movieFactory } from '@/utils/movies';

export const useMovies = (variables: MoviesVariables) => {
	const { data } = useSuspenseQuery<MoviesData>(GET_MOVIES, {
		variables,
	});

	return {
		data: data?.movies?.nodes ? data.movies.nodes.map(movieFactory) : [],
		pagination: data?.movies?.pagination ?? [],
	};
};

export const useMovie = (variables: MovieVariables) => {
	const { data } = useSuspenseQuery<MovieData>(GET_MOVIE, {
		variables,
	});

	return {
		data: data?.movie ? movieFactory(data.movie) : null,
	};
};

export const useGenres = () => {
	const { data } = useSuspenseQuery<GenresData>(GET_GENRES);

	return {
		data: data?.genres?.nodes ?? [],
	};
};
