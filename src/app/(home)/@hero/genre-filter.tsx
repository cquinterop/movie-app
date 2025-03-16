'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGenres } from '@/hooks/useCustomQuery';
import { useSearchFilters } from '@/hooks/useSearchFilter';

const GenreFilter = () => {
	const { data: genres } = useGenres();
	const { setParams, genre: currentGenre } = useSearchFilters();

	if (!genres.length) return null;

	const handleOpenDialog = () => {
		setParams({ modal: 'random' });
	};

	return (
		<div className="mx-auto mt-6 flex max-w-[700] flex-wrap justify-center gap-3">
			{genres.map((genre) => (
				<Badge
					className="h-[35] cursor-pointer transition-transform hover:scale-105"
					key={genre.id}
					tabIndex={0}
					variant={genre.title === currentGenre ? 'default' : 'secondary'}
					onClick={() => setParams({ genre: genre.title }, { append: false })}
					onKeyDown={(e) => e.key === 'Enter' && setParams({ genre: genre.title }, { append: false })}
				>
					{genre.title}
				</Badge>
			))}
			<Button
				className="cursor-pointer transition-transform hover:scale-105"
				variant="ghost"
				onClick={() => setParams({ genre: '' })}
			>
				Clear Filters
			</Button>

			<Button
				className="mt-12 cursor-pointer"
				onClick={handleOpenDialog}
			>
				Life is like a box of <del>chocolates</del> movies?
			</Button>
		</div>
	);
};

export default GenreFilter;
