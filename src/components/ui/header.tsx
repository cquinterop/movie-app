import Link from 'next/link';
import ModeToggle from '@/components/ui/mode-toggle';
import Image from 'next/image';

const Header = () => {
	return (
		<header className="bg-background sticky top-0 z-20">
			<div className="container mx-auto flex h-14 items-center justify-between px-6">
				<nav className="flex items-center">
					<Link href="/">
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
						className="ml-4 hidden font-medium md:flex"
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
