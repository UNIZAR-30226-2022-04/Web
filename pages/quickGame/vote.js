import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Layout from "components/Layout";
import Spinner from "components/Spinner";
import StoryParagraphs from "components/StoryParagraphs";
import Meta from "components/Meta";

export default function QuickVote() {
	const router = useRouter();

	const [windowUser, setWindowUser] = useState({});
	const [roomID, setRoomID] = useState("");

	const [disableClick, setDisableClick] = useState("");

	const [game, setGame] = useState({
		state: "",
		topic: "",
		paragraphs: [],
		turn: 0,
		last: false,
		time: 999,
	});

	const [refresh, setRefresh] = useState(false);

	const [checkNextVote, setCheckNextVote] = useState(false);
	const [chosenStory, setChosenStory] = useState(0);
	const [clock, setClock] = useState(0);

	// Sava la info del usuario
	useEffect(() => {
		if (localStorage.getItem("logged") == "si") {
			const queryParams = new URLSearchParams(window.location.search);
			setRoomID(queryParams.get("id"));

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

			setCheckNextVote(true);
		} else {
			router.push("/login");
		}
	}, []);

	// Hace fetch de la api de votaciones
	useEffect(() => {
		// Función que llama a la api
		if (!windowUser.username || !roomID) {
			return;
		}

		const getData = async () => {
			// Opciones para llamar a la api
			const info = {
				username: windowUser.username,
				password: windowUser.password,
				turn: 0,
				id: "#" + roomID,
			};

			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(info),
			};

			console.log("ENVÍO: ", info);

			const res = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/api/quick_game/resume_vote_quick_game`,
				options
			);

			if (!res.ok) {
				console.log("error responose: ", res);
				return;
			}

			const data = await res.json();

			console.log(data);

			// Si no ha ido bien o no estoy logeado volvemos a /
			if (data.result == "error") {
				console.log(data);
				alert("Error al obtener datos votacion");
				router.push("/quickGame");
				return;
			}

			if (data.result == "waiting_players") {
				setGame({
					state: data.result,
					topic: "",
					last: false,
					turn: 0,
					time: 0,
					paragraphs: [],
				});
			} else {
				const parrafos = data.paragraphs.map((parrafo) => {
					return {
						text: parrafo.body,
						words: parrafo.words,
					};
				});

				console.log("Parrafos: ", parrafos);

				// Llama al hook que almacena la información de la partida
				setGame({
					state: data.result,
					topic: data.topic,
					last: data.isLast,
					turn: data.turn,
					time: data.s,
					paragraphs: parrafos,
				});
			}
		};

		getData();
	}, [windowUser, roomID, refresh, router]);

	// Controla  el tiempo de voto
	useEffect(() => {
		const start = new Date();

		const interval = setInterval(() => {
			if (game.state == "waiting_players") {
				return;
			}

			const now = new Date();
			const difference = now.getTime() - start.getTime();

			const s = Math.floor(difference / 1000);
			const tiempo = game.time - s < 0 ? 0 : game.time - s;
			setClock(tiempo);

			if (tiempo == 0) {
				enviarVoto(
					windowUser,
					roomID,
					chosenStory,
					game,
					setDisableClick,
					router
				);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [
		windowUser,
		roomID,
		checkNextVote,
		chosenStory,
		game,
		setDisableClick,
		router,
	]);

	// Controla la espera de jugadores
	useEffect(() => {
		const interval = setInterval(() => {
			console.log("Check Continuo");
			if (checkNextVote == true) {
				if (game.state == "waiting_players") {
					console.log("tengo que checkear el paso de turno");
					setRefresh(!refresh);
				} else {
					console.log("paso de turno");
					setCheckNextVote(false);
				}
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [windowUser, roomID, checkNextVote, game]);

	// Si tadavía no hoy usuario, esperamos a que lo haya
	if (!windowUser || game.state == "") {
		console.log("USER: ", windowUser);
		console.log("STORY: ", game);
		return <Spinner showLayout={true} />;
	}

	const layoutInfo = {
		username: windowUser.username,
		stars: windowUser.stars,
		coins: windowUser.coins,
		image_ID: windowUser.picture,
	};

	return (
		<Layout data={layoutInfo} inGame={true}>
			<Meta title="Votación" />
			<div className="w-screen justify-top h-full align-middle items-center text-center space-y-4">
				<h1 className="commonTitle">VOTACIONES</h1>
				<h2 className="commonSubtitle">
					Elige el párrafo que más te guste
				</h2>
				{!game.topic ? (
					<></>
				) : (
					<div className="flex flex-row items-center justify-center space-x-2">
						<h1 className="commonSubtitle">Tema de la historia:</h1>
						<div className="flex flex-row bg-blue-400 items-center justify-center py-1 px-4 rounded-md space-x-3">
							<Image
								src="/quick-game/twitter_trend.png"
								width={28}
								height={28}
							/>
							<h1 className="text-white">#{game.topic}</h1>
						</div>
					</div>
				)}
				<div className="">
					<Image
						className="ml-4"
						src="/quick-game/clock.png"
						width={30}
						height={30}
					/>
					{parseInt(clock / 60)}min:{clock % 60}seg
				</div>
				<StoryParagraphs
					story={game}
					chosenStory={chosenStory}
					setChosenStory={setChosenStory}
				/>
				<button
					disabled={disableClick}
					className="bg-white rounded-full p-2"
					onClick={() =>
						enviarVoto(
							windowUser,
							roomID,
							chosenStory,
							game,
							setDisableClick,
							router
						)
					}
				>
					Enviar Voto
				</button>
			</div>
			{game.state == "waiting_players" ? (
				<div className="absolute w-screen h-screen flex bg-opacity-75 bg-black text-6xl justify-center pt-60 text-white">
					Esperando al resto de jugadores
				</div>
			) : (
				<></>
			)}
		</Layout>
	);
}

async function enviarVoto(
	windowUser,
	roomID,
	voto,
	game,
	setDisableClick,
	router
) {
	setDisableClick("si");
	const res = await addVote(windowUser, roomID, voto);

	if (!res) {
		alert("Datos no encontrados");
		return;
	} else if (res.result == "error") {
		alert("Error al enviar datos:", res.reason);
		router.push("/quickGame");
		return;
	}

	router.push(
		`/quickGame/voteResult?id=${roomID}&turn=${game.turn}&last=${game.last}`
	);
}

async function addVote(windowUser, roomID, voto) {
	const info = {
		username: windowUser.username,
		password: windowUser.password,
		id: "#" + roomID,
		paragraph: voto,
	};

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(info),
	};

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_URL}/api/quick_game/vote_quick_game`,
		options
	);

	const data = await res.json();

	return data;
}
