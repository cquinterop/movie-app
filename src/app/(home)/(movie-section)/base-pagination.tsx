import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink, PaginationEllipsis } from '@/components/ui/pagination';
import { getItemType } from '@/utils/pagination';
import { useMemo } from 'react';

interface PaginationProps {
	totalPages: number;
	page: number;
}

const BasePagination = ({ totalPages, page }: Readonly<PaginationProps>) => {
	const totalItems = useMemo(() => Array.from({ length: totalPages }, (_, index) => index + 1), [totalPages]);

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						aria-disabled={page === 1}
						aria-label="Go to previous page"
						className={page === 1 ? 'pointer-events-none opacity-50' : ''}
						href={page > 1 ? `?page=${page - 1}` : '#'}
						tabIndex={page === 1 ? -1 : 0}
					/>
				</PaginationItem>
				{totalItems.map((itemNumber) => {
					const type = getItemType({ itemNumber, page, totalPages });
					if (!type) {
						return null;
					}

					return (
						<PaginationItem key={itemNumber}>
							{type === 'ellipsis' ? (
								<PaginationEllipsis />
							) : (
								<PaginationLink
									href={`?page=${itemNumber}`}
									isActive={page === itemNumber}
								>
									{itemNumber}
								</PaginationLink>
							)}
						</PaginationItem>
					);
				})}
				<PaginationItem>
					<PaginationNext
						aria-disabled={page === totalPages}
						aria-label="Go to next page"
						className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
						href={page < totalPages ? `?page=${page + 1}` : '#'}
						tabIndex={page === totalPages ? -1 : 0}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default BasePagination;
