import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import BasePagination from '@/app/(home)/@movies/base-pagination';
import { useSearchFilters } from '@/hooks/useSearchFilter';
import { getItemType } from '@/utils/pagination';

jest.mock('@/hooks/useSearchFilter', () => ({
	useSearchFilters: jest.fn(),
}));

jest.mock('@/utils/pagination', () => ({
	getItemType: jest.fn(),
}));

describe('BasePagination Component', () => {
	const mockSetParams = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();

		(useSearchFilters as jest.Mock).mockReturnValue({
			setParams: mockSetParams,
		});

		(getItemType as jest.Mock).mockImplementation(({ itemNumber, page }) => {
			if (itemNumber === page) return 'current';
			if (itemNumber === 1 || itemNumber === 5) return 'number';
			if (itemNumber === 3) return 'ellipsis';
			return null;
		});
	});

	it('renders pagination with correct number of pages', () => {
		render(
			<BasePagination
				page={1}
				totalPages={5}
			/>
		);

		expect(screen.getByText('Previous')).toBeInTheDocument();
		expect(screen.getByText('Next')).toBeInTheDocument();

		expect(screen.getByText('1')).toBeInTheDocument();
		expect(screen.getByText('5')).toBeInTheDocument();
	});

	it('disables the Previous button on the first page', () => {
		render(
			<BasePagination
				page={1}
				totalPages={5}
			/>
		);

		const prevButton = screen.getByText('Previous').closest('button');

		expect(prevButton).toBeDisabled();
		expect(prevButton).toHaveAttribute('aria-disabled', 'true');
	});

	it('disables the Next button on the last page', () => {
		render(
			<BasePagination
				page={5}
				totalPages={5}
			/>
		);

		const nextButton = screen.getByText('Next').closest('button');

		expect(nextButton).toBeDisabled();
		expect(nextButton).toHaveAttribute('aria-disabled', 'true');
	});

	it('calls setParams with previous page when Previous button is clicked', () => {
		render(
			<BasePagination
				page={3}
				totalPages={5}
			/>
		);

		const prevButton = screen.getByText('Previous').closest('button');
		expect(prevButton).not.toBeNull();
		if (prevButton) {
			fireEvent.click(prevButton);
			expect(mockSetParams).toHaveBeenCalledWith({ page: 2 });
		}
	});

	it('calls setParams with next page when Next button is clicked', () => {
		render(
			<BasePagination
				page={3}
				totalPages={5}
			/>
		);

		const nextButton = screen.getByText('Next').closest('button');
		expect(nextButton).not.toBeNull();
		if (nextButton) {
			fireEvent.click(nextButton);
			expect(mockSetParams).toHaveBeenCalledWith({ page: 4 });
		}
	});

	it('calls setParams with the correct page when a page number is clicked', () => {
		render(
			<BasePagination
				page={3}
				totalPages={5}
			/>
		);

		const pageButton = screen.getByText('5').closest('button');
		expect(pageButton).not.toBeNull();
		if (pageButton) {
			fireEvent.click(pageButton);
			expect(mockSetParams).toHaveBeenCalledWith({ page: 5 });
		}
	});

	it('renders ellipsis when needed', () => {
		render(
			<BasePagination
				page={1}
				totalPages={5}
			/>
		);

		const ellipsisElement = screen.getByText('More pages', { selector: '.sr-only' });
		expect(ellipsisElement).toBeInTheDocument();
	});

	it('applies the correct variant to the current page button', () => {
		render(
			<BasePagination
				page={1}
				totalPages={5}
			/>
		);

		const currentPageButton = screen.getByText('1').closest('button');
		expect(currentPageButton).not.toBeNull();
		if (currentPageButton) {
			expect(currentPageButton).toHaveAttribute('aria-label', 'Go to page 1');
		}
	});
});
