import { Skeleton } from '@/components/ui/skeleton';

const MoviesSkeleton = () => {
	return (
		<div
			className="container mx-auto space-y-8"
			data-testid="movies-skeleton"
		>
			<div className="flex items-center gap-4">
				<Skeleton className="h-10 w-36" />
			</div>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
				{[...Array(8)].map((_, index) => (
					<Skeleton
						className="h-[525px] w-full rounded-xl"
						key={index}
					/>
				))}
			</div>
		</div>
	);
};

export default MoviesSkeleton;
