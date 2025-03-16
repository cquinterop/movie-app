import { type ReactNode } from 'react';
import ProviderTree from '@/providers';
import AppShell from '@/components/app-shell';
import './globals.css';
import ReactScan from '@/components/utils/react-scan';

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
			<body>
				<ProviderTree>
					<AppShell>{children}</AppShell>
				</ProviderTree>
			</body>
		</html>
	);
}
