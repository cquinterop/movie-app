import { type BaseSyntheticEvent } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { POSTER_FALLBACK } from '@/constants/movies';
import Image from 'next/image';
import { handleImageError } from '@/utils/movies';

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
					src={posterUrl}
					width={500}
					onError={(event) => handleImageError(event as BaseSyntheticEvent, POSTER_FALLBACK)}
				/>
			</CardContent>
		</Card>
	);
};

export default MovieCard;
