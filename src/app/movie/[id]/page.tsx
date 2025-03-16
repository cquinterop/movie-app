import MovieDetailsPage from '@/app/movie/[id]/(movie-detail)';

type MovieDetailPageProps = {
	params: { id: string };
};

const MovieDetailPage = ({ params }: Readonly<MovieDetailPageProps>) => {
	const { id } = params;

	return <MovieDetailsPage id={id} />;
};

export default MovieDetailPage;
