import Image from 'next/image';
import { BaseSyntheticEvent, ImgHTMLAttributes } from 'react';
import { handleImageError } from '@/utils/movies';
import { POSTER_FALLBACK } from '@/constants/movies';

type CustomProps = {
	src: string;
	width: number;
	height: number;
	fallbackSrc?: string;
};

const PosterImage = ({ src, width, height, fallbackSrc = POSTER_FALLBACK, ...props }: CustomProps & ImgHTMLAttributes<HTMLImageElement>) => {
	return (
		<Image
			alt="Movie poster"
			height={height}
			src={src}
			width={width}
			onError={(event) => handleImageError(event as BaseSyntheticEvent, fallbackSrc)}
			{...props}
		/>
	);
};

export default PosterImage;
