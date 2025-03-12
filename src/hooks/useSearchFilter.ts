import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { MovieFilterInput, PaginationInput } from '@/types/movie';

type SearchParams = MovieFilterInput & PaginationInput;
interface SearchOptions {
	delay?: number;
	navigation?: 'push' | 'replace';
}

export const useSearchFilters = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const search = searchParams.get('search') ?? '';
	const genre = searchParams.get('genre') ?? '';
	const page = searchParams.get('page') ?? '';

	const setParams = (input: SearchParams, options: SearchOptions = {}) => {
		const params = new URLSearchParams(searchParams);

		Object.entries(input).forEach(([key, value]) => {
			if (!value) {
				params.delete(key);

				return;
			}

			params.set(key, value);
		});

		router[options?.navigation ?? 'replace'](`${pathname}?${params.toString()}`);
	};

	return {
		search,
		genre,
		page,
		setParams,
	};
};
