import { useCallback, useState } from 'react';
import { GET_MOVIES } from '@/lib/graphql/queries';
import { movieFactory } from '@/utils/movies';
import { MovieData } from '@/types/movie';
import { cache } from '@/providers/data-provider';
import { useSearchFilters } from '@/hooks/useSearchFilter';

export const useRandomMovie = () => {
	const [randomMovie, setRandomMovie] = useState<MovieData['movie']>();
	const { genre } = useSearchFilters();

	const getRandomMovie = useCallback(() => {
		const cacheData = cache.readQuery({
			query: GET_MOVIES,
			variables: {
				pagination: {
					page: 1,
					perPage: 24,
				},
				where: {
					genre,
					search: '',
				},
			},
		});

		if (cacheData?.movies?.nodes?.length) {
			const movies = cacheData.movies.nodes;
			const randomIndex = Math.floor(Math.random() * movies.length);

			setRandomMovie(movieFactory(movies[randomIndex]));
		}
	}, [genre]);

	return { randomMovie, getRandomMovie };
};
