'use client';

import { useMovie } from '@/hooks/useCustomQuery';
import { MovieVariables } from '@/types/movie';
import EmptyState from '@/components/ui/empty-state';
import CastSection from '@/app/movie/[id]/(movie-detail)/cast-section';
import MetaSection from '@/app/movie/[id]/(movie-detail)/meta-section';
import GenresSection from '@/app/movie/[id]/(movie-detail)/genres-section';
import PosterImage from '@/components/ui/poster-image';

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
				<PosterImage
					alt="Movie poster"
					className="w-full rounded-lg shadow-lg"
					data-testid="movie-poster"
					height={525}
					src={movie.posterUrl}
					width={325}
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
