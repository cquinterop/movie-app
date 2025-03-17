import MovieDetailsPage from '@/app/movie/[id]/(movie-detail)';

type MovieDetailPageProps = {
	params: Promise<{ id: string }>;
};

const MovieDetailPage = async ({ params }: Readonly<MovieDetailPageProps>) => {
	const { id } = await params;

	return <MovieDetailsPage id={id} />;
};

export default MovieDetailPage;
