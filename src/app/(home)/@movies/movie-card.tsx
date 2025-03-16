import { useState, type BaseSyntheticEvent } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { POSTER_FALLBACK } from '@/constants/movies';
import Image from 'next/image';
import { handleImageError } from '@/utils/movies';
import { Heart } from 'lucide-react';

interface MovieCardProps {
	title: string;
	posterUrl: string;
	ratingValue: string;
	datePublished: string;
}

const MovieCard = ({ title, posterUrl, datePublished, ratingValue }: Readonly<MovieCardProps>) => {
	const [isFavorite, setIsFavorite] = useState(false);

	const toggleFavorite = () => {
		setIsFavorite(!isFavorite);
	};

	return (
		<Card className="relative mx-auto flex h-[525px] w-[350px] flex-col justify-end overflow-hidden rounded-2xl border-none hover:scale-105 hover:shadow-xl">
			<CardContent>
				<Image
					alt="Movie poster"
					className="absolute inset-0 h-full w-full object-cover brightness-70 hover:brightness-80"
					height={500}
					loading="lazy"
					src={posterUrl}
					width={500}
					onError={(event) => handleImageError(event as BaseSyntheticEvent, POSTER_FALLBACK)}
				/>
				<button
					className="absolute top-3 right-3 cursor-pointer rounded-full bg-white/70 p-2 transition-all hover:bg-white"
					onClick={toggleFavorite}
				>
					<Heart className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
				</button>
			</CardContent>
			<CardHeader>
				<CardTitle className="z-10 mt-3 text-2xl font-bold text-white">{title}</CardTitle>
			</CardHeader>
			<CardFooter className="z-10 flex justify-between text-white">
				<p>{datePublished}</p>
				<p>{ratingValue}/10</p>
			</CardFooter>
		</Card>
	);
};

export default MovieCard;
