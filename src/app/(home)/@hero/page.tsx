import MainHeading from '@/app/(home)/@hero/main-heading';
import SearchInput from '@/app/(home)/@hero/search-input';
import GenreFilter from '@/app/(home)/@hero/genre-filter';
import MovieModal from '@/app/(home)/@hero/movie-modal';

const HeroSection = () => {
	return (
		<header
			className="flex flex-col justify-center py-16"
			data-testid="hero-section"
		>
			<MainHeading />
			<SearchInput />
			<GenreFilter />
			<MovieModal />
		</header>
	);
};

export default HeroSection;
