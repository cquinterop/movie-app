'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { MovieFilterInput, PaginationInput } from '@/types/movie';

interface CustomParams {
	modal?: string;
}

interface SearchOptions {
	append?: boolean;
}

type SearchParams = CustomParams & MovieFilterInput & PaginationInput;

export const useSearchFilters = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const params = {
		search: searchParams.get('search') ?? '',
		genre: searchParams.get('genre') ?? '',
		page: Number(searchParams.get('page')) || 1,
		modal: searchParams.get('modal') ?? '',
	};

	const setParams = (input: SearchParams, options: SearchOptions = {}) => {
		const { append = true } = options;
		const params = new URLSearchParams(append ? searchParams : '');

		Object.entries(input).forEach(([key, value]) => {
			if (!value) {
				params.delete(key);

				return;
			}

			params.set(key, value);
		});

		router.push(`${pathname}?${params.toString()}`);
	};

	return {
		...params,
		setParams,
	};
};
