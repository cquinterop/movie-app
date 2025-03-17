import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MoviesSkeleton from '@/app/(home)/loading';

describe('Skeleton Component', () => {
	it('includes the Skeleton', () => {
		render(<MoviesSkeleton />);

		expect(screen.getByTestId('movies-skeleton')).toBeInTheDocument();
	});
});
