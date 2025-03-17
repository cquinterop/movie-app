import { renderHook, act } from '@testing-library/react';
import { useSearchFilters } from '@/hooks/useSearchFilter';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
	useSearchParams: jest.fn(),
	useRouter: jest.fn(),
	usePathname: jest.fn(),
}));

const params: Record<string, string> = {
	search: 'test',
	genre: 'action',
	page: '1',
	modal: 'random',
};

describe('useSearchFilters Hook', () => {
	const mockReplace = jest.fn();
	const mockGet = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();

		// Mock implementations
		(useSearchParams as jest.Mock).mockReturnValue({
			get: mockGet,
			toString: () => 'search=test&genre=action&page=1',
		});

		(useRouter as jest.Mock).mockReturnValue({
			replace: mockReplace,
		});

		(usePathname as jest.Mock).mockReturnValue('/');

		mockGet.mockImplementation((key: string) => {
			return params[key] || '';
		});
	});

	it('returns the correct search parameters', () => {
		const { result } = renderHook(() => useSearchFilters());

		expect(result.current.search).toBe(params.search);
		expect(result.current.genre).toBe(params.genre);
		expect(result.current.page).toBe(params.page);
		expect(result.current.modal).toBe(params.modal);
	});

	it('calls router.replace when setParams is called', () => {
		const { result } = renderHook(() => useSearchFilters());

		act(() => {
			result.current.setParams({ search: 'new search', page: 1 });
		});

		expect(mockReplace).toHaveBeenCalled();
	});

	it('removes parameters with empty values', () => {
		const { result } = renderHook(() => useSearchFilters());

		act(() => {
			result.current.setParams({ search: '', genre: '' });
		});

		expect(mockReplace).toHaveBeenCalled();
	});

	it('replaces all parameters when append is false', () => {
		const { result } = renderHook(() => useSearchFilters());

		act(() => {
			result.current.setParams({ search: 'new search' }, { append: false });
		});

		expect(mockReplace).toHaveBeenCalled();

		const url = mockReplace.mock.calls[0][0];
		expect(url).toContain('search=new+search');
	});
});
