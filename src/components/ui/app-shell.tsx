import { type ReactNode } from 'react';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';

interface AppShellProps {
	children: ReactNode;
}
const AppShell = ({ children }: Readonly<AppShellProps>) => {
	return (
		<>
			<Header />
			<main className="mx-auto min-h-screen">{children}</main>
			<Footer />
		</>
	);
};

export default AppShell;
