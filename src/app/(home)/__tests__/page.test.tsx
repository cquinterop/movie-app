import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Page from '@/app/(home)/page';

describe('Page Component', () => {
	it('renders the default component', () => {
		const { container } = render(<Page />);

		expect(container.firstChild).toBeNull();
	});
});
