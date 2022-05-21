import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Layout from "components/Layout";
import Spinner from "components/Spinner";
import StoryParagraphs from "components/StoryParagraphs";

export default function QuickVote() {
	const router = useRouter();

	const [windowUser, setWindowUser] = useState({});
	const [id, setId] = useState("");
	const [story, setStory] = useState({
		state: "",
		topic: "",
		paragraphs: [],
		last: false
	});
	const [refresh, setRefresh] = useState(false)
	
	
	const [checkNextVote, setCheckNextVote] = useState(false)
	const [chosenStory, setChosenStory] = useState(0);
	const [time, setTime] = useState(1000);
	const [clock, setClock] = useState(0);
	const [turn, setTurn] = useState(0);

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
		} else {
			router.push("/login");
		}
	}, []);

	// Hace fetch de la api
	useEffect(() => {
		// Función que llama a la api
		if (!windowUser.username || !id) {
			return;
		}

		const getData = async () => {
			// Opciones para llamar a la api
			const body = {
				username: windowUser.username,
				password: windowUser.password,
				turn: turn,
				id: '#' + id,
			};
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			};
			
			var res = undefined

			while(!res){
				res = await fetch(
					`${process.env.NEXT_PUBLIC_URL}/api/quick_game/resume_vote_quick_game`,
					options
				);
				if(!res.ok){
					res = undefined
				}
			}

			const data = await res.json();
				
			// Si no ha ido bien o no estoy logeado volvemos a /
			if (data.result == "error") {
				alert("Error al obtener datos votacion");
				console.log(data)
				router.push("/quickGame");
				return;
			
			}
			
			const parrafos = data.paragraphs.map((parrafo) => {
				return {
					text: parrafo.body,
					words: parrafo.words
				}
			})

			console.log("Parrafos: ", parrafos)

			// Llama al hook que almacena la información del usuario
			setStory({
				state: data.result,
				topic: data.topic,
				last: data.isLast,
				paragraphs: parrafos
			})
			setTime(data.s)
		};

		getData();
	}, [windowUser, turn, refresh]);

	// Controla  el tiempo de voto
	useEffect(() => {
		const start = new Date();

		const interval = setInterval(() => {
			if(checkNextVote){
				return
			}
			const now = new Date();
			const difference = now.getTime() - start.getTime();

			const s = Math.floor(difference / 1000);
			const tiempo = (time - s < 0) ? 0 : story.time - s
			setClock(tiempo);

			if (tiempo == 0) {
				enviarVoto(
					info,
					0, 
					setCheckNextVote, 
					router
				);
				setTurn(turn + 1)
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [windowUser, id, checkNextVote, story]);
	
	// Controla la espera de jugadores
	useEffect(() => {		
		const interval = setInterval(() => {
			console.log("Check Continuo")
			if(checkNextVote == true){			
				if (story.state == "waiting_players") {				
					console.log("tengo que checkear el paso de turno")	
					setRefresh(!refresh)					
				}else{
					console.log("paso de turno")
					setCheckNextVote(false)
				}
			}			
		}, 1000);

		return () => clearInterval(interval);
	}, [windowUser, checkNextVote, story]);

	// Si tadavía no hoy usuario, esperamos a que lo haya
	if (!windowUser || !story.turn == 0) {
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
					onClick={() => enviarVoto(windowUser, id, chosenStory, setCheckNextVote, router)}
				>
					Enviar Voto
				</button>
			</div>
			{story.state == "waiting_players" ? (
				<div className="absolute w-screen h-screen flex bg-opacity-75 bg-black text-6xl justify-center pt-60 text-white">
					Esperando al resto de jugadores
				</div>
			) : (
				""
			)}
		</Layout>
	);
}

async function enviarVoto(windowUser, id, voto, setCheckNextVote, router) {
	
	const info = {
		username: windowUser.username,
		password: windowUser.password,
		id: id,
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

	if (!data) {
		alert("Datos no encontrados");

	} else if (data.result === "error") {
		alert("Error al enviar datos:", data.reason);
		router.push("/quickGame");

	} else {
		setCheckNextVote(true)
	}
}
