import { gql } from '@apollo/client';

export const MOVIE_FRAGMENT = gql`
	fragment MovieFragment on Movie {
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
`;

export const PAGINATION_FRAGMENT = gql`
	fragment PaginationFragment on Pagination {
		page
		perPage
		totalPages
	}
`;
