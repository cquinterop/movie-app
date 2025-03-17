import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MainHeading from '@/app/(home)/@hero/main-heading';

describe('MainHeading Component', () => {
	it('renders the main heading with correct text', () => {
		render(<MainHeading />);

		expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
	});

	it('renders the subheading with correct text', () => {
		render(<MainHeading />);

		expect(screen.getByText('Or discover you next favorite one!')).toBeInTheDocument();
	});
});
