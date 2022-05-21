import Layout from "components/Layout";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import ListOfPeople from "components/ListOfPeople";

import Image from "next/image";

export default function Results() {
	const router = useRouter();

	const [windowUser, setWindowUser] = useState({});

	const [results, setResults] = useState();

	const [position, setPosition] = useState(-1);

	const getData = async () => {
		const body = {
			username: localStorage.getItem("username"),
			password: localStorage.getItem("password"),
		};
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		};

		// Llamada a la api
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_URL}/api/general/home`,
			options
		);
		const data = await res.json();

		// Si no ha ido bien o no estoy logeado volvemos a /
		if (data.result === "error") {
			alert("hola");
			localStorage.setItem("logged", "no");
			router.push("/login");
			return;
		}
		// Llama al hook que almacena la información del usuario
		localStorage.setItem("coins", data.coins);
		localStorage.setItem("stars", data.stars);
	};

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
			getData();
		} else {
			router.push("/login");
		}
	}, []);

	// Hace fetch de la api
	useEffect(() => {
		// Función que llama a la api
		if (windowUser.username == undefined) {
			console.log("no permito sacar datos");
			return;
		}

		const getResults = async () => {
			const queryParams = new URLSearchParams(window.location.search);
			// Opciones para llamar a la api
			const body = {
				username: windowUser.username,
				password: windowUser.password,
				id: queryParams.get("code"),
			};
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			};
			// Llamada a la api
			//const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/quick_game/points_voted_quick_game`, options)
			//const data = await res.json()

			//placeholder
			const data = {
				result: "success",
			};
			// Si no ha ido bien o no estoy logeado volvemos a /
			if (data.result === "error") {
				alert("Error al obtener datos");
				router.push("/quickGame");
				return;
			}

			const placeholder = {
				result: "success",
				clasification: [
					{
						username: "1",
						stars: 1,
					},
					{
						username: "1",
						stars: 1,
					},
					{
						username: "Jesus",
						stars: 1,
					},
				],
				coins: 42069,
			};

			//De momento usamos unos datos hardcodeados
			setResults(placeholder);
			//setResults(data)
			return placeholder;
		};
		getResults().then((res) => {
			for (var i = 0; i < 10; i++) {
				if (res.clasification[i].username == windowUser.username) {
					setPosition(i + 1);
					break;
				}
			}
		});
	}, [windowUser]);

	// Si tadavía no hoy usuario o resultados, esperamos a que los haya
	if (!windowUser || !results) {
		return <div className="background">loading...</div>;
	}

	// Renderizamos la página
	const layoutInfo = {
		username: windowUser.username,
		stars: windowUser.stars,
		coins: windowUser.coins,
		image_ID: windowUser.picture,
	};

	return (
		<Layout data={layoutInfo}>
			<div className="flex flex-col w-screen">
				<div className="flex">
					<div className="w-1/12" />
					<div className="w-5/12">
						<div className="text-center commonTitle my-4 text-6xl">
							Resultados
						</div>
						<div className="flex flex-row pt-20">
							<div>
								<div className="text-6xl">{position}º</div>
							</div>
							<div>
								<div className="h-10" />
								<div className="text-centered commonTitle text-5xl ml-16">
									{windowUser.username}
								</div>
								<div className="flex flex-row pt-10">
									<div className="w-1/12" />
									<Image
										src="/profPic/icon0.png"
										width={50}
										height={50}
									/>
									<div className="text-4xl text-white font-bold ml-10">
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
					</div>

					<div className="w-5/12">
						<div className="commonTitle my-4 text-6xl">
							Clasificación
						</div>
						<div className="scrollBox h-64 mt-20">
							<ListOfPeople data={results.clasification} />
						</div>
					</div>
				</div>

				<div className="text-center">
					<input
						type="button"
						className="clickableItem rounded-xl bg-green-800 text-white p-2 border-2 border-white text-center font-bold"
						value="Recoger"
						onClick={() => router.push("/quickGame")}
					/>
				</div>
			</div>
		</Layout>
	);
}
