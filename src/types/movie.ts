import { type GenreData } from '@/types/genre';

export interface MovieData {
	movie: {
		id: string;
		bestRating: string;
		datePublished: string;
		directors: string[];
		duration: string;
		genres: GenreData[];
		mainActors: string[];
		posterUrl: string;
		rating: string;
		ratingValue: string;
		summary: string;
		title: string;
		worstRating: string;
		writers: string[];
	};
}

export interface MoviesData {
	movies: {
		nodes: MovieData['movie'][];
		pagination: PaginationInput;
		totalMovies?: number;
	};
}

export interface MovieFilterInput {
	search?: string;
	genre?: string;
}

export interface PaginationInput {
	perPage?: string;
	page?: string;
	totalPages?: string;
}

export interface MoviesVariables {
	pagination?: PaginationInput;
	where?: MovieFilterInput;
}

export interface MovieVariables {
	movieId: string;
}
