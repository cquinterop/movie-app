import { Clapperboard } from 'lucide-react';
const Spinner = () => {
	return (
		<div className="flex h-150 w-full items-center justify-center">
			<Clapperboard className="size-24 animate-bounce" />
		</div>
	);
};

export default Spinner;
