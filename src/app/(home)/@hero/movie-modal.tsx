'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { useEffect } from 'react';
import { useRandomMovie } from '@/hooks/useRandomMovie';
import { useSearchFilters } from '@/hooks/useSearchFilter';
import MovieCard from '../@movies/movie-card';
import { X } from 'lucide-react';

const MovieModal = () => {
	const { randomMovie: movie, getRandomMovie } = useRandomMovie();
	const { genre, setParams, modal } = useSearchFilters();

	const isOpen = modal === 'random';

	useEffect(() => {
		if (isOpen) {
			getRandomMovie();
		}
	}, [isOpen, getRandomMovie]);

	if (!movie?.id) {
		return null;
	}

	const handleCloseDialog = () => {
		setParams({ modal: '' });
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={handleCloseDialog}
		>
			<DialogContent data-testid="movie-dialog">
				<DialogHeader>
					<DialogTitle data-testid="movie-dialog-title">
						You <del>Never</del> Know What {genre} Movie You&#39;ll Get!
					</DialogTitle>
					<DialogDescription>Here&#39;s you have your recommendation for today.</DialogDescription>
				</DialogHeader>
				<MovieCard
					datePublished={movie.datePublished}
					posterUrl={movie.posterUrl}
					ratingValue={movie.ratingValue}
					title={movie.title}
				/>
				<DialogClose data-testid="movie-dialog-close">
					<X className="h-4 w-4" />
					<span className="sr-only">Close</span>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
};

export default MovieModal;
