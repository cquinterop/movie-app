import { renderHook, act } from '@testing-library/react';
import { useRandomMovie } from '@/hooks/useRandomMovie';
import { useMovies } from '@/hooks/useCustomQuery';
import { useSearchParams } from 'next/navigation';
import { movieFactory } from '@/utils/movies';

jest.mock('@/hooks/useCustomQuery', () => ({
	useMovies: jest.fn(),
}));

jest.mock('next/navigation', () => ({
	useSearchParams: jest.fn(),
}));

const mockMathRandom = jest.spyOn(global.Math, 'random');

jest.mock('@/utils/movies', () => ({
	movieFactory: jest.fn((movie) => movie),
}));

const mockMovies = [
	{ id: '1', title: 'Movie 1', posterUrl: 'url1', datePublished: '2023-01-01', ratingValue: '8.5' },
	{ id: '2', title: 'Movie 2', posterUrl: 'url2', datePublished: '2023-02-01', ratingValue: '7.5' },
	{ id: '3', title: 'Movie 3', posterUrl: 'url3', datePublished: '2023-03-01', ratingValue: '9.0' },
];

describe('useRandomMovie Hook', () => {
	const mockClient = {
		readQuery: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();

		(useMovies as jest.Mock).mockReturnValue({
			client: mockClient,
		});

		(useSearchParams as jest.Mock).mockReturnValue({
			get: jest.fn().mockImplementation((key) => (key === 'genre' ? 'action' : '')),
		});

		mockClient.readQuery.mockReturnValue({
			movies: {
				nodes: mockMovies,
			},
		});

		mockMathRandom.mockReturnValue(0.5);
	});

	afterAll(() => {
		mockMathRandom.mockRestore();
	});

	it('initializes with undefined randomMovie', () => {
		const { result } = renderHook(() => useRandomMovie());

		expect(result.current.randomMovie).toBeUndefined();
	});

	it('selects a random movie when getRandomMovie is called', () => {
		const { result } = renderHook(() => useRandomMovie());

		act(() => {
			result.current.getRandomMovie();
		});

		expect(result.current.randomMovie).toBeDefined();
		expect(result.current.randomMovie?.id).toBe('2');
		expect(result.current.randomMovie?.title).toBe('Movie 2');
	});

	it('uses the genre from search params when querying', () => {
		const { result } = renderHook(() => useRandomMovie());

		act(() => {
			result.current.getRandomMovie();
		});

		expect(mockClient.readQuery).toHaveBeenCalledWith(
			expect.objectContaining({
				variables: expect.objectContaining({
					where: expect.objectContaining({
						genre: 'action',
					}),
				}),
			})
		);
	});

	it('does not set randomMovie if no movies are found', () => {
		mockClient.readQuery.mockReturnValueOnce({
			movies: {
				nodes: [],
			},
		});

		const { result } = renderHook(() => useRandomMovie());

		act(() => {
			result.current.getRandomMovie();
		});

		expect(result.current.randomMovie).toBeUndefined();
	});

	it('allows setting randomMovie directly', () => {
		const { result } = renderHook(() => useRandomMovie());
		const testMovie = {
			id: '4',
			title: 'Test Movie',
			bestRating: '10',
			datePublished: '2023-04-01',
			directors: [],
			duration: '',
			genres: [],
			mainActors: [],
			posterUrl: 'url4',
			rating: '',
			ratingValue: '8.0',
			summary: 'Test summary',
			worstRating: '0',
			writers: [],
		};

		act(() => {
			result.current.setRandomMovie(testMovie);
		});

		expect(result.current.randomMovie).toBe(testMovie);
	});

	it('returns a random movie when getRandomMovie is called', () => {
		const mockMovie = { id: '1', title: 'Test Movie' };
		(movieFactory as jest.Mock).mockReturnValue(mockMovie);

		const { result } = renderHook(() => useRandomMovie());

		act(() => {
			result.current.getRandomMovie();
		});

		expect(result.current.randomMovie).toEqual(mockMovie);
		expect(movieFactory).toHaveBeenCalled();
	});

	it('provides a function to get a new random movie', () => {
		const mockMovie1 = { id: '1', title: 'Test Movie 1' };
		const mockMovie2 = { id: '2', title: 'Test Movie 2' };

		(movieFactory as jest.Mock).mockReturnValueOnce(mockMovie1).mockReturnValueOnce(mockMovie2);

		const { result } = renderHook(() => useRandomMovie());

		act(() => {
			result.current.getRandomMovie();
		});

		expect(result.current.randomMovie).toEqual(mockMovie1);

		act(() => {
			result.current.getRandomMovie();
		});

		expect(result.current.randomMovie).toEqual(mockMovie2);
		expect(movieFactory).toHaveBeenCalledTimes(2);
	});
});
