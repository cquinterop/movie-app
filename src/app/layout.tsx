import { type ReactNode } from 'react';
import type { Metadata } from 'next';
import ProviderTree from '@/providers';
import AppShell from '@/components/ui/app-shell';
import ReactScan from '@/components/utils/react-scan';
import './globals.css';

interface RootLayoutProps {
	children: ReactNode;
}

export const metadata: Metadata = {
	title: 'Movie Browser',
	description: 'Find your next favorite movie.',
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
	return (
		<html
			suppressHydrationWarning
			lang="en"
		>
			{process.env.NODE_ENV !== 'production' && <ReactScan />}
			<body>
				<ProviderTree>
					<AppShell>{children}</AppShell>
				</ProviderTree>
			</body>
		</html>
	);
}
