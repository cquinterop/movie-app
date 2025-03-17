import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MetaSection from '@/app/movie/[id]/(movie-detail)/meta-section';

const mockProps = {
	datePublished: '2023-01-01',
	ratingValue: '8.5',
	bestRating: '10',
	duration: '120 min',
};

const partialProps = {
	...mockProps,
	ratingValue: '',
	duration: '',
};

describe('MetaSection Component', () => {
	it('renders all meta information when all props are provided', () => {
		render(<MetaSection {...mockProps} />);

		expect(screen.getByText(mockProps.datePublished)).toBeInTheDocument();
		expect(screen.getByText(`${mockProps.ratingValue}/${mockProps.bestRating}`)).toBeInTheDocument();
		expect(screen.getByText(mockProps.duration)).toBeInTheDocument();
	});

	it('skips rendering items with missing data', () => {
		render(<MetaSection {...partialProps} />);

		expect(screen.queryByText(mockProps.ratingValue)).not.toBeInTheDocument();
		expect(screen.getByText(mockProps.datePublished)).toBeInTheDocument();
		expect(screen.queryByText(mockProps.duration)).not.toBeInTheDocument();
	});
});
