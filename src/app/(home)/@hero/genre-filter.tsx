'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGenres } from '@/hooks/useCustomQuery';
import { useSearchFilters } from '@/hooks/useSearchFilter';
import { GenreData } from '@/types/genre';
import { Sparkles } from 'lucide-react';

const GenreFilter = () => {
	const { data: genres } = useGenres();
	const { setParams, genre: currentGenre } = useSearchFilters();

	const handleOpenDialog = () => {
		setParams({ modal: 'random' });
	};

	const handleFilterGenre = (genre: GenreData['title']) => {
		setParams({ genre }, { append: false });
	};

	const handleClearFilter = () => {
		setParams({ genre: '' });
	};

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
					role="button"
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
				className="my-6 cursor-pointer"
				data-testid="random-movie-button"
				variant="ghost"
				onClick={handleOpenDialog}
			>
				<Sparkles className="fill-yellow-500" /> Don&#39;t know what to watch?
			</Button>
		</div>
	);
};

export default GenreFilter;
