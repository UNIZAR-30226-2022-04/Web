import Image from "next/image";
import Link from "next/link";

export default function Rulette({ page }) {
	return (
		<div className="relative h-full mt-3 -mr-1">
			<img
				className="h-full w-full relative -mr-24 hover:accent-white"
				src="/rulette/rulette2.png"
				alt="xd"
			/>
			<div className="absolute flex flex-col items-end pr-8 space-y-8 right-10 top-24 2xl:top-32">
				<RuletteButton
					page={page}
					thisPage="story"
					icon="/animated/books.gif"
					reference="/storyMode"
				/>
				<RuletteButton
					page={page}
					thisPage="quickGame"
					icon="/animated/clock.gif"
					reference="/quickGame"
				/>
				<RuletteButton
					page={page}
					thisPage="yourStories"
					icon="/icons/read.png"
					reference="/profile/saved_tales"
				/>
				<RuletteButton
					page={page}
					thisPage="friends"
					icon="/rulette/friends.png"
					reference="/profile/friends"
				/>
			</div>
		</div>
	);
}

function RuletteButton({ page, thisPage, icon, reference }) {
	return (
		<>
			{page == thisPage ? (
				<Link href="/profile">
					<div className="flex flex-row  items-center space-x-3 scale-100 hover:scale-110">
						<p className="2xl:text-3xl text-2xl font-bangers text-slate-800 hover:cursor-pointer">
							Volver{" "}
						</p>
						<div className="clickableItem flex  h-28 w-28 items-center justify-center bg-slate-800 bg-opacity-10 rounded-3xl">
							<a>
								<Image
									src="/icons/home.png"
									width="60"
									height="60"
								/>
							</a>
						</div>
					</div>
				</Link>
			) : (
				<Link href={reference}>
					<div className="flex flex-row  items-center space-x-3 scale-100 hover:scale-110">
						<p className="2xl:text-3xl text-2xl font-bangers text-slate-800 hover:cursor-pointer">
							{getTextReference(reference)}{" "}
						</p>
						<div className="clickableItem flex h-28 w-28 items-center justify-center bg-slate-800 bg-opacity-10 rounded-3xl">
							<a>
								<Image src={icon} width="60" height="60" />{" "}
							</a>
						</div>
					</div>
				</Link>
			)}
		</>
	);
}

function getTextReference(reference) {
	switch (reference) {
		case "/storyMode":
			return "Modo Relato";

		case "/quickGame":
			return "Partida Rápida";

		case "/profile/saved_tales":
			return "Biblioteca";

		case "/profile/friends":
			return "Amigos";
	}
}
