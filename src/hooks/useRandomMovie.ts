import { useCallback, useState } from 'react';
import { GET_MOVIES } from '@/lib/graphql/queries';
import { useMovies } from '@/hooks/useCustomQuery';
import { movieFactory } from '@/utils/movies';
import { MovieData } from '@/types/movie';
import { useSearchParams } from 'next/navigation';

export const useRandomMovie = () => {
	const { client } = useMovies();
	const [randomMovie, setRandomMovie] = useState<MovieData['movie']>();
	const searchParams = useSearchParams();

	const genre = searchParams.get('genre') ?? '';

	const getRandomMovie = useCallback(() => {
		const cacheData = client.readQuery({
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
	}, [client, genre]);

	return { randomMovie, getRandomMovie, setRandomMovie };
};
