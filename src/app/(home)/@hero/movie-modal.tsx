'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useEffect } from 'react';
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

	const handleCloseDialog = () => {
		setParams({ modal: '' });
	};

	if (!movie?.id) {
		return null;
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={handleCloseDialog}
		>
			<DialogContent data-testid="movie-dialog">
				<DialogHeader>
					<DialogTitle data-testid="movie-dialog-title">Here&#39;s Your {genre} Movie Recommendation!</DialogTitle>
					<DialogDescription>A fresh random movie to watch, every time.</DialogDescription>
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

export default MovieModal;
