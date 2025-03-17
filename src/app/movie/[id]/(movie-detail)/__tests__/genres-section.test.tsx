import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import GenresSection from '@/app/movie/[id]/(movie-detail)/genres-section';

const mockGenres = [
	{ id: '1', title: 'Action' },
	{ id: '2', title: 'Comedy' },
	{ id: '3', title: 'Drama' },
];

describe('GenresSection Component', () => {
	it('renders all genres as badges', () => {
		render(<GenresSection genres={mockGenres} />);

		mockGenres.forEach((genre) => {
			expect(screen.getByText(genre.title)).toBeInTheDocument();
		});
	});

	it('returns null when genres array is empty', () => {
		const { container } = render(<GenresSection genres={[]} />);

		expect(container.firstChild).toBeNull();
	});
});
