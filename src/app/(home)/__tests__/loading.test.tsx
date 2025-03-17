import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Spinner from '@/app/(home)/loading';

describe('Spinner Component', () => {
	it('includes the Clapperboard icon with animation', () => {
		render(<Spinner />);

		expect(screen.getByTestId('page-spinner')).toHaveClass('animate-bounce');
	});
});
