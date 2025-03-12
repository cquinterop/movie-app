'use client';

import { type ReactNode, useMemo } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
interface DataProviderProps {
	children: ReactNode;
}

const createApolloClient = () => {
	const httpLink = createHttpLink({
		uri: `${process.env.NEXT_PUBLIC_MOVIES_API_BASE_URL}/graphql`,
	});

	const authLink = setContext((_, { headers }) => {
		const token = process.env.NEXT_PUBLIC_MOVIES_API_TOKEN;

		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : '',
			},
		};
	});

	return new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache(),
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
