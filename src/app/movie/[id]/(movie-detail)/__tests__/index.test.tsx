import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import MovieDetail from '@/app/movie/[id]/(movie-detail)/index';
import { useMovie } from '@/hooks/useCustomQuery';
import { handleImageError } from '@/utils/movies';
import { ImgHTMLAttributes } from 'react';

jest.mock('@/hooks/useCustomQuery', () => ({
	useMovie: jest.fn(),
}));

jest.mock('@/utils/movies', () => ({
	handleImageError: jest.fn(),
}));

jest.mock('next/image', () => ({
	__esModule: true,
	default: (props: ImgHTMLAttributes<HTMLImageElement>) => (
		// eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
		<img {...props} />
	),
}));

jest.mock('@/app/movie/[id]/(movie-detail)/cast-section');
jest.mock('@/app/movie/[id]/(movie-detail)/genres-section');
jest.mock('@/app/movie/[id]/(movie-detail)/meta-section');

const mockMovie = {
	id: '1',
	title: 'Test Movie',
	posterUrl: 'https://example.com/poster.jpg',
	datePublished: '2023-01-01',
	ratingValue: '8.5',
	bestRating: '10',
	duration: '120 min',
	summary: 'This is a test movie summary.',
	genres: [{ id: '1', title: 'Action' }],
	directors: [{ id: '1', name: 'Director Name' }],
	writers: [{ id: '1', name: 'Writer Name' }],
	mainActors: [{ id: '1', name: 'Actor Name' }],
};

describe('MovieDetail Component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders the empty state when no movie data is available', () => {
		(useMovie as jest.Mock).mockReturnValue({
			data: { id: null },
		});

		render(<MovieDetail id="1" />);

		expect(screen.getByTestId('empty-state')).toBeInTheDocument();
		expect(screen.queryByText('Test Movie')).not.toBeInTheDocument();
	});

	it('calls handleImageError when image fails to load', () => {
		(useMovie as jest.Mock).mockReturnValue({
			data: mockMovie,
		});

		render(<MovieDetail id="1" />);

		const posterImage = screen.getByTestId('movie-poster');

		fireEvent.error(posterImage);

		expect(handleImageError).toHaveBeenCalled();
	});
});
