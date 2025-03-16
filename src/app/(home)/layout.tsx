import { ReactNode } from 'react';

interface HomeLayoutProps {
	hero: ReactNode;
	movies: ReactNode;
}

const HomeLayout = ({ hero, movies }: Readonly<HomeLayoutProps>) => {
	return (
		<>
			{hero}
			{movies}
		</>
	);
};

export default HomeLayout;
