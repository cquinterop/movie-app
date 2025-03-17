import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '@/app/(home)/@hero/page';

jest.mock('@/app/(home)/@hero/main-heading');
jest.mock('@/app/(home)/@hero/search-input');
jest.mock('@/app/(home)/@hero/genre-filter');
jest.mock('@/app/(home)/@hero/movie-modal');

describe('Page Component', () => {
	it('renders the page component', () => {
		render(<Page />);

		expect(screen.getByTestId('hero-section')).toBeInTheDocument();
	});
});
