import { type ReactNode } from 'react';
import DataProvider from '@/providers/data-provider';
import ThemeProvider from '@/providers//theme-provider';

interface ProviderTreeProps {
	children: ReactNode;
}

const ProviderTree = ({ children }: ProviderTreeProps) => {
	return (
		<DataProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</DataProvider>
	);
};

export default ProviderTree;
