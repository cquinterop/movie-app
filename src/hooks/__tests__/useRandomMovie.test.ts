import { renderHook, act } from '@testing-library/react';
import { useRandomMovie } from '@/hooks/useRandomMovie';
import { movieFactory } from '@/utils/movies';
import { cache } from '@/providers/data-provider';
import { useSearchFilters } from '../useSearchFilter';

jest.mock('@/hooks/useSearchFilter', () => ({
	useSearchFilters: jest.fn(),
}));

jest.mock('@/providers/data-provider', () => ({
	cache: {
		readQuery: jest.fn(),
	},
}));

jest.mock('@/utils/movies', () => ({
	movieFactory: jest.fn((movie) => movie),
}));

const mockMathRandom = jest.spyOn(global.Math, 'random');

const mockMovies = [
	{ id: '1', title: 'Movie 1', posterUrl: 'url1', datePublished: '2023-01-01', ratingValue: '8.5' },
	{ id: '2', title: 'Movie 2', posterUrl: 'url2', datePublished: '2023-02-01', ratingValue: '7.5' },
	{ id: '3', title: 'Movie 3', posterUrl: 'url3', datePublished: '2023-03-01', ratingValue: '9.0' },
];

describe('useRandomMovie Hook', () => {
	beforeEach(() => {
		jest.clearAllMocks();

		(useSearchFilters as jest.Mock).mockReturnValue({ genre: 'action' });

		mockMathRandom.mockReturnValue(0.5);

		(cache.readQuery as jest.Mock).mockReturnValue({
			movies: {
				nodes: mockMovies,
			},
		});
	});

	afterAll(() => {
		mockMathRandom.mockRestore();
	});

	it('selects a random movie when getRandomMovie is called', () => {
		const { result } = renderHook(() => useRandomMovie());

		act(() => {
			result.current.getRandomMovie();
		});

		expect(cache.readQuery).toHaveBeenCalled();
		expect(result.current.randomMovie).toBeDefined();
		expect(result.current.randomMovie?.id).toBe('2');
		expect(result.current.randomMovie?.title).toBe('Movie 2');
	});

	it('should not set random movie when cache is empty', () => {
		(cache.readQuery as jest.Mock).mockReturnValue(null);

		const { result } = renderHook(() => useRandomMovie());

		act(() => {
			result.current.getRandomMovie();
		});

		expect(result.current.randomMovie).toBeUndefined();
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
