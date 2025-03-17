import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import PosterImage from '@/components/ui/poster-image';
import { memo } from 'react';

interface MovieCardProps {
	title: string;
	posterUrl: string;
	ratingValue: string;
	datePublished: string;
}

const MovieCard = ({ title, posterUrl, datePublished, ratingValue }: Readonly<MovieCardProps>) => {
	return (
		<Card
			className="relative mx-auto flex h-[525px] w-[350px] flex-col justify-end overflow-hidden rounded-2xl border-none hover:scale-105 hover:shadow-xl"
			data-testid="movie-card"
		>
			<CardContent>
				<PosterImage
					alt={`Movie poster for ${title}`}
					className="absolute inset-0 h-full w-full object-cover brightness-70 hover:brightness-80"
					data-testid="movie-image"
					height={525}
					loading="lazy"
					src={posterUrl}
					width={350}
				/>
			</CardContent>
			<CardHeader>
				<CardTitle
					className="z-10 mt-3 text-2xl font-bold text-white"
					data-testid="movie-title"
				>
					{title}
				</CardTitle>
			</CardHeader>
			<CardFooter className="z-10 flex justify-between text-white">
				<p data-testid="movie-date">
					<span className="sr-only">Release date:</span> {datePublished}
				</p>
				<p data-testid="movie-rating">
					<span className="sr-only">Rating:</span> {ratingValue}/10
				</p>
			</CardFooter>
		</Card>
	);
};

export default memo(MovieCard);
