import { POSTER_FALLBACK } from '@/constants/movies';
import { MovieData } from '@/types/movie';
import { Duration } from 'luxon';

export const handleImageError = (event: { target: HTMLImageElement }, fallback: HTMLImageElement['srcset']) => {
	event.target.srcset = fallback;
};

export const formatDateToLocale = (date: string) => {
	return new Intl.DateTimeFormat().format(new Date(date));
};

export const formatISOString = (time: string): string => {
	return Duration.fromISO(time).toFormat("h 'hour' m 'minutes'");
};

export const movieFactory = (movie: MovieData['movie']) => ({
	id: movie?.id ?? crypto.randomUUID(),
	bestRating: movie?.bestRating ?? 0,
	datePublished: movie?.datePublished ? formatDateToLocale(movie.datePublished) : '',
	directors: movie?.directors ?? [],
	duration: movie?.duration ? formatISOString(movie?.duration) : '',
	genres: movie?.genres ?? [],
	mainActors: movie?.mainActors ?? [],
	posterUrl: movie?.posterUrl ?? POSTER_FALLBACK,
	rating: movie?.rating ?? '',
	ratingValue: movie?.ratingValue ?? 0,
	summary: movie?.summary ?? '',
	title: movie?.title ?? '',
	worstRating: movie?.worstRating ?? '',
	writers: movie?.writers ?? [],
});
