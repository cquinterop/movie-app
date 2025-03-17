import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { MovieData } from '@/types/movie';
import { memo } from 'react';

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
											<AvatarImage
												data-testid="avatar-image"
												src={`https://avatar.iran.liara.run/username?username=${name}`}
											/>
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

export default memo(CastSection);
