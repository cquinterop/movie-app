'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGenres } from '@/hooks/useCustomQuery';
import { useSearchFilters } from '@/hooks/useSearchFilter';
import { GenreData } from '@/types/genre';

const GenreFilter = () => {
	const { data: genres } = useGenres();
	const { setParams, genre: currentGenre } = useSearchFilters();

	if (!genres.length) {
		return null;
	}

	const handleOpenDialog = () => {
		setParams({ modal: 'random' });
	};

	const handleFilterGenre = (genre: GenreData['title']) => {
		setParams({ genre }, { append: false });
	};

	const handleClearFilter = () => {
		setParams({ genre: '' });
	};

	return (
		<div className="mx-auto mt-6 flex max-w-[700] flex-wrap justify-center gap-3">
			{genres.map((genre) => (
				<Badge
					className="h-[35] cursor-pointer transition-transform hover:scale-105"
					data-testid={`genre-badge-${genre.title}`}
					key={genre.id}
					tabIndex={0}
					variant={genre.title === currentGenre ? 'default' : 'secondary'}
					onClick={() => handleFilterGenre(genre.title)}
					onKeyDown={(event) => event.key === 'Enter' && handleFilterGenre(genre.title)}
				>
					{genre.title}
				</Badge>
			))}
			<Button
				className="cursor-pointer transition-transform hover:scale-105"
				data-testid="clear-genre-filter"
				variant="ghost"
				onClick={() => handleClearFilter()}
			>
				Clear Filters
			</Button>

			<Button
				className="mt-12 cursor-pointer"
				data-testid="random-movie-button"
				onClick={handleOpenDialog}
			>
				Life is like a box of <del>chocolates</del> movies...
			</Button>
		</div>
	);
};

export default GenreFilter;
