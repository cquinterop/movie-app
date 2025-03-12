import MainHeading from '@/app/(home)/(hero-section)/main-heading';
import SearchInput from '@/app/(home)/(hero-section)/search-input';
import GenreFilter from '@/app/(home)/(hero-section)/genre-filter';

const HeroSection = () => {
	return (
		<header className="flex flex-col justify-center py-32">
			<MainHeading />
			<SearchInput />
			<GenreFilter />
		</header>
	);
};

export default HeroSection;
