'use client';

import { Badge } from '@/components/ui/badge';
import { useMovie } from '@/hooks/useCustomQuery';
import { useParams } from 'next/navigation';
import { Star, Hourglass, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { type BaseSyntheticEvent } from 'react';
import { POSTER_FALLBACK } from '@/constants/movies';
import { handleImageError } from '@/utils/movies';
import { MovieVariables } from '@/types/movie';
import EmptyState from '@/components/ui/empty-state';
import CastSection from './cast-section';

const MovieDetail = () => {
	const { id } = useParams();
	const { data: movie } = useMovie({ movieId: id as MovieVariables['movieId'] });

	if (!movie) {
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
					<div className="flex gap-4">
						<p className="flex gap-2">
							<Calendar />
							{movie.datePublished}
						</p>
						<p className="flex gap-2">
							<Star /> {movie.ratingValue}/{movie.bestRating}
						</p>
						<p className="flex gap-2">
							<Hourglass /> {movie.duration}
						</p>
					</div>
					<div className="flex flex-wrap gap-2">
						{movie?.genres?.map((genre) => (
							<Link
								href={`/?genre=${genre.title}`}
								key={genre.id}
							>
								<Badge>{genre.title}</Badge>
							</Link>
						))}
					</div>
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
