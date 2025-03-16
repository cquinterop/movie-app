import Link from 'next/link';
import { Film } from 'lucide-react';
import ModeToggle from '@/components/app-shell/header/mode-toggle';

const Header = () => {
	return (
		<header className="bg-background border-b shadow-sm">
			<div className="flex h-16 items-center justify-between px-24">
				<nav className="hidden items-center space-x-6 md:flex">
					<Link
						className="flex items-center gap-2 text-lg font-semibold"
						href="/"
					>
						<Film className="text-primary h-6 w-6" />
						<span>Movies</span>
					</Link>
					<Link
						className="hover:text-primary text-sm font-medium transition-colors"
						href="/"
					>
						Home
					</Link>
				</nav>
				<div className="flex items-center space-x-4">
					<ModeToggle />
				</div>
			</div>
		</header>
	);
};

export default Header;
