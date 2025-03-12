'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGenres } from '@/hooks/useCustomQuery';
import { useSearchFilters } from '@/hooks/useSearchFilter';

const GenreFilter = () => {
	const { data: genres } = useGenres();
	const { setParams, genre: currentGenre } = useSearchFilters();

	if (!genres.length) return null;

	return (
		<div className="mx-auto mt-10 flex w-1/2 items-center justify-center gap-4">
			{genres.map((genre) => (
				<Badge
					key={genre.id}
					className="cursor-pointer"
					variant={genre.title === currentGenre ? '' : 'outline'}
					onClick={() => setParams({ genre: genre.title })}
				>
					{genre.title}
				</Badge>
			))}
			<Button
				onClick={() => setParams({ genre: '' })}
				variant="outline"
			>
				Clear Filters
			</Button>
		</div>
	);
};

export default GenreFilter;
