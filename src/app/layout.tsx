import { type ReactNode } from 'react';
import ProviderTree from '@/providers';
import AppShell from '@/components/app-shell';
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
			<body>
				<ProviderTree>
					<AppShell>{children}</AppShell>
				</ProviderTree>
			</body>
		</html>
	);
}
