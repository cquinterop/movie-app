import MovieDetails from '@/app/movie/[id]/(movie-detail)';

type MovieDetailPageProps = {
	params: Promise<{ id: string }>;
};

const MovieDetailPage = async ({ params }: Readonly<MovieDetailPageProps>) => {
	const { id } = await params;

	return <MovieDetails id={id} />;
};

export default MovieDetailPage;
