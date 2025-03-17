import { Badge } from '@/components/ui/badge';
import { MovieData } from '@/types/movie';
import Link from 'next/link';
import { memo } from 'react';

type GenresSectionProps = Pick<MovieData['movie'], 'genres'>;

const GenresSection = ({ genres }: Readonly<GenresSectionProps>) => {
	if (!genres.length) {
		return null;
	}

	return (
		<div
			className="flex flex-wrap gap-2"
			data-testid="genres-section"
		>
			{genres?.map((genre) => (
				<Link
					href={`/?genre=${genre.title}`}
					key={genre.id}
				>
					<Badge>{genre.title}</Badge>
				</Link>
			))}
		</div>
	);
};

export default memo(GenresSection);
