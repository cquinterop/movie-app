'use client';

import { type ReactNode, useMemo } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

interface DataProviderProps {
	children: ReactNode;
}

export const cache = new InMemoryCache();

const createApolloClient = () => {
	return new ApolloClient({
		uri: `${process.env.NEXT_PUBLIC_MOVIES_API_BASE_URL}/graphql`,
		cache,
		headers: {
			authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIES_API_TOKEN}`,
		},
		defaultOptions: {
			watchQuery: {
				fetchPolicy: 'network-only',
				nextFetchPolicy: 'cache-only',
			},
		},
	});
};

const DataProvider = ({ children }: Readonly<DataProviderProps>) => {
	const client = useMemo(() => createApolloClient(), []);

	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default DataProvider;
