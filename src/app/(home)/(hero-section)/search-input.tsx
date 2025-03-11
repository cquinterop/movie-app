'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { searchVar } from '@/providers/data-provider';
import { useSearchParams, useRouter } from 'next/navigation';
import debounce from 'debounce';

const SearchInput = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const initialSearch = searchParams.get('search') ?? '';
	searchVar(initialSearch);

	const handleMovieSearch = debounce((event: { target: HTMLInputElement }) => {
		const searchValue = event.target.value;

		searchVar(searchValue);
		router.replace(`?search=${encodeURIComponent(searchValue)}`);
	}, 1500);

	return (
		<div className="mx-auto mt-10 flex w-1/2 flex-col items-center justify-center gap-4 sm:flex-row">
			<Label
				className="sr-only"
				htmlFor="movie"
			>
				Find a movie
			</Label>
			<div className="relative flex w-3/4 items-center">
				<Search className="text-muted-foreground absolute left-3 h-5 w-5" />
				<Input
					className="h-12 rounded-full border-2 pr-10 pl-10 text-base focus-visible:ring-offset-0"
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
