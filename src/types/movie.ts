import { type GenreData } from '@/types/genre';

export interface MovieData {
	movie: {
		id: string;
		bestRating: number;
		datePublished: string;
		directors: string[];
		duration: string;
		genres: GenreData[];
		mainActors: string[];
		posterUrl: string;
		rating: string;
		ratingValue: number;
		summary: string;
		title: string;
		worstRating: number;
		writers: string[];
	};
}

export interface MoviesData {
	movies: {
		nodes: MovieData['movie'][];
		pagination: PaginationInput;
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
