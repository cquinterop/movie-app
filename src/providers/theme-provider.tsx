import { type ReactNode } from 'react';
import { ThemeProvider as NextThemes } from 'next-themes';

interface ThemeProviderProps {
	children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
	return (
		<NextThemes
			enableSystem
			attribute="class"
			defaultTheme="system"
			themes={['light', 'dark']}
		>
			{children}
		</NextThemes>
	);
};

export default ThemeProvider;
