import type React from 'react';
import Header from './header';
import Footer from './footer';

interface AppShellProps {
	children: React.ReactNode;
}
const AppShell = ({ children }: Readonly<AppShellProps>) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default AppShell;
