import Link from "next/link";
import Image from "next/image";

export default function StoryList({ stories, isVoteStory}) {
	if (stories.length > 0) {
		return (
			<div className="flex flex-col space-y-2">
				{stories.map((story, index) => {
					return (
						<Story
							key={index}
							story={story}
							isVoteStory={isVoteStory}
						/>
					);
				})}
			</div>
		);
	}
	return <></>;
}

function Story({ story, isVoteStory }) {
	return (
		<div className="flex flex-col">
			<div className="flex flex-row justify-between w-42 items-center text-left space-y-1">
				<div className="flex flex-col">
					<div className="font-bold font-arial-b text-verde_punetas">
						{story.title}
					</div>
					<div className="flex flex-row space-x-2 text-xs">
						<div className="font-bold text-verde_punetas font-arial-b">
							Creada por:
						</div>
						<div className="text-verde_plus_minus_back font-arial-r">
							{story.creator}
						</div>
					</div>
				</div>

				<div className="relative flex flex-row items-center">
					{isVoteStory ? (<>
						{ story.meVoted	? (
							<>
								<div className="pr-2 text-verde_punetas text-xs font-arial_r">
									-/-
								</div>	
								<Image
									src="/quick-game/wait.png"
									width="20"
									height="20"
									alt="Votar"
								/>
							</>)
							:
							(
							<>
								<div className="pr-2 text-verde_punetas text-sm font-arial_r">
									{story.turn + 1}/{story.max_turns}
								</div>
								<Link
									href={`/storyMode/vote?id=${story.story_id}&creator=${story.creator}`}
								>
									<a>
										<Image
											src="/icons/voting-box.png"
											width="20"
											height="20"
											alt="Votar"
										/>
									</a>
								</Link>
							</>)
						}
						</>
					) : (
						<>
							<div className="pr-2 text-verde_punetas text-sm font-arial_r">
								{story.turn + 1}/{story.max_turns}
							</div>
							<Link
								href={`/storyMode/continue?id=${story.story_id}&creator=${story.creator}&maxTurns=${story.max_turns}`}
							>
								<a>
									<Image
										src="/icons/pencil.png"
										width="20"
										height="20"
										alt="Editar"
									/>
								</a>
							</Link>
						</>
					)}
				</div>
			</div>
			<div className="w-full h-1 bg-verde_top rounded-full bg-opacity-60" />
		</div>
	);
}
