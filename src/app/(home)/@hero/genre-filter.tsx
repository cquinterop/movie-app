'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGenres } from '@/hooks/useCustomQuery';
import { useSearchFilters } from '@/hooks/useSearchFilter';
import { GenreData } from '@/types/genre';
import { useCallback, memo } from 'react';

const GenreFilter = () => {
	const { data: genres } = useGenres();
	const { setParams, genre: currentGenre } = useSearchFilters();

	const handleOpenDialog = useCallback(() => {
		setParams({ modal: 'random' });
	}, [setParams]);

	const handleFilterGenre = useCallback(
		(genre: GenreData['title']) => {
			setParams({ genre }, { append: false });
		},
		[setParams]
	);

	const handleClearFilter = useCallback(() => {
		setParams({ genre: '' });
	}, [setParams]);

	if (!genres.length) {
		return null;
	}

	return (
		<div
			aria-label="Filter movies by genre"
			className="mx-auto mt-6 flex max-w-[700] flex-wrap justify-center gap-3"
		>
			{genres.map((genre) => (
				<Badge
					aria-label={`Filter by ${genre.title}`}
					aria-pressed={genre.title === currentGenre}
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
				aria-label="Clear all genre filters"
				className="cursor-pointer transition-transform hover:scale-105"
				data-testid="clear-genre-filter"
				variant="ghost"
				onClick={handleClearFilter}
			>
				Clear Filters
			</Button>

			<Button
				aria-label="Get a random movie recommendation"
				className="mt-12 cursor-pointer"
				data-testid="random-movie-button"
				onClick={handleOpenDialog}
			>
				Life is like a box of <del>chocolates</del> movies...
			</Button>
		</div>
	);
};

export default memo(GenreFilter);
