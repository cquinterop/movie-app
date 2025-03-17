import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Default from '@/app/movie/[id]/default';

describe('Default Component', () => {
	it('renders the default component', () => {
		const { container } = render(<Default />);

		expect(container.firstChild).toBeNull();
	});
});
