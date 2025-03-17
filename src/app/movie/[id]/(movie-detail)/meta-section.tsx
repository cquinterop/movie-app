import { MovieData } from '@/types/movie';
import { Calendar, Hourglass, Star } from 'lucide-react';

type MetaSectionPros = Pick<MovieData['movie'], 'bestRating' | 'datePublished' | 'duration' | 'ratingValue'>;

const MetaSection = ({ datePublished, ratingValue, duration, bestRating }: Readonly<MetaSectionPros>) => {
	const meta = [
		{ data: datePublished, icon: <Calendar /> },
		{ data: `${ratingValue}/${bestRating}`, icon: <Star /> },
		{ data: duration, icon: <Hourglass /> },
	];

	return (
		<div
			className="flex gap-4"
			data-testid="meta-section"
		>
			{meta.map(
				({ data, icon }) =>
					!!data && (
						<div
							className="flex gap-2"
							key={data}
						>
							<span>{icon}</span>
							<span>{data}</span>
						</div>
					)
			)}
		</div>
	);
};

export default MetaSection;
