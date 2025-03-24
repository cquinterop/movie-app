'use client';

import { type ReactNode, useMemo } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { MoviesVariables } from '@/types/movie';

interface DataProviderProps {
	children: ReactNode;
}

const getCacheKey = ({ pagination, where }: MoviesVariables) => `genre:${where?.genre}-page:${pagination?.page}`;

export const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				movies: {
					keyArgs: false,
					read: (existing, { variables }) => existing?.[getCacheKey(variables as MoviesVariables)],
					merge: (existing, incoming, { variables }) => ({
						...(existing || {}),
						[getCacheKey(variables as MoviesVariables)]: incoming,
					}),
				},
			},
		},
	},
});

const createApolloClient = () => {
	return new ApolloClient({
		uri: `${process.env.NEXT_PUBLIC_MOVIES_API_BASE_URL}/graphql`,
		cache,
		headers: {
			authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIES_API_TOKEN}`,
		},
		defaultOptions: {
			query: {
				fetchPolicy: 'cache-first',
			},
		},
	});
};

const DataProvider = ({ children }: Readonly<DataProviderProps>) => {
	const client = useMemo(() => createApolloClient(), []);

	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default DataProvider;
