import { type ReactNode } from 'react';
import Head from 'next/head';
import ProviderTree from '@/providers';
import AppShell from '@/components/ui/app-shell';
import ReactScan from '@/components/utils/react-scan';
import './globals.css';

interface RootLayoutProps {
	children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
	return (
		<html
			suppressHydrationWarning
			lang="en"
		>
			<ReactScan />
			<Head>
				<title>Movie Seeker</title>
				<link
					href="/apple-touch-icon.png"
					rel="apple-touch-icon"
					sizes="180x180"
				/>
				<link
					href="/favicon-32x32.png"
					rel="icon"
					sizes="32x32"
					type="image/png"
				/>
				<link
					href="/favicon-16x16.png"
					rel="icon"
					sizes="16x16"
					type="image/png"
				/>
			</Head>
			<body>
				<ProviderTree>
					<AppShell>{children}</AppShell>
				</ProviderTree>
			</body>
		</html>
	);
}
