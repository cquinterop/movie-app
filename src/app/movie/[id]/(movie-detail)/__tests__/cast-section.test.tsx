import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CastSection from '@/app/movie/[id]/(movie-detail)/cast-section';

const mockProps = {
	directors: ['Director Name'],
	writers: ['Writer Name'],
	mainActors: ['Actor One', 'Actor Two'],
};

const partialProps = {
	directors: [],
	writers: ['Writer Name'],
	mainActors: ['Actor One'],
};

describe('CastSection Component', () => {
	it('renders all cast sections with correct headings', () => {
		render(<CastSection {...mockProps} />);

		expect(screen.getByText('Directors')).toBeInTheDocument();
		expect(screen.getByText('Writers')).toBeInTheDocument();
		expect(screen.getByText('Main Actors')).toBeInTheDocument();
	});

	it('renders all cast members with their names', () => {
		render(<CastSection {...mockProps} />);

		expect(screen.getByText('Director Name')).toBeInTheDocument();
		expect(screen.getByText('Writer Name')).toBeInTheDocument();
		expect(screen.getByText('Actor One')).toBeInTheDocument();
		expect(screen.getByText('Actor Two')).toBeInTheDocument();
	});

	it('skips rendering sections with empty arrays', () => {
		render(<CastSection {...partialProps} />);

		expect(screen.queryByText('Directors')).not.toBeInTheDocument();
		expect(screen.getByText('Writers')).toBeInTheDocument();
		expect(screen.getByText('Main Actors')).toBeInTheDocument();
	});
});
