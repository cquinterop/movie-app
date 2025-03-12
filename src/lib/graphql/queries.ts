import { gql, TypedDocumentNode } from '@apollo/client';
import { MoviesData, MovieData, MoviesVariables, MovieVariables } from '@/types/movie';
import { GenreData, GenresData } from '@/types/genre';
import { MOVIE_FRAGMENT, PAGINATION_FRAGMENT } from '@/lib/graphql/fragments';

export const GET_MOVIES: TypedDocumentNode<MoviesData, MoviesVariables> = gql`
	query GetMovies($pagination: PaginationInput, $where: MovieFilterInput) {
		movies(pagination: $pagination, where: $where) {
			nodes {
				...MovieFragment
			}
			pagination {
				...PaginationFragment
			}
			totalMovies @client
		}
	}

	${MOVIE_FRAGMENT}
	${PAGINATION_FRAGMENT}
`;

export const GET_MOVIE: TypedDocumentNode<MovieData, MovieVariables> = gql`
	query GetMovie($movieId: ID!) {
		movie(id: $movieId) {
			...MovieFragment
		}
	}

	${MOVIE_FRAGMENT}
`;

export const GET_GENRES: TypedDocumentNode<GenresData, MovieVariables> = gql`
	query GetGenres($includeMovies: Boolean = false) {
		genres {
			nodes {
				id
				title
				movies @include(if: $includeMovies) {
					...MovieFragment
				}
			}
		}
	}

	${MOVIE_FRAGMENT}
`;

export const GET_GENRE: TypedDocumentNode<GenreData, MovieVariables> = gql`
	query GetGenre($genreId: ID!, $includeMovies: Boolean = false) {
		genre(id: $genreId) {
			id
			title
			movies @include(if: $includeMovies) {
				...MovieFragment
			}
		}
	}
`;
