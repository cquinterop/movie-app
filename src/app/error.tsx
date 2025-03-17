'use client';

import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface ErrorProps {
	error?: Error | string;
	reset: () => void;
}

const ErrorBoundary = ({ reset }: ErrorProps) => {
	const router = useRouter();

	return (
		<div className="flex h-[50vh] flex-col items-center justify-center gap-6">
			<div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
				<AlertTriangle className="h-10 w-10 text-red-500 dark:text-red-300" />
			</div>
			<div className="space-y-2 text-center">
				<h2 className="text-2xl font-bold tracking-tight">Something went wrong!</h2>
				<p className="text-gray-500 dark:text-gray-400">Please try again later or go back to the previous page.</p>
				<div className="mt-4 flex justify-center gap-4">
					<Button onClick={() => reset()}>Try Again</Button>
					<Button
						variant="outline"
						onClick={() => router.back()}
					>
						Go Back
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ErrorBoundary;
