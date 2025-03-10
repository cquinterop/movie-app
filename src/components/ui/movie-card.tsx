import { type BaseSyntheticEvent } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const POSTER_FALLBACK = '/images/no_poster.png';
const handleImageError = (event: { target: HTMLImageElement }) => {
	event.target.srcset = POSTER_FALLBACK;
};

interface MovieCardProps {
	title: string;
	posterUrl: string;
}

const MovieCard = ({ title, posterUrl }: Readonly<MovieCardProps>) => {
	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<Image
					alt="Movie poster"
					height={500}
					loading="lazy"
					src={posterUrl || POSTER_FALLBACK}
					width={500}
					onError={(event) => handleImageError(event as BaseSyntheticEvent)}
				/>
			</CardContent>
		</Card>
	);
};

export default MovieCard;
