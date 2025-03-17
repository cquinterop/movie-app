import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from '@/app/(home)/@hero/search-input';
import { useSearchFilters } from '@/hooks/useSearchFilter';
import debounce from 'debounce';

jest.mock('@/hooks/useSearchFilter', () => ({
	useSearchFilters: jest.fn(),
}));

jest.mock('debounce', () => jest.fn((fn) => fn));

describe('SearchInput Component', () => {
	const mockSetParams = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();

		// Default mock implementations
		(useSearchFilters as jest.Mock).mockReturnValue({
			search: '',
			setParams: mockSetParams,
		});
	});

	it('renders the search input', () => {
		render(<SearchInput />);

		expect(screen.getByTestId('movie-search')).toHaveAttribute('type', 'search');
	});

	it('sets the default value from the search filter', () => {
		const initialSearch = 'Star Wars';
		(useSearchFilters as jest.Mock).mockReturnValue({
			search: initialSearch,
			setParams: mockSetParams,
		});

		render(<SearchInput />);

		expect(screen.getByTestId('movie-search')).toHaveValue(initialSearch);
	});

	it('calls setParams with search term and page 1 when input changes', () => {
		const movie = 'Matrix';
		render(<SearchInput />);

		fireEvent.change(screen.getByTestId('movie-search'), { target: { value: movie } });

		expect(mockSetParams).toHaveBeenCalledWith({ search: movie, page: 1 });
	});

	it('uses debounce for the search handler', () => {
		render(<SearchInput />);

		expect(debounce).toHaveBeenCalled();
	});
});
