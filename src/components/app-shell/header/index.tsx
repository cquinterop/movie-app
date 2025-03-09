import Link from 'next/link';
import { Film } from 'lucide-react';
import ModeToggle from '@/components/app-shell/header/mode-toggle';

const Header = () => {
	return (
		<header>
			<div className="container flex h-14 items-center">
				<Link
					className="mr-4 flex items-center gap-2 font-semibold"
					href="/"
				>
					<Film className="h-5 w-5" />
					<span>Movies</span>
				</Link>

				<nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
					<Link
						className="hover:text-primary'text-foreground text-sm font-medium transition-colors"
						href="/"
					>
						Home
					</Link>
				</nav>

				<ModeToggle />
			</div>
		</header>
	);
};

export default Header;
