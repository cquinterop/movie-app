import { useSearchParams, useRouter } from 'next/navigation';
import { MovieFilterInput } from '@/types/movie';

export const useSearchFilters = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const search = searchParams.get('search') ?? '';
	const genre = searchParams.get('genre') ?? '';

	const setParams = (input: MovieFilterInput) => {
		const params = new URLSearchParams(searchParams);

		Object.entries(input).forEach(([key, value]) => {
			if (!value) {
				params.delete(key);

				return;
			}

			params.set(key, value);
		});

		router.replace(`?${params.toString()}`);
	};

	return {
		search,
		genre,
		setParams,
	};
};
