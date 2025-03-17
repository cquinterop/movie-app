import { renderHook, waitFor } from '@testing-library/react';
import { useMovies, useMovie, useGenres } from '@/hooks/useCustomQuery';
import { useSuspenseQuery } from '@apollo/client';
import { GET_MOVIES, GET_MOVIE, GET_GENRES } from '@/lib/graphql/queries';
import { movieFactory } from '@/utils/movies';

jest.mock('@/lib/graphql/queries', () => ({
	GET_MOVIES: 'GET_MOVIES_QUERY',
	GET_MOVIE: 'GET_MOVIE_QUERY',
	GET_GENRES: 'GET_GENRES_QUERY',
}));

jest.mock('@apollo/client', () => ({
	useSuspenseQuery: jest.fn(),
	gql: jest.fn((str) => str),
}));

jest.mock('@/utils/movies', () => ({
	movieFactory: jest.fn((movie) => movie),
}));

const mockMovies = [
	{ id: '1', title: 'Movie 1', posterUrl: 'url1' },
	{ id: '2', title: 'Movie 2', posterUrl: 'url2' },
];

const mockMovie = {
	id: '1',
	title: 'Movie 1',
	posterUrl: 'url1',
	summary: 'A great movie',
	genres: [{ id: '1', title: 'Action' }],
};

const mockGenres = [
	{ id: '1', title: 'Action' },
	{ id: '2', title: 'Comedy' },
];

const mockClient = {
	readQuery: jest.fn(),
	writeQuery: jest.fn(),
};

describe('useCustomQuery Hooks', () => {
	const mockFetchMore = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('useMovies Hook', () => {
		it('returns formatted movie data and pagination info', async () => {
			(useSuspenseQuery as jest.Mock).mockReturnValue({
				data: {
					movies: {
						nodes: mockMovies,
						pagination: {
							page: 1,
							perPage: 10,
							totalPages: 5,
						},
						totalMovies: 50,
					},
				},
				fetchMore: mockFetchMore,
				client: mockClient,
			});

			const { result } = renderHook(() => useMovies());

			expect(result.current.data).toEqual(mockMovies);
			expect(result.current.pagination).toEqual({
				page: 1,
				perPage: 10,
				totalPages: 5,
			});
			expect(result.current.totalMovies).toBe(50);
			expect(result.current.client).toBe(mockClient);

			expect(useSuspenseQuery).toHaveBeenCalledWith(GET_MOVIES, {
				variables: {},
			});

			expect(movieFactory).toHaveBeenCalledTimes(2);
		});

		it('handles empty data gracefully', async () => {
			(useSuspenseQuery as jest.Mock).mockReturnValue({
				data: {
					movies: {
						nodes: [],
						pagination: {
							page: 1,
							perPage: 10,
							totalPages: 0,
						},
						totalMovies: 0,
					},
				},
				fetchMore: mockFetchMore,
				client: mockClient,
			});

			const { result } = renderHook(() => useMovies());

			expect(result.current.data).toEqual([]);
			expect(result.current.pagination).toEqual({
				page: 1,
				perPage: 10,
				totalPages: 0,
			});
			expect(result.current.totalMovies).toBe(0);
		});

		it('fetches more data when totalMovies is not available', async () => {
			(useSuspenseQuery as jest.Mock).mockReturnValue({
				data: {
					movies: {
						nodes: mockMovies,
						pagination: {
							page: 1,
							perPage: 10,
							totalPages: 5,
						},
						totalMovies: undefined,
					},
				},
				fetchMore: mockFetchMore,
				client: mockClient,
			});

			renderHook(() => useMovies());

			await waitFor(() => {
				expect(mockFetchMore).toHaveBeenCalledWith(
					expect.objectContaining({
						variables: expect.objectContaining({
							pagination: {
								page: 5,
								perPage: 10,
							},
						}),
					})
				);
			});
		});

		it('passes custom variables to the query', async () => {
			(useSuspenseQuery as jest.Mock).mockReturnValue({
				data: {
					movies: {
						nodes: mockMovies,
						pagination: {
							page: 1,
							perPage: 10,
							totalPages: 5,
						},
						totalMovies: 50,
					},
				},
				fetchMore: mockFetchMore,
				client: mockClient,
			});

			const variables = {
				where: {
					genre: 'Action',
					search: 'test',
				},
				pagination: {
					page: 2,
					perPage: 20,
				},
			};

			renderHook(() => useMovies(variables));

			expect(useSuspenseQuery).toHaveBeenCalledWith(GET_MOVIES, {
				variables,
			});
		});
	});

	describe('useMovie Hook', () => {
		it('returns formatted movie data for a specific movie', async () => {
			(useSuspenseQuery as jest.Mock).mockReturnValue({
				data: {
					movie: mockMovie,
				},
			});

			const variables = { movieId: '1' };

			const { result } = renderHook(() => useMovie(variables));

			expect(result.current.data).toEqual(mockMovie);
			expect(useSuspenseQuery).toHaveBeenCalledWith(GET_MOVIE, {
				variables,
			});
			expect(movieFactory).toHaveBeenCalledWith(mockMovie);
		});

		it('returns null when movie data is not available', async () => {
			(useSuspenseQuery as jest.Mock).mockReturnValue({
				data: {
					movie: null,
				},
			});

			const variables = { movieId: 'non-existent' };
			const { result } = renderHook(() => useMovie(variables));
			expect(result.current.data).toBeNull();
		});
	});

	describe('useGenres Hook', () => {
		it('returns genre data', async () => {
			(useSuspenseQuery as jest.Mock).mockReturnValue({
				data: {
					genres: {
						nodes: mockGenres,
					},
				},
			});

			const { result } = renderHook(() => useGenres());

			expect(result.current.data).toEqual(mockGenres);
			expect(useSuspenseQuery).toHaveBeenCalledWith(GET_GENRES);
		});

		it('returns empty array when genre data is not available', async () => {
			(useSuspenseQuery as jest.Mock).mockReturnValue({
				data: {
					genres: {
						nodes: null,
					},
				},
			});

			const { result } = renderHook(() => useGenres());
			expect(result.current.data).toEqual([]);
		});
	});
});
