import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "components/Layout";
import Rulette from "components/Rulette";
import Spinner from "components/Spinner";
import Meta from "components/Meta";

import Image from "next/image";

export default function StoryMode() {
	const router = useRouter();

	const [windowUser, setWindowUser] = useState({});
	const [code, setCode] = useState("");
	const [errorJ, setErrorJ] = useState("");
	const [errorR, setErrorR] = useState("");

	const [privateGame, setprivateGame] = useState(false);
	const [gameMode, setGameMode] = useState("random");
	const [time, setTime] = useState(30);

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
			router.push("/");
		}
	}, []);

	// Si tadavía no hoy usuario, esperamos a que lo haya
	if (!windowUser) {
		return <Spinner showLayout={true} />;
	}

	// Renderizamos la página
	const layoutInfo = {
		username: windowUser.username,
		stars: windowUser.stars,
		coins: windowUser.coins,
		image_ID: windowUser.picture,
	};

	const changeTime = (change) => {
		if (5 <= time + change && 120 >= time + change) {
			setTime(time + change);
		}
	};

	return (
		<Layout data={layoutInfo}>
			<Meta title="Partida rápida" />
			<div className="h-full w-2/4 flex flex-row justify-center items-center space-x-40 ml-44">
				<div className="flex flex-col items-center space-y-6 rounded-xl bg-white-300 p-8">
					<div className="flex flex-col items-center space-y-4 rounded-xl bg-white-300 p-8">
						<h1 className="commonTitle mb-4">Introducir código</h1>
						<input
							type="text"
							placeholder="Código #XXXX"
							value={code}
							onChange={(e) => setCode(e.target.value)}
							className="border-2 border-verde_letras  rounded-lg p-2"
						/>

						<button
							type="button"
							onClick={() =>
								join(
									windowUser,
									code,
									setErrorR,
									setErrorJ,
									router
								) &&
								errorJ != "" &&
								alert("La sala introducida no existe.")
							}
							className="commonButton w-full bg-verde_top hover:bg-emerald-600"
						>
							Unirse a sala
						</button>
					</div>
					<button
						type="button"
						onClick={() =>
							random(windowUser, setErrorJ, setErrorR, router) &&
							errorR != "" &&
							alert("No hay salas disponibles.")
						}
						className="commonButton w-full bg-violet-400 hover:bg-violet-600"
					>
						Partida aleatoria
					</button>
				</div>

				<div className="flex flex-col items-center space-y-8">
					<h1 className="commonTitle">Crear sala</h1>
					<div className="flex flex-col items-center space-y-2">
						<p className="commonSubtitle">Tiempo de escritura</p>
						<div className="flex flex-col">
							<div className="flex flex-row items-center justify-center space-x-4">
								<img
									src="/quick-game/clock.png"
									className="h-8 w-8"
								/>
								<div className="commonSubtitle">
									{parseInt(time / 60)}min:{time % 60}seg
								</div>
								<button
									className="addReduceButton"
									onClick={() => changeTime(-5)}
								>
									-
								</button>
								<button
									className="addReduceButton "
									onClick={() => changeTime(+5)}
								>
									+
								</button>
							</div>
						</div>
					</div>

					<div className="flex flex-col items-center space-y-2">
						<p className="commonSubtitle">Tipo de partida</p>
						<div className="flex flex-row justify-center items-center space-x-0 h-full w-full text-white">
							<input
								className={`px-8 py-2 font-bold hover:cursor-pointer ${
									!privateGame
										? "bg-verde_letras"
										: "bg-verde_publico_seleccionado"
								}`}
								type="button"
								value="PÚBLICA"
								onClick={() => setprivateGame(false)}
							/>
							<input
								className={`ml-2 px-8 py-2 font-bold hover:cursor-pointer ${
									privateGame
										? "bg-verde_letras"
										: "bg-verde_publico_seleccionado"
								}`}
								type="button"
								value="PRIVADA"
								onClick={() => setprivateGame(true)}
							/>
						</div>
					</div>

					<div className="flex flex-col items-center space-y-2">
						<p className="commonSubtitle">Modo de juego</p>
						<div className="flex flex-row justify-center items-center space-x-6 h-full w-full">
							<button
								className={`commonButton rounded-xl text-white hover:cursor-pointer w-36 ${
									gameMode == "random"
										? "bg-yellow-600  border-2 border-white"
										: "bg-amber-400"
								}`}
								onClick={() => setGameMode("random")}
							>
								<img
									src="/quick-game/random_words.png"
									className="relative h-20 w-20 ml-4"
								/>
								<p>PALABRAS</p>
								<p>OBLIGATORIAS</p>
							</button>

							<button
								className={`commonButton rounded-xl text-white hover:cursor-pointer w-36 ${
									gameMode == "twitter"
										? "bg-sky-600  border-2 border-white"
										: "bg-sky-500"
								}`}
								onClick={() => setGameMode("twitter")}
							>
								<img
									src="/quick-game/tendencias_twitter.png"
									className="relative h-20 w-20 ml-4"
								/>
								<p>TENDENCIAS</p>
								<p>TWITTER</p>
							</button>
						</div>
					</div>

					<button
						type="button"
						onClick={() =>
							create(
								windowUser,
								time,
								privateGame,
								gameMode,
								setErrorR,
								setErrorJ,
								router
							)
						}
						className="commonButton bg-verde_top hover:bg-emerald-600"
					>
						Crear sala
					</button>
				</div>
			</div>
			<Rulette page="quickGame" />
		</Layout>
	);
}

async function create(
	windowUser,
	time,
	isPrivate,
	gameMode,
	setErrorR,
	setErrorJ,
	router
) {
	setErrorR("");
	const res = await tryCreate(windowUser, time, isPrivate, gameMode);

	if (res.result != "success") {
		setErrorJ(res.reason);
	} else {
		router.push(`quickGame/lobby?code=${res.id.slice(1)}`);
	}
}

async function join(windowUser, code, setErrorR, setErrorJ, router) {
	setErrorR("");
	var urlCode = code;
	if (urlCode[0] === "#") {
		urlCode = urlCode.slice(1);
	}
	const res = await tryJoin(windowUser, urlCode);

	if (res.reason == "player_in_game") {
		alert("Pog");
		//LINEA ANTIGUA
		//		router.push(`quickGame/lobby?code=${code}`);
		router.push(`quickGame/lobby?code=${res.id.slice(1)}`);
		return;
	}

	if (res.result != "success") {
		setErrorJ(res.reason);
	} else {
		router.push(`quickGame/lobby?code=${urlCode}`);
	}
}

async function random(windowUser, setErrorJ, setErrorR, router) {
	setErrorJ("");

	const res = await tryRandom(windowUser);

	if (res.reason == "player_in_game") {
		router.push(`quickGame/lobby?code=${res.id.slice(1)}`);
		return;
	}

	if (res.result != "success") {
		setErrorR(res.reason);
	} else {
		router.push(`quickGame/lobby?code=${res.id.slice(1)}`);
	}
}

async function tryCreate(windowUser, time, isPrivate, gameMode) {
	const info = {
		username: windowUser.username,
		password: windowUser.password,
		time: time,
		isPrivate: isPrivate,
		mode: gameMode,
	};

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(info),
	};

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_URL}/api/quick_game/create_room`,
		options
	);
	const data = await res.json();
	return data;
}

async function tryJoin(windowUser, code) {
	const info = {
		username: windowUser.username,
		password: windowUser.password,
		id: "#" + code,
	};
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(info),
	};

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_URL}/api/quick_game/join_room`,
		options
	);
	const data = await res.json();
	return data;
}

async function tryRandom(windowUser) {
	const body = {
		username: windowUser.username,
		password: windowUser.password,
	};

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	};
	const data = await fetch(
		`${process.env.NEXT_PUBLIC_URL}/api/quick_game/join_random_room`,
		options
	);
	return await data.json();
}
