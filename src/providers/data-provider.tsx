'use client';

import { type ReactNode, useMemo } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, makeVar } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

interface DataProviderProps {
	children: ReactNode;
}

export const searchVar = makeVar<string>('');

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
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						searchValue: {
							read() {
								return searchVar();
							},
						},
					},
				},
			},
		}),
		defaultOptions: {
			watchQuery: {
				fetchPolicy: 'network-only',
				nextFetchPolicy: 'cache-only',
			},
		},
	});
};

const DataProvider = ({ children }: DataProviderProps) => {
	const client = useMemo(() => createApolloClient(), []);

	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default DataProvider;
