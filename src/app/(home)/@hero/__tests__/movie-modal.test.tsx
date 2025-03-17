import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import MovieModal from '@/app/(home)/@hero/movie-modal';
import { useRandomMovie } from '@/hooks/useRandomMovie';
import { useSearchFilters } from '@/hooks/useSearchFilter';
import { ImgHTMLAttributes } from 'react';

jest.mock('@/hooks/useRandomMovie', () => ({
	useRandomMovie: jest.fn(),
}));

jest.mock('@/hooks/useSearchFilter', () => ({
	useSearchFilters: jest.fn(),
}));

jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
}));

jest.mock('next/image', () => ({
	__esModule: true,
	default: (props: ImgHTMLAttributes<HTMLImageElement>) => (
		// eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
		<img {...props} />
	),
}));

const mockMovie = {
	id: '1',
	title: 'Test Movie',
	posterUrl: 'https://example.com/poster.jpg',
	datePublished: '2023-01-01',
	ratingValue: '8.5',
};

describe('MovieModal Component', () => {
	const mockGetRandomMovie = jest.fn();
	const mockSetParams = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();

		(useRandomMovie as jest.Mock).mockReturnValue({
			randomMovie: mockMovie,
			getRandomMovie: mockGetRandomMovie,
		});

		(useSearchFilters as jest.Mock).mockReturnValue({
			genre: 'Action',
			modal: 'random',
			setParams: mockSetParams,
		});
	});

	it('renders the dialog when modal is open', () => {
		render(<MovieModal />);

		expect(screen.getByTestId('movie-dialog')).toBeInTheDocument();
	});

	it('renders the movie card with correct data', () => {
		render(<MovieModal />);

		expect(screen.getByTestId('movie-card')).toBeInTheDocument();
		expect(screen.getByTestId('movie-title')).toHaveTextContent(mockMovie.title);
		expect(screen.getByTestId('movie-date')).toHaveTextContent(mockMovie.datePublished);
		expect(screen.getByTestId('movie-rating')).toHaveTextContent(mockMovie.ratingValue);
		expect(screen.getByTestId('movie-image')).toHaveAttribute('src', mockMovie.posterUrl);
	});

	it('calls getRandomMovie when modal is opened', () => {
		render(<MovieModal />);

		expect(mockGetRandomMovie).toHaveBeenCalledTimes(1);
	});

	it('returns null when no movie is available', () => {
		(useRandomMovie as jest.Mock).mockReturnValue({
			randomMovie: { id: null },
			getRandomMovie: mockGetRandomMovie,
		});

		const { container } = render(<MovieModal />);
		expect(container.firstChild).toBeNull();
	});

	it('calls setParam when dialog is closed', () => {
		render(<MovieModal />);

		expect(screen.getByTestId('movie-dialog')).toBeInTheDocument();

		const closeButton = screen.getByText('Close').closest('button');
		if (closeButton) {
			fireEvent.click(closeButton);
			expect(mockSetParams).toHaveBeenCalledTimes(1);
		}
	});
});
