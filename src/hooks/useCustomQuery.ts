import { useSuspenseQuery } from '@apollo/client';
import { MoviesData, MoviesVariables, MovieData, MovieVariables } from '@/types/movie';
import { GenresData } from '@/types/genre';
import { GET_MOVIES, GET_MOVIE, GET_GENRES } from '@/lib/graphql/queries';
import { movieFactory } from '@/utils/movies';
import { useEffect } from 'react';

export const useMovies = (variables: MoviesVariables = {}) => {
	const { data, fetchMore, client } = useSuspenseQuery<MoviesData>(GET_MOVIES, {
		variables,
	});

	useEffect(() => {
		if (!data?.movies?.totalMovies) {
			fetchMore({
				variables: {
					...variables,
					pagination: {
						page: data.movies.pagination.totalPages,
						perPage: data.movies.pagination.perPage,
					},
				},
				updateQuery(previousData: MoviesData, { fetchMoreResult }: { fetchMoreResult?: MoviesData }) {
					if (!fetchMoreResult) {
						return previousData;
					}

					return {
						movies: {
							...previousData.movies,
							totalMovies: Number(previousData.movies.pagination.perPage) * (Number(previousData.movies.pagination.totalPages) - 1) + fetchMoreResult.movies.nodes.length,
						},
					};
				},
			});
		}
	}, [data, fetchMore, variables]);

	return {
		data: data?.movies?.nodes ? data.movies.nodes.map(movieFactory) : [],
		pagination: data?.movies?.pagination ?? [],
		totalMovies: data?.movies?.totalMovies ?? 0,
		client,
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
