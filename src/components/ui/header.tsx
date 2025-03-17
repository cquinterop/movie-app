import Link from 'next/link';
import ModeToggle from '@/components/ui/mode-toggle';
import Image from 'next/image';

const Header = () => {
	return (
		<header className="bg-background">
			<div className="flex h-16 items-center justify-between px-24">
				<nav className="hidden items-center space-x-6 md:flex">
					<Link
						className="flex items-center gap-2 text-lg font-semibold"
						href="/"
					>
						<Image
							priority
							alt="Movie Browser Logo"
							className="-mt-3 block dark:hidden"
							height={32}
							src="/images/logo.svg"
							width={160}
						/>
						<Image
							priority
							alt="Movie Browser Logo"
							className="-mt-3 hidden dark:block"
							height={32}
							src="/images/logo-dark.svg"
							width={160}
						/>
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
