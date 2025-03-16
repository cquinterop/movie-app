'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useEffect } from 'react';
import { useRandomMovie } from '@/hooks/useRandomMovie';
import { useSearchFilters } from '@/hooks/useSearchFilter';
import MovieCard from '../@movies/movie-card';

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
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						You <del>Never</del> Know What {genre} Movie You&#39;ll Get!
					</DialogTitle>
				</DialogHeader>
				<MovieCard
					datePublished={movie.datePublished}
					posterUrl={movie.posterUrl}
					ratingValue={movie.ratingValue}
					title={movie.title}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default MovieModal;
