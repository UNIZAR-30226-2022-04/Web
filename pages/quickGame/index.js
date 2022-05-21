import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "components/Layout";
import Rulette from "components/Rulette";
import Spinner from "components/Spinner";

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
			router.push("/login");
		}
	}, []);

	// Si tadavía no hoy usuario, esperamos a que lo haya
	if (!windowUser) {
		return <Spinner />;
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
			<div className="h-full w-2/4 flex flex-row justify-center items-center space-x-20 ml-32">
				<div className="flex flex-col items-center space-y-4">
					<input
						type="text"
						placeholder="Código #XXXX"
						value={code}
						onChange={(e) => setCode(e.target.value)}
						className="border-2 border-verde_letras rounded p-1"
					/>
					{errorJ != "" ? (
						<div className="centered text-red-700">{errorJ}</div>
					) : (
						<></>
					)}
					<button
						type="button"
						onClick={() =>
							join(windowUser, code, setErrorR, setErrorJ, router)
						}
						className="commonButton w-full bg-verde_letras"
					>
						Unirse a sala
					</button>
					<button
						type="button"
						onClick={() =>
							random(windowUser, setErrorJ, setErrorR, router)
						}
						className="commonButton w-full bg-verde_letras"
					>
						Partida aleatoria
					</button>
					{errorR != "" ? (
						<div className="centered text-red-700">{errorR}</div>
					) : (
						<></>
					)}
				</div>

				<div className="flex flex-col space-y-2">
					<p className="commonTitle">Tiempo de escritura</p>
					<div className="flex flex-col">
						<div className="flex flex-row text-2xl text-white">
							<Image src="/quick-game/clock.png"height={30} width={50}/>
							<div className="w-48 commonTitle ml-4">
								{parseInt(time / 60)}min:{time % 60}seg
							</div>
							<button className="addReduceButton text-2xl font-bold mr-4"type="button" onClick={() => changeTime(-5)}>
								-
							</button>
							<button className="addReduceButton text-xl font-bold"type="button" onClick={() => changeTime(+5)}>
								+
							</button>
						</div>
					</div>

					<p className="commonTitle">Tipo de partida</p>
					<div className="flex flex-row text-white">
						<input
							className={`px-8 py-2 font-bold ${
								!privateGame ? "bg-verde_letras" : "bg-verde_publico_seleccionado"
							}`}
							type="button"
							value="PÚBLICA"
							onClick={() => setprivateGame(false)}
						/>
						<input
							className={`ml-2 px-8 py-2 font-bold ${
								privateGame ? "bg-verde_letras" : "bg-verde_publico_seleccionado"
							}`}
							type="button"
							value="PRIVADA"
							onClick={() => setprivateGame(true)}
						/>
					</div>

					<div className="commonTitle">Modo de juego</div>
					<div className="flex flex-row">
						<input
							className={`py-2 px-8 rounded-xl text-white font-bold ${
								gameMode == "random"
									? "bg-yellow-400  border-4 border-white"
									: "bg-yellow-600"
							}`}
							type="button"
							value="ALEATORIAS"
							onClick={() => setGameMode("random")}
						/>
						<> </>
						<input
							className={`ml-4 py-2 px-8 rounded-xl text-white font-bold ${
								gameMode == "twitter"
									? "bg-blue-400  border-4 border-white"
									: "bg-blue-600"
							}`}
							type="button"
							value="TWITTER"
							onClick={() => setGameMode("twitter")}
						/>
						<> </>
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
						className="commonButton bg-verde_letras"
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
	const res = await tryJoin(windowUser, code);

	if (res.reason == "player_in_game") {
		router.push(`quickGame/lobby?code=${code}`);
		return;
	}

	if (res.result != "success") {
		setErrorJ(res.reason);
	} else {
		router.push(`quickGame/lobby?code=${code}`);
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
	if(code[0] === "#"){
		info.id=code
	}
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
