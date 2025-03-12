import { MovieData } from '@/types/movie';

export interface GenreData {
	id: string;
	title: string;
	movies?: MovieData[];
}

export interface GenresData {
	genres: {
		nodes: GenreData[];
	};
}
