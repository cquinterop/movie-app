import MainHeading from '@/app/(home)/(hero-section)/main-heading';
import SearchInput from '@/app/(home)/(hero-section)/search-input';

const HeroSection = () => {
	return (
		<header className="flex flex-col justify-center py-32">
			<MainHeading />
			<SearchInput />
		</header>
	);
};

export default HeroSection;
