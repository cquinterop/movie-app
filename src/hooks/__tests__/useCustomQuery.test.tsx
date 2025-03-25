import { renderHook, waitFor } from '@testing-library/react';
import { useMovies, useMovie, useGenres } from '@/hooks/useCustomQuery';
import { useSuspenseQuery } from '@apollo/client';
import { GET_GENRES } from '@/lib/graphql/queries';
import { movieFactory } from '@/utils/movies';
import { useSearchFilters } from '@/hooks/useSearchFilter';
import { MOVIES_PER_PAGE } from '@/constants/movies';

// Mock dependencies
jest.mock('@/hooks/useSearchFilter', () => ({
	useSearchFilters: jest.fn(),
}));

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
	movieFactory: jest.fn((movie) => ({ ...movie, factoryProcessed: true })),
}));

jest.mock('@/constants/movies', () => ({
	MOVIES_PER_PAGE: 24,
}));

describe('useCustomQuery Hooks', () => {
	const mockMovies = [
		{ id: '1', title: 'Movie 1', posterUrl: 'url1' },
		{ id: '2', title: 'Movie 2', posterUrl: 'url2' },
	];

	const mockGenres = [
		{ id: '1', title: 'Action' },
		{ id: '2', title: 'Comedy' },
	];

	const mockFetchMore = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		(useSearchFilters as jest.Mock).mockReturnValue({
			search: '',
			genre: '',
			page: 1,
		});
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
			});

			const { result } = renderHook(() => useMovies());

			expect(result.current.data).toEqual(mockMovies.map((movie) => ({ ...movie, factoryProcessed: true })));
			expect(result.current.pagination).toEqual({
				page: 1,
				perPage: 10,
				totalPages: 5,
			});
			expect(result.current.totalMovies).toBe(50);

			expect(useSuspenseQuery).toHaveBeenCalledWith('GET_MOVIES_QUERY', {
				variables: {
					where: { search: '', genre: '' },
					pagination: { page: 1, perPage: MOVIES_PER_PAGE },
				},
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
					},
				},
				fetchMore: mockFetchMore,
			});

			renderHook(() => useMovies());

			await waitFor(() => {
				expect(mockFetchMore).toHaveBeenCalledWith({
					variables: {
						where: { search: '', genre: '' },
						pagination: {
							page: 5,
							perPage: 10,
						},
					},
					updateQuery: expect.any(Function),
				});
			});
		});

		it('uses search filters as variables for the query', async () => {
			(useSearchFilters as jest.Mock).mockReturnValue({
				search: 'test',
				genre: 'Action',
				page: 2,
			});

			(useSuspenseQuery as jest.Mock).mockReturnValue({
				data: {
					movies: {
						nodes: mockMovies,
						pagination: {
							page: 2,
							perPage: MOVIES_PER_PAGE,
							totalPages: 5,
						},
						totalMovies: 50,
					},
				},
				fetchMore: mockFetchMore,
			});

			renderHook(() => useMovies());

			expect(useSuspenseQuery).toHaveBeenCalledWith('GET_MOVIES_QUERY', {
				variables: {
					where: { search: 'test', genre: 'Action' },
					pagination: { page: 2, perPage: MOVIES_PER_PAGE },
				},
			});
		});
	});

	describe('useMovie Hook', () => {
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
		it('returns genre data', () => {
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

		it('returns empty array when genre data is not available', () => {
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

		it('handles undefined data gracefully', () => {
			(useSuspenseQuery as jest.Mock).mockReturnValue({
				data: undefined,
			});

			const { result } = renderHook(() => useGenres());

			expect(result.current.data).toEqual([]);
		});
	});
});
