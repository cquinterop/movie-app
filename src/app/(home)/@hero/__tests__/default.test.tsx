import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Default from '@/app/(home)/@hero/default';

describe('Default Component', () => {
	it('renders the default component', () => {
		const { container } = render(<Default />);

		expect(container.firstChild).toBeNull();
	});
});
