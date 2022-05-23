
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Layout from "components/Layout";
import ListOfPeople from "components/ListOfPeople";
import Meta from "components/Meta";
import Spinner from "components/Spinner";


export default function Results() {
	const router = useRouter();

	const [windowUser, setWindowUser] = useState({});

	const [results, setResults] = useState({
		result: "",
		clasification: [],
		coins: 0,
	});

	const [position, setPosition] = useState(-1);

	const [roomID, setRoomID] = useState("")

	useEffect(() => {
		if (localStorage.getItem("logged") == "si") {
			const queryParams = new URLSearchParams(window.location.search);
			setRoomID(queryParams.get("id"))

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
		if (!windowUser.username || !roomID) {
			return;
		}

		const getResults = async () => {
			
			// Opciones para llamar a la api
			const body = {
				username: windowUser.username,
				password: windowUser.password,
				id: '#' + roomID
			};
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			};
			// Llamada a la api
			const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/quick_game/points_voted_quick_game`, options)
			const data = await res.json()

			// Si no ha ido bien o no estoy logeado volvemos a /
			if (data.result === "error") {
				alert("Error al obtener datos");
				router.push("/quickGame");
				return;
			}

			setResults(data)
			return data;
		};
		
		getResults().then((res) => {
			for (var i = 0; i < res.clasification.length; i++) {
				console.log(res.clasification[i]);
				if (res.clasification[i].username == windowUser.username) {
					setPosition(i + 1);
					break;
				}
			}
		});
	}, [windowUser, roomID]);

	console.log(results)
	
	// Si tadavía no hoy usuario o resultados, esperamos a que los haya
	if (!windowUser || !results.result) {
		return <Spinner />
	}

	// Renderizamos la página
	const layoutInfo = {
		username: windowUser.username,
		stars: windowUser.stars,
		coins: windowUser.coins,
		image_ID: windowUser.picture,
	};

	return (
		<Layout data={layoutInfo} inGame={true}>
			<Meta title="Resultados" />
			<div className="flex flex-col w-full justify-center mb-20">
				<div className="flex">
					<div className="flex flex-row justify-around w-full">
						<div className="flex flex-col">
							<div className="commonTitle text-6xl">
								Puntuación
							</div>
							<div className="flex flex-col items-center space-y-5">
								<div className="flex flex-row items-center">
									<div className="text-6xl commonTitle">
										{position}º
									</div>
									<div className="text-centered commonTitle text-5xl ml-16">
										{windowUser.username}
								</div>
								</div>
								
								<div className="flex flex-row">
									<Image
										src={`/profPic/icon${windowUser.picture}.png`}
										width={50}
										height={50}
									/>
									<div className="text-4xl text-white font-bold">
										+{results.coins}
									</div>
									<Image
										src="/icons/mooncoin.png"
										width={50}
										height={50}
									/>
								</div>
							</div>
						</div>
						<div className="flex flex-col space-y-2">
							<div className="commonTitle text-6xl">
								Clasificación
							</div>
							<div className="bg-scroll overflow-x-hidden overflow-y-auto w-auto h-64">
								<ListOfPeople data={results.clasification} />
							</div>
						</div>
					</div>
				</div>

				<button
					type="button"
					className="absolute bottom-3 commonButton bg-verde_letras"
					onClick={() => (router.push("/quickGame"))}
				>
					Recoger
				</button>
			</div>
		</Layout>
	);
}
