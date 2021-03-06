import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Layout from "components/Layout";
import Spinner from "components/Spinner";
import ListOfPeople from "components/ListOfPeople";
import Meta from "components/Meta";

export default function QuickGame() {
	const router = useRouter();
	const [windowUser, setWindowUser] = useState({});
	const [code, setCode] = useState("");
	const [room, setRoom] = useState({
		result: "",
		mode: "",
		reason: "",
		participants: [],
		hasStarted: 0,
	});

	useEffect(() => {
		if (localStorage.getItem("logged") == "si") {
			const queryParams = new URLSearchParams(window.location.search);
			setCode(queryParams.get("code"));

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

	// Hace fetch de la api
	useEffect(() => {
		// Función que llama a la api
		if (!windowUser.username || !code) {
			return;
		}

		const getData = async () => {
			// Opciones para llamar a la api
			const ident = "#" + code.toString();

			const info = {
				username: windowUser.username,
				password: windowUser.password,
				id: ident,
			};

			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(info),
			};
			// Llamada a la api
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/api/quick_game/get_room`,
				options
			);
			const data = await res.json();

			// Si no ha ido bien o no estoy logeado volvemos a /
			if (data.result === "error") {
				console.log("Error first get room", data);
				await leaveRoom(windowUser, ident, router);
				return;
			}

			if (data.hasStarted == 1) {
				router.push(`/quickGame/write?id=${code}`);
			} else if (data.hasStarted == 2) {
				router.push(`/quickGame/vote?id=${code}`);
			}

			setRoom(data);
		};
		getData();
	}, [windowUser]);

	// Compruebo periódicamente que la partida no ha empezado
	useEffect(() => {
		if (!windowUser.username || !code) {
			return;
		}

		const getData = async () => {
			// Opciones para llamar a la api
			const ident = "#" + code.toString();

			const info = {
				username: windowUser.username,
				password: windowUser.password,
				id: ident,
			};

			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(info),
			};
			// Llamada a la api
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/api/quick_game/get_room`,
				options
			);
			const data = await res.json();

			// Si no ha ido bien o no estoy logeado volvemos a /
			if (data.result === "error") {
				console.log("Error check started", data);
				await leaveRoom(windowUser, ident, router);
				return;
			}

			if (data.hasStarted == 1) {
				router.push(`/quickGame/write?id=${code}`);
			} else if (data.hasStarted == 2) {
				router.push(`/quickGame/vote?id=${code}`);
			}

			setRoom(data);
		};

		const timer = setInterval(getData, 2000);
		return () => clearInterval(timer);
	}, [windowUser]);

	// Si tadavía no hoy usuario, esperamos a que lo haya
	if (!windowUser || room.result == "") {
		return <Spinner showLayout={true} />;
	}

	const disabled = room.participants.length > 1 ? "" : "yes";

	// Renderizamos la página
	const layoutInfo = {
		username: windowUser.username,
		stars: windowUser.stars,
		coins: windowUser.coins,
		image_ID: windowUser.picture,
	};

	return (
		<Layout data={layoutInfo} inGame={true}>
			<Meta title={"#" + code} />
			<div className="flex flex-col items-center justify-center w-screen space-y-5">
				<div className="commonTitle">Código de la Sala: #{code}</div>
				<div className="flex flex-row justify-center items-center space-x-20 ml-5">
					<ListOfPeople data={room.participants} showFaces={true} />
					<div className="flex flex-col justify-center items-center space-y-5">
						{room.mode == "random" ? (
							<div className="flex flex-col items-center justify-center commonButton rounded-xl text-white w-36 bg-amber-600 border-2 border-white">
								<img
									src="/quick-game/random_words.png"
									className="relative h-20 w-20"
								/>
								<p>PALABRAS</p>
								<p>OBLIGATORIAS</p>
							</div>
						) : (
							<div className="flex flex-col items-center justify-center commonButton rounded-xl text-white w-36 bg-sky-500 border-2 border-white">
								<img
									src="/quick-game/tendencias_twitter.png"
									className="relative h-20 w-20"
								/>
								<p>TENDENCIAS</p>
								<p>TWITTER</p>
							</div>
						)}
					</div>
				</div>
				<div className="flex flex-row space-x-3 items-center justify-center">
					<button
						type="button"
						className="commonButton bg-red-500 hover:bg-red-700"
						onClick={() => leaveRoom(windowUser, room, router)}
					>
						Abandonar
					</button>
					{windowUser.username == room.participants[0].username ? (
						<>
							<button
								className="commonButton bg-violet-400 hover:bg-violet-600"
								onClick={() =>
									startGame(windowUser, code, router)
								}
							>
								<p>COMENZAR</p>
							</button>
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		</Layout>
	);
}

async function leaveRoom(user, room, router) {
	const info = {
		username: user.username,
		password: user.password,
		id: "#" + room,
	};

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(info),
	};

	await fetch(
		`${process.env.NEXT_PUBLIC_URL}/api/quick_game/leave_room`,
		options
	);
	router.push("/quickGame");
}

async function startGame(user, room, router) {
	const info = {
		username: user.username,
		password: user.password,
		id: "#" + room,
	};

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(info),
	};

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_URL}/api/quick_game/play_quick_game`,
		options
	);
	const data = await res.json();

	if (data.result == "success") router.push(`/quickGame/write?id=${room}`);
}

function closeRoom(user, room, router) {}
