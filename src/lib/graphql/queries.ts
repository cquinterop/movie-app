import { gql, TypedDocumentNode } from '@apollo/client';
import { MoviesData, MovieData, MoviesVariables, MovieVariables } from '@/types/movie';
import { GenreData, GenresData } from '@/types/genre';

export const GET_MOVIES: TypedDocumentNode<MoviesData, MoviesVariables> = gql`
	query GetMovies($pagination: PaginationInput, $where: MovieFilterInput) {
		movies(pagination: $pagination, where: $where) {
			nodes {
				bestRating
				datePublished
				directors
				duration
				genres {
					id
					title
				}
				mainActors
				posterUrl
				rating
				ratingValue
				summary
				title
				worstRating
				writers
				id
			}
			pagination {
				perPage
				totalPages
				page
			}
		}
	}
`;

export const GET_MOVIE: TypedDocumentNode<MovieData, MovieVariables> = gql`
	query GetMovie($movieId: ID!) {
		movie(id: $movieId) {
			bestRating
			datePublished
			directors
			duration
			genres {
				id
				title
			}
			id
			mainActors
			posterUrl
			rating
			ratingValue
			summary
			title
			worstRating
			writers
		}
	}
`;

export const GET_GENRES: TypedDocumentNode<GenresData, MovieVariables> = gql`
	query GetGenres {
		genres {
			nodes {
				id
				movies {
					bestRating
					datePublished
					directors
					duration
					genres {
						id
						title
					}
					id
					mainActors
					posterUrl
					rating
					ratingValue
					summary
					title
					worstRating
					writers
				}
				title
			}
			pagination {
				page
				perPage
				totalPages
			}
		}
	}
`;

export const GET_GENRE: TypedDocumentNode<GenreData, MovieVariables> = gql`
	query GetGenre($genreId: ID!) {
		genre(id: $genreId) {
			id
			movies {
				bestRating
				datePublished
				directors
				duration
				genres {
					id
					title
				}
				id
				mainActors
				posterUrl
				rating
				ratingValue
				summary
				title
				worstRating
				writers
			}
			title
		}
	}
`;
