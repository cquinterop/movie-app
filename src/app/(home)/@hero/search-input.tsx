'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { useSearchFilters } from '@/hooks/useSearchFilter';
import { useMemo } from 'react';
import debounce from 'debounce';

const SearchInput = () => {
	const { search: initialSearch, setParams } = useSearchFilters();

	const handleMovieSearch = useMemo(
		() =>
			debounce((event: { target: HTMLInputElement }) => {
				const search = event.target.value;
				setParams({ search, page: 1 });
			}, 1500),
		[setParams]
	);

	return (
		<div className="mt-10 flex justify-center px-5">
			<Label
				className="sr-only"
				htmlFor="movie"
			>
				Find a movie
			</Label>
			<div className="relative w-full lg:w-1/2">
				<Search
					aria-hidden="true"
					className="absolute top-3 left-3 h-5 w-5"
				/>
				<Input
					autoFocus
					aria-label="Search for movies"
					className="h-12 rounded-full border-2 px-10"
					data-testid="movie-search"
					defaultValue={initialSearch}
					id="movie"
					name="search"
					pattern="[a-zA-Z0-9\s]{3,}"
					placeholder="e.g. Terminator"
					type="search"
					onChange={handleMovieSearch}
				/>
			</div>
		</div>
	);
};

export default SearchInput;
