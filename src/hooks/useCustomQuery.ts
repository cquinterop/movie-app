'use client';

import { useSuspenseQuery } from '@apollo/client';
import { MovieData, MoviesData, MovieVariables } from '@/types/movie';
import { GenresData } from '@/types/genre';
import { GET_MOVIES, GET_MOVIE, GET_GENRES } from '@/lib/graphql/queries';
import { movieFactory } from '@/utils/movies';
import { useSearchFilters } from '@/hooks/useSearchFilter';
import { useEffect, useMemo } from 'react';
import { MOVIES_PER_PAGE } from '@/constants/movies';

export const useMovies = (query = GET_MOVIES) => {
	const { search, genre, page } = useSearchFilters();
	const variables = useMemo(
		() => ({
			where: { search, genre },
			pagination: { page, perPage: MOVIES_PER_PAGE },
		}),
		[search, genre, page]
	);
	const { data, fetchMore } = useSuspenseQuery<MoviesData>(query, { variables });

	useEffect(() => {
		if (data?.movies?.totalMovies) {
			return;
		}

		fetchMore({
			variables: {
				...variables,
				pagination: {
					page: data.movies.pagination.totalPages,
					perPage: data.movies.pagination.perPage,
				},
			},
			updateQuery(previousData, { fetchMoreResult }) {
				if (!fetchMoreResult) {
					return previousData;
				}

				if (fetchMoreResult.movies.pagination.totalPages === 1) {
					return {
						movies: {
							...previousData.movies,
							totalMovies: fetchMoreResult.movies.nodes.length,
						},
					};
				}

				return {
					movies: {
						...previousData.movies,
						totalMovies: Number(fetchMoreResult.movies.pagination.perPage) * (Number(fetchMoreResult.movies.pagination.totalPages) - 1) + fetchMoreResult.movies.nodes.length,
					},
				};
			},
		});
	}, [data, fetchMore, variables]);

	return {
		data: data?.movies?.nodes.map(movieFactory) ?? [],
		pagination: data?.movies?.pagination ?? [],
		totalMovies: data?.movies?.totalMovies ?? 0,
	};
};

export const useMovie = (variables: MovieVariables) => {
	const { data } = useSuspenseQuery<MovieData>(GET_MOVIE, {
		variables,
	});

	return {
		data: data?.movie,
	};
};

export const useGenres = () => {
	const { data } = useSuspenseQuery<GenresData>(GET_GENRES);

	return {
		data: data?.genres?.nodes ?? [],
	};
};
