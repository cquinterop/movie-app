import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MovieData } from '@/types/movie';

type CastSectionProps = Pick<MovieData['movie'], 'directors' | 'mainActors' | 'writers'>;

const CastSection = ({ directors, writers, mainActors }: Readonly<CastSectionProps>) => {
	const cast = [
		{ type: 'Directors', names: directors },
		{ type: 'Writers', names: writers },
		{ type: 'Main Actors', names: mainActors },
	];

	return (
		<div
			className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
			data-testid="cast-section"
		>
			{cast.map(
				({ names, type }) =>
					!!names.length && (
						<div key={type}>
							<h2 className="text-xl font-semibold">{type}</h2>
							<div className="mt-2 space-y-2">
								{names.map((name) => (
									<div
										className="flex items-center gap-3"
										key={name}
									>
										<Avatar
											data-testid="avatar"
											key={name}
										>
											<AvatarFallback>{name?.match(/\b\w/g)?.join('').slice(0, 2) ?? ''}</AvatarFallback>
										</Avatar>
										<span>{name}</span>
									</div>
								))}
							</div>
						</div>
					)
			)}
		</div>
	);
};

export default CastSection;
