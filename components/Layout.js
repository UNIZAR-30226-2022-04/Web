import Image from "next/image";
import Link from "next/link";
import Router from "next/router";

export default function Layout({
	children,
	data,
	inSettingsScreen,
	inGame,
	noInfo,
}) {
	return (
		<div className="background">
			<div className="flex bg-teal-600 bg-opacity-60 shadow-lg items-center p-3">
				<Link href={"/profile"}>
					<div className="clickableItem ml-5">
						<Image
							src="/frankenstory.png"
							width="237"
							height="55"
						/>
					</div>
				</Link>
				{!noInfo && (
					<Crates
						person={data}
						changeSettings={inSettingsScreen}
						playing={inGame}
					/>
				)}
			</div>
			<div className="flex flex-row w-full h-full justify-between">
				{children}
			</div>
		</div>
	);
}

function Crates({ person, changeSettings, playing }) {
	const imageRoute = "/profPic/icon" + person.image_ID + ".png";
	return (
		<div className="flex flex-row justify-end pr-5 pl-5 space-x-3 w-full items-center">
			<Crate image="/icons/star.png" text={person.stars} />
			<Crate image="/icons/mooncoin.png" text={person.coins} />
			<Crate image={imageRoute} text={person.username} />

			{!playing &&
				(changeSettings ? (
					<div className="">
						<Link href="/profile">
							<a>
								{" "}
								<Image
									className=""
									src="/icons/home.png"
									width="38"
									height="38"
								/>{" "}
							</a>
						</Link>
					</div>
				) : (
					<div className="">
						<Link href="/profile/settings">
							<a>
								{" "}
								<Image
									src="/icons/settings.png"
									width="38"
									height="38"
								/>{" "}
							</a>
						</Link>
					</div>
				))}

			<div className="clickableItem">
				<Image
					className=""
					src="/icons/logout.png"
					width="38"
					height="38"
					onClick={() => {
						localStorage.setItem("logged", "No");
						Router.push("/login");
					}}
				/>
			</div>
		</div>
	);
}

function Crate({ image, text }) {
	return (
		<div className="relative flex flex-row shadow-lg items-center rounded-lg h-10 xl:w-56 w-40 pl-3 bg-gradient-to-r from-teal-600 to-green-400">
			<Image src={image} width="30" height="30" />
			<p className="absolute right-3 text-white text-xl text-center font-bold">
				{text}
			</p>
		</div>
	);
}
