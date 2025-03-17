'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useEffect, useCallback, memo } from 'react';
import { useRandomMovie } from '@/hooks/useRandomMovie';
import { useSearchFilters } from '@/hooks/useSearchFilter';
import MovieCard from '../@movies/movie-card';
import Link from 'next/link';

const MovieModal = () => {
	const { randomMovie: movie, getRandomMovie } = useRandomMovie();
	const { genre, setParams, modal } = useSearchFilters();

	const isOpen = modal === 'random';

	useEffect(() => {
		if (isOpen) {
			getRandomMovie();
		}
	}, [isOpen, getRandomMovie]);

	const handleCloseDialog = useCallback(() => {
		setParams({ modal: '' });
	}, [setParams]);

	if (!movie?.id) {
		return null;
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={handleCloseDialog}
		>
			<DialogContent
				aria-labelledby="movie-dialog-title"
				data-testid="movie-dialog"
			>
				<DialogHeader>
					<DialogTitle
						data-testid="movie-dialog-title"
						id="movie-dialog-title"
					>
						You <del>Never</del> Know What {genre} Movie You&#39;ll Get!
					</DialogTitle>
					<DialogDescription>Here&#39;s your recommendation for today.</DialogDescription>
				</DialogHeader>
				<Link
					href={`/movie/${movie.id}`}
					key={movie.id}
				>
					<MovieCard
						datePublished={movie.datePublished}
						posterUrl={movie.posterUrl}
						ratingValue={movie.ratingValue}
						title={movie.title}
					/>
				</Link>
			</DialogContent>
		</Dialog>
	);
};

export default memo(MovieModal);
