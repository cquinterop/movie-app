import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MovieSkeleton from '@/app/movie/[id]/loading';

describe('Skeleton Component', () => {
	it('includes the Skeleton', () => {
		render(<MovieSkeleton />);

		expect(screen.getByTestId('movie-skeleton')).toBeInTheDocument();
	});
});
