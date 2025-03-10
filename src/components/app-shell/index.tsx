import { type ReactNode } from 'react';
import Header from './header';
import Footer from './footer';

interface AppShellProps {
	children: ReactNode;
}
const AppShell = ({ children }: Readonly<AppShellProps>) => {
	return (
		<>
			<Header />
			<main className="m-h-screen container mx-auto my-12">{children}</main>
			<Footer />
		</>
	);
};

export default AppShell;
