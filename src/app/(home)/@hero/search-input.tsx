'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import debounce from 'debounce';
import { useSearchFilters } from '@/hooks/useSearchFilter';
import { useMemo } from 'react';

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
		<div className="mx-auto mt-10 flex w-1/2 flex-col items-center justify-center gap-4 sm:flex-row">
			<Label
				className="sr-only"
				htmlFor="movie"
			>
				Find a movie
			</Label>
			<div className="relative flex w-3/4 items-center">
				<Search
					aria-hidden="true"
					className="text-muted-foreground absolute left-3 h-5 w-5"
				/>
				<Input
					autoFocus
					aria-label="Search for movies"
					className="h-12 rounded-full border-2 pr-10 pl-10 text-base focus-visible:ring-offset-0"
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
