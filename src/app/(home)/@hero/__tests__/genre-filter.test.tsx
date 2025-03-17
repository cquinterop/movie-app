import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import GenreFilter from '@/app/(home)/@hero/genre-filter';
import { useGenres } from '@/hooks/useCustomQuery';
import { useSearchFilters } from '@/hooks/useSearchFilter';

jest.mock('@/hooks/useCustomQuery', () => ({
	useGenres: jest.fn(),
}));

jest.mock('@/hooks/useSearchFilter', () => ({
	useSearchFilters: jest.fn(),
}));

const mockGenres = [
	{ id: '1', title: 'Action' },
	{ id: '2', title: 'Comedy' },
	{ id: '3', title: 'Drama' },
];

describe('GenreFilter Component', () => {
	const mockSetParams = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();

		(useGenres as jest.Mock).mockReturnValue({
			data: mockGenres,
		});

		(useSearchFilters as jest.Mock).mockReturnValue({
			setParams: mockSetParams,
			genre: '',
		});
	});

	it('renders genre badges for each genre', () => {
		render(<GenreFilter />);

		mockGenres.forEach((genre) => {
			expect(screen.getByTestId(`genre-badge-${genre.title}`)).toHaveTextContent(genre.title);
		});
	});

	it('highlights the current selected genre', () => {
		const currentGenre = 'Action';
		(useSearchFilters as jest.Mock).mockReturnValue({
			setParams: mockSetParams,
			genre: currentGenre,
		});

		render(<GenreFilter />);

		const selectedButton = screen.getByTestId(`genre-badge-${currentGenre}`);

		expect(selectedButton).toHaveClass('bg-primary');
		expect(selectedButton).toHaveClass('text-primary-foreground');

		const otherButtons = screen.getAllByTestId(/^genre-badge-(?!Action)/);
		otherButtons.forEach((button) => {
			expect(button).not.toHaveClass('bg-primary');
			expect(button).toHaveClass('bg-secondary');
		});
	});

	it('calls setParams with correct genre when a badge is clicked', () => {
		const currentGenre = 'Comedy';
		render(<GenreFilter />);

		const genreBadge = screen.getByTestId(`genre-badge-${currentGenre}`);
		fireEvent.click(genreBadge);

		expect(mockSetParams).toHaveBeenCalledWith({ genre: currentGenre }, { append: false });
	});

	it('calls setParams with empty genre when Clear Filters is clicked', () => {
		render(<GenreFilter />);

		const clearButton = screen.getByTestId('clear-genre-filter');
		fireEvent.click(clearButton);

		expect(mockSetParams).toHaveBeenCalledWith({ genre: '' });
	});

	it('calls setParams with modal=random when random movie button is clicked', () => {
		render(<GenreFilter />);

		const randomButton = screen.getByTestId('random-movie-button');
		fireEvent.click(randomButton);

		expect(mockSetParams).toHaveBeenCalledWith({ modal: 'random' });
	});

	it('returns null when no genres are available', () => {
		(useGenres as jest.Mock).mockReturnValue({
			data: [],
		});

		const { container } = render(<GenreFilter />);

		expect(container.firstChild).toBeNull();
	});
});
