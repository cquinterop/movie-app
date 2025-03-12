import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { MovieData } from '@/types/movie';

type CastSectionProps = Pick<MovieData['movie'], 'directors' | 'mainActors' | 'writers'>;

const CastSection = ({ directors, writers, mainActors }: Readonly<CastSectionProps>) => {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			<div>
				<h2 className="text-xl font-semibold">Directors</h2>
				<div className="mt-2 space-y-2">
					{directors.map((director) => (
						<div
							className="flex items-center gap-3"
							key={director}
						>
							<Avatar key={director}>
								<AvatarImage src={`https://i.pravatar.cc/150?u=${director}`} />
							</Avatar>
							<span>{director}</span>
						</div>
					))}
				</div>
			</div>
			<div>
				<h2 className="text-xl font-semibold">Writers</h2>
				<div className="mt-2 space-y-2">
					{writers.map((writer) => (
						<div
							className="flex items-center gap-3"
							key={writer}
						>
							<Avatar key={writer}>
								<AvatarImage src={`https://i.pravatar.cc/150?u=${writer}`} />
							</Avatar>
							<span>{writer}</span>
						</div>
					))}
				</div>
			</div>
			<div>
				<h2 className="text-xl font-semibold">Main Actors</h2>
				<div className="mt-2 space-y-2">
					{mainActors.map((actor) => (
						<div
							className="flex items-center gap-3"
							key={actor}
						>
							<Avatar key={actor}>
								<AvatarImage src={`https://i.pravatar.cc/150?u=${actor}`} />
							</Avatar>
							<span>{actor}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CastSection;
