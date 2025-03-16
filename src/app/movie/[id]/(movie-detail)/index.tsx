'use client';

import { useMovie } from '@/hooks/useCustomQuery';
import Image from 'next/image';
import { type BaseSyntheticEvent } from 'react';
import { POSTER_FALLBACK } from '@/constants/movies';
import { handleImageError } from '@/utils/movies';
import { MovieVariables } from '@/types/movie';
import EmptyState from '@/components/ui/empty-state';
import CastSection from '@/app/movie/[id]/(movie-detail)/cast-section';
import MetaSection from '@/app/movie/[id]/(movie-detail)/meta-section';
import GenresSection from '@/app/movie/[id]/(movie-detail)/genres-section';

type MovieDetailProps = {
	id: MovieVariables['movieId'];
};

const MovieDetail = ({ id }: Readonly<MovieDetailProps>) => {
	const { data: movie } = useMovie({ movieId: id });

	if (!movie?.id) {
		return <EmptyState />;
	}

	return (
		<div className="container mx-auto px-4 py-8 lg:px-16">
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
				<Image
					alt={movie.title}
					className="w-full rounded-lg shadow-lg"
					height={500}
					src={movie.posterUrl}
					width={500}
					onError={(event) => handleImageError(event as BaseSyntheticEvent, POSTER_FALLBACK)}
				/>
				<div className="space-y-4 lg:col-span-2">
					<h1 className="text-3xl font-bold">{movie.title}</h1>
					<MetaSection
						bestRating={movie.bestRating}
						datePublished={movie.datePublished}
						duration={movie.duration}
						ratingValue={movie.ratingValue}
					/>
					<GenresSection genres={movie.genres} />
					<p className="text-lg">{movie.summary}</p>
					<CastSection
						directors={movie.directors}
						mainActors={movie.mainActors}
						writers={movie.writers}
					/>
				</div>
			</div>
		</div>
	);
};

export default MovieDetail;
