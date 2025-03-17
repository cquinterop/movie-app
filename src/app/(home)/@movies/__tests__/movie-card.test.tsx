import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieCard from '@/app/(home)/@movies/movie-card';
import { handleImageError } from '@/utils/movies';
import { POSTER_FALLBACK } from '@/constants/movies';
import { ImgHTMLAttributes } from 'react';

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

const mockProps = ({ isComplete = true } = {}) => ({
	title: isComplete ? 'Test Movie' : '',
	posterUrl: isComplete ? 'https://movies.com/poster.jpg' : POSTER_FALLBACK,
	datePublished: isComplete ? '2023-01-01' : '',
	ratingValue: isComplete ? '8.5' : '',
});

describe('MovieCard Component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders the movie card with correct data', () => {
		const props = mockProps();
		render(<MovieCard {...props} />);

		expect(screen.getByTestId('movie-card')).toBeInTheDocument();
		expect(screen.getByTestId('movie-title')).toHaveTextContent(props.title);
		expect(screen.getByTestId('movie-date')).toHaveTextContent(props.datePublished);
		expect(screen.getByTestId('movie-rating')).toHaveTextContent(`${props.ratingValue}/10`);
		expect(screen.getByTestId('movie-image')).toHaveAttribute('src', props.posterUrl);
	});

	it('calls handleImageError when image fails to load', () => {
		const props = mockProps();
		render(<MovieCard {...props} />);

		const posterImage = screen.getByTestId('movie-image');

		fireEvent.error(posterImage);

		expect(handleImageError).toHaveBeenCalledTimes(1);
	});

	it('renders with missing props', () => {
		const props = {
			title: '',
			posterUrl: 'https://movies.com/poster.jpg',
			datePublished: '',
			ratingValue: '',
		};

		render(<MovieCard {...props} />);

		expect(screen.getByTestId('movie-card')).toBeInTheDocument();
		expect(screen.getByTestId('movie-image')).toHaveAttribute('src', props.posterUrl);
		expect(screen.getByText('/10')).toBeInTheDocument();
	});
});
