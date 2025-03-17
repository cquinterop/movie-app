import { Skeleton } from '@/components/ui/skeleton';
const MovieSkeleton = () => {
	return (
		<div
			className="container mx-auto p-6"
			data-testid="movie-skeleton"
		>
			<Skeleton className="mb-4 h-10 w-1/3" />
			<Skeleton className="mb-4 h-96 w-full" />
			<Skeleton className="mb-2 h-6 w-2/3" />
			<Skeleton className="h-6 w-1/3" />
		</div>
	);
};

export default MovieSkeleton;
