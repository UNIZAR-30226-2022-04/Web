import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Layout from "components/Layout";
import Spinner from "components/Spinner";
import StoryParagraphs from "components/StoryParagraphs";

const placeholder = {
	result: "waiting_players",
	topic: "El Quijote", //vacío si no hay tema de twitter
	isLast: false,
	turn: 1,
	s: 60,
	paragraphs: [
		{
			text: "uno dos tres cuatro cinco uno seis siete ocho nueve",
			words: ["uno", "tres", "word3"],
		},
		{
			text: "kgk tgoejrhgji hrthkrghijwehrbg ergjrst hji",
			words: ["word1", "hrthkrghijwehrbg", "word3"],
		},
		{
			text: "uno dos tres cuatro cinco uno seis siete ocho nueve",
			words: ["uno", "tres", "word3"],
		},
		{
			text: "kgk tgoejrhgji hrthkrghijwehrbg ergjrst hji",
			words: ["word1", "hrthkrghijwehrbg", "word3"],
		},
		{
			text: "uno dos tres cuatro cinco uno seis siete ocho nueve",
			words: ["uno", "tres", "word3"],
		},
		{
			text: "kgk tgoejrhgji hrthkrghijwehrbg ergjrst hji",
			words: ["word1", "hrthkrghijwehrbg", "word3"],
		},
	],
};

export default function QuickVote() {
	const [windowUser, setWindowUser] = useState({});
	const [id, setId] = useState("");
	const [story, setStory] = useState("");
	const router = useRouter();
	const [chosenStory, setChosenStory] = useState(0);
	const [tick, setTick] = useState(true);
	const [time, setTime] = useState(1000);
	const [clock, setClock] = useState(0);
	const [dots, setDots] = useState("");
	const [turn, setTurn] = useState(0);

	const info = {
		username: windowUser.username,
		password: windowUser.username,
		id: id,
	};

	useEffect(() => {
		const start = new Date();
		const interval = setInterval(() => {
			const now = new Date();
			const difference = now.getTime() - start.getTime();

			const s = Math.floor(difference / 1000);
			setClock(time - s);

			if (time < s) {
				alert("Timer terminado");
				enviarVoto(info, voto);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [tick]);

	//Esperamos 3 segundos antes de volver a pedir el estado de la partida
	useEffect(() => {
		if (story.result === "waiting_players") {
			const sleep = async (ms) => {
				await new Promise((r) => setTimeout(r, ms));
			};
			sleep(3000).then(() => {
				getData();
				setTick(!tick);
				if (dots.length == 3) {
					setDots("");
				} else {
					setDots(dots + ".");
				}
			});
		}
	}, [tick]);

	useEffect(() => {
		if (localStorage.getItem("logged") == "si") {
			const queryParams = new URLSearchParams(window.location.search);
			setId(queryParams.get("id"));

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
			console.log("SACO DATOS");
		} else {
			console.log("VOY A LOGIN");
			router.push("/login");
		}
	}, []);

	const getData = async () => {
		// Opciones para llamar a la api
		const body = {
			username: windowUser.username,
			password: windowUser.password,
			turn: turn,
			id: id,
		};
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		};

		const res = await fetch(
			`${process.env.NEXT_PUBLIC_URL}/api/quick_game/resume_vote_quick_game`,
			options
		);
		const data = await res.json();

		data.result = "correcto"; // DEBUG

		// Si no ha ido bien o no estoy logeado volvemos a /
		if (data.result == "error") {
			alert("Error al obtener datos votacion");
			router.push("/quickGame");
			return;
		} /*else if(data.turn != turn){
      alert("Recibidos datos del turno incorrecto")
      router.push("/quickGame")
    }*/

		// Llama al hook que almacena la información del usuario
		setStory(placeholder);
		setTime(placeholder.s);
		setTurn(turn + 1);
		//setStory(data)
		//setTime(data.s)
	};

	// Hace fetch de la api
	useEffect(() => {
		// Función que llama a la api
		if (windowUser.username == undefined) {
			console.log("no permito sacar datos");
			return;
		}
		getData();
	}, [windowUser]);

	console.log(story);

	// Si tadavía no hoy usuario, esperamos a que lo haya
	if (!windowUser || !story) {
		return <Spinner />;
	}

	const layoutInfo = {
		username: windowUser.username,
		stars: windowUser.stars,
		coins: windowUser.coins,
		image_ID: windowUser.picture,
	};

	return (
		<Layout data={layoutInfo} inGame={true}>
			<div className="w-screen justify-top h-full align-middle items-center text-center space-y-4">
				<h1 className="commonTitle">VOTACIONES</h1>
				<h2 className="commonSubtitle">
					Elige el párrafo que más te guste
				</h2>
				{story.topic == "" ? (
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
							<h1 className="text-white">#{story.topic}</h1>
						</div>
					</div>
				)}
				<div className="centered">
					<Image
						className="ml-4"
						src="/quick-game/clock.png"
						width={30}
						height={30}
					/>
					{parseInt(clock / 60)}min:{clock % 60}seg
				</div>
				<StoryParagraphs
					story={story}
					chosenStory={chosenStory}
					setChosenStory={setChosenStory}
				/>
				<button
					className="bg-white rounded-full p-2"
					onClick={() => enviarVoto(info, chosenStory)}
				>
					Enviar Voto
				</button>
			</div>
			{story.result == "waiting_players" ? (
				<div className="absolute w-screen h-screen flex bg-opacity-75 bg-black text-6xl justify-center pt-60 text-white">
					Esperando al resto de jugadores{dots}
				</div>
			) : (
				""
			)}
		</Layout>
	);
}

async function enviarVoto(info, voto) {
	const body = {
		username: info.username,
		password: info.password,
		id: info.id,
		paragraph: voto,
	};
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	};

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_URL}/api/quick_game/vote_quick_game`,
		options
	);
	const data = await res.json();

	if (!data) {
		alert("Datos no encontrados");
	} else if (data.result === "error") {
		alert("Error al enviar datos");
		router.push("/quickGame");
	} else {
		if (story.isLast) {
			router.push("/quickGame/results");
		}
		setTick(!tick);
	}
}
