import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import Layout from "components/Layout";
import Rulette from "components/Rulette";
import separateStories from "lib/separateStories";
import Spinner from "components/Spinner";
import Meta from "components/Meta";

export default function SavedTales() {
	const router = useRouter();
	const [myStories, setMyStories] = useState("");
	const [windowUser, setWindowUser] = useState({});

	// Recoge los datos guardados
	useEffect(() => {
		if (localStorage.getItem("logged") == "si") {
			const username = localStorage.getItem("username");
			const password = localStorage.getItem("password");
			const picture = localStorage.getItem("picture");
			const coins = localStorage.getItem("coins");
			const stars = localStorage.getItem("stars");

			setWindowUser({
				username: username,
				password: password,
				picture: picture,
				coins: coins,
				stars: stars,
			});
		} else {
			router.push("/login");
		}
	}, [router]);

	// Hace fetch de la api
	useEffect(() => {
		// Función que llama a la api
		if (windowUser.username == undefined) {
			console.log("no permito sacar datos");
			return;
		}

		const getData = async () => {
			// Opciones para llamar a la api
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(windowUser),
			};

			// Llamada a la api
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/api/general/get_stories`,
				options
			);
			const data = await res.json();

			// Si no ha ido bien o no estoy logeado volvemos a /
			if (data.result === "error") {
				localStorage.setItem("logged", "no");
				router.push("/login");
				return;
			}

			// Llama al hook que almacena la información del usuario
			setMyStories(data);
		};
		getData();
	}, [windowUser, router]);

	// Si tadavía no hoy usuario, esperamos a que lo haya
	if (!myStories) {
		return <Spinner showLayout={true} />;
	}

	// Renderizamos la página
	const layoutInfo = {
		username: windowUser.username,
		stars: windowUser.stars,
		coins: windowUser.coins,
		image_ID: windowUser.picture,
	};

	const stories = separateStories(myStories);

	return (
		<Layout data={layoutInfo}>
			<TalesList
				quicks={stories.quick_stories}
				tales={stories.tale_stories}
			/>
			<Rulette page="yourStories" />
		</Layout>
	);
}

function TalesList({ quicks, tales }) {
	return (
		<div className="ml-24 flex flex-row items-center space-x-16 mb-40">
			<Meta title="Biblioteca" />
			<div className="flex flex-col space-y-3 items-center justify-center align-middle">
				<h1 className="commonTitle">Partidas Rápidas</h1>
				<div className="bg-scroll bg-contain overflow-auto">
					<div className="h-[500px]">
						<div className="flex flex-col items-center space-y-3 w-auto">
							{quicks.map((game) => (
								<QuickStory key={game.id} info={game} />
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col space-y-3 items-center justify-center align-middle">
				<h1 className="commonTitle">Relatos</h1>
				<div className="bg-scroll bg-contain overflow-auto">
					<div className="h-[500px]">
						<div className="flex flex-col space-y-3 justify-start items-center">
							{tales.map((game) => (
								<TaleStory key={game.id} info={game} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function QuickStory({ info }) {
	return (
		<div className="flex flex-col">
			<Link
				href={`/profile/see_tale?id=${info.id}&type=quick&title=${info.title}`}
			>
				<a>
					<div className="flex flex-row justify-between w-80 items-center text-left space-y-1">
						<div className="flex flex-col">
							<div className="font-bold font-arial-b text-verde_punetas">
								Historia{" "}
								{info.type === "quick_twitter"
									? "Twitter"
									: "Aleatoria"}
							</div>
							<div className="flex flex-row space-x-2 font-arial-r text-xs">
								<div className="font-bold text-verde_punetas">
									Fecha:
								</div>
								<div className="text-verde_plus_minus_back">
									{info.date}
								</div>
							</div>
						</div>
						{info.type === "quick_twitter" ? (
							<Image
								src="/quick-game/tendencias_twitter.png"
								width="40"
								height="40"
								alt="Trends"
							/>
						) : (
							<Image
								src="/quick-game/random_words.png"
								width="40"
								height="40"
								alt="Random"
							/>
						)}
					</div>
					<div className="w-full h-1 bg-verde_top rounded-full bg-opacity-60" />
				</a>
			</Link>
		</div>
	);
}

function TaleStory({ info }) {
	return (
		<div className="flex flex-col">
			<Link
				href={`/profile/see_tale?id=${info.id}&type=tale&title=${info.title}`}
			>
				<a>
					<div className="flex flex-row justify-between w-80 items-center text-left space-y-1">
						<div className="flex flex-col">
							<div className="font-bold font-arial-b text-verde_punetas">
								{info.title}
							</div>
							<div className="flex flex-row space-x-2 font-arial-r text-xs">
								<div className="font-bold text-verde_punetas">
									Fecha:
								</div>
								<div className="text-verde_plus_minus_back">
									{info.date}
								</div>
							</div>
						</div>
						<div className="clickableItem">
							<Image
								src="/icons/read.png"
								width="40"
								height="40"
								alt="Leer"
							/>
						</div>
					</div>
					<div className="w-full h-1 bg-verde_top rounded-full bg-opacity-60" />
				</a>
			</Link>
		</div>
	);
}
