import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '@/app/movie/[id]/error';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
}));

describe('Error Component', () => {
	const mockReset = jest.fn();
	const mockBack = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();

		(useRouter as jest.Mock).mockReturnValue({
			back: mockBack,
		});
	});

	it('renders the error message', () => {
		render(
			<ErrorBoundary
				error="Test error"
				reset={mockReset}
			/>
		);

		expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
	});

	it('calls reset function when Try Again button is clicked', () => {
		render(
			<ErrorBoundary
				error="Test error"
				reset={mockReset}
			/>
		);

		const tryAgainButton = screen.getByText('Try Again');
		fireEvent.click(tryAgainButton);

		expect(mockReset).toHaveBeenCalledTimes(1);
	});

	it('calls router.back when Go Back button is clicked', () => {
		render(
			<ErrorBoundary
				error="Test error"
				reset={mockReset}
			/>
		);

		const goBackButton = screen.getByText('Go Back');
		fireEvent.click(goBackButton);

		expect(mockBack).toHaveBeenCalledTimes(1);
	});
});
