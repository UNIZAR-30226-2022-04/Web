import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "./Spinner";

const WriteStory = ({ first }) => {
	const router = useRouter();

	const [currentTitle, setCurrentTitle] = useState("");
	const [parrafos, setParrafos] = useState("");
	const [currentText, setCurrentText] = useState("");

	const [windowUser, setWindowUser] = useState({});
	const [storyInfo, setStoryInfo] = useState({});

	// Local info
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

	// Story info
	useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search);
		setStoryInfo({
			id: parseInt(queryParams.get("id")),
			creator: queryParams.get("creator"),
			isLast: queryParams.get("lastTurn") != 0,
			turns: parseInt(queryParams.get("turns")),
			maxChar: parseInt(queryParams.get("characters")),
			isPublic: queryParams.get("privacy") == 1,
		});
	}, []);

	useEffect(() => {
		if (storyInfo.id == undefined) {
			return;
		}

		const getPrevious = async () => {
			if (!first) {
				const info = {
					username: windowUser.username,
					password: windowUser.password,
					id: storyInfo.id,
				};

				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
					body: JSON.stringify(info),
				};

				const res = await fetch(
					`${process.env.NEXT_PUBLIC_URL}/api/tale_mode/resume_tale`,
					options
				);
				const data = await res.json();

				if (data.result != "error") {
					setCurrentTitle(data.title);
					setParrafos(data.paragraphs);

					const story = {
						id: storyInfo.id,
						creator: storyInfo.creator,
						isLast: storyInfo.isLast,
						maxChar: data.maxCharacters,
						isPublic: storyInfo.isPublic,
					};

					setStoryInfo(story);
				} else {
					alert("No se ha encontrado la historia");
					router.push("/storyMode");
				}
			}
		};
		getPrevious();
	}, [windowUser, storyInfo, router]);

	const create_tale = async () => {
		if (storyInfo.id == undefined) {
			return;
		}

		const info = {
			username: windowUser.username,
			password: windowUser.password,
			title: currentTitle,
			maxTurns: storyInfo.turns,
			maxCharacters: storyInfo.maxChar,
			privacy: storyInfo.isPublic,
			first_paragraph: currentText,
		};

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(info),
		};

		const res = await fetch(
			`${process.env.NEXT_PUBLIC_URL}/api/tale_mode/create_tale`,
			options
		);
		const data = await res.json();
		return data;
	};

	const add_tale_paragraph = async () => {
		const info = {
			username: windowUser.username,
			password: windowUser.password,
			id: storyInfo.id,
			body: currentText,
			isLast: storyInfo.isLast,
		};

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(info),
		};

		const res = await fetch(
			"http://localhost:3000/api/tale_mode/add_tale_paragraph",
			options
		);
		const data = await res.json();
		return data;
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		if (first) {
			const info = await create_tale();

			if (info.result == "error") {
				alert("Error al crear historia");
			}
		} else {
			const info = await add_tale_paragraph();

			if (info.result == "error") {
				alert("Error al continuar historia");
			}
		}

		router.push("/storyMode");
	};

	if ((!first && !parrafos) || !storyInfo) {
		return <Spinner showLayout={false} />;
	}

	var lastWrite;
	var disabled;
	var placeh;

	if (!first) {
		lastWrite = parrafos[parrafos.length - 1].username == windowUser.username;
		disabled = lastWrite ? "yes" : "";
		placeh = lastWrite ? "No puedes escribir ahora" : "Escribe tu parrafo";
	}

	return (
		<div className="flex flex-row w-full mt-10 p-10 items-start">
			<div className="flex flex-col w-1/2 h-3/4 space-y-5 p-4">
				<div className="commonTitle">Párrafos anteriores</div>
				<div className="flex flex-col overflow-y-scroll space-y-2 px-2">
					{parrafos ? (
						<>
							{parrafos.map((parrafo, index) => {
								return (
									<div key={index} className="w-full">
										<div className="flex flex-row space-x-1">
											<div className="font-arial-r">
												Escrito por
											</div>
											<div className="font-arial-b">
												{parrafo.username}
											</div>
										</div>

										<div className="bg-verde_parrafo text-white font-arial-b p-2 overflow-visible">
											{parrafo.text}
										</div>
									</div>
								);
							})}
						</>
					) : (
						<></>
					)}
				</div>
			</div>

			<form
				className="flex flex-col items-center w-1/2 h-3/4 space-y-3 pt-32"
				onSubmit={onSubmit}
			>
				<div className="commonTitle">
					{first ? "Empieza tu relato" : currentTitle}
				</div>

				{first ? (
					<input
						className="text-center text-6xl font-arial-b rounded-xl"
						type="text"
						required={true}
						placeholder="Inserte título del relato"
						onChange={(e) => setCurrentTitle(e.target.value)}
					/>
				) : (
					<></>
				)}

				{lastWrite ? (
					<></>
				) : (
					<div className="commonSubtitle">
						{storyInfo.maxChar - currentText.length} caracteres
					</div>
				)}

				<textarea
					disabled={disabled}
					className="border-blue-800 border-4 rounded-2xl text-center text-lg flex-col h-1/2 w-full p-3"
					type="text"
					required={true}
					maxLength={storyInfo.maxChar}
					placeholder={placeh}
					onChange={(e) => setCurrentText(e.target.value)}
				/>

				<div className="flex flex-row space-x-3">
					{!lastWrite ? (
						<button
							className="commonButton bg-verde_top"
							type="submit"
						>
							Enviar parrafo
						</button>
					) : (
						<div className="flex flex-col">
							<div className="font-arial-b">
								Has sido el último en escribir
							</div>
							<button
								className="commonButton bg-red-500 shadow-red-800"
								type="button"
								onClick={(e) => router.push("/storyMode")}
							>
								{"<-"}Volver
							</button>
						</div>
					)}

					{!first && storyInfo.creator == windowUser.username ? (
						<button
							className="commonButton bg-red-500 shadow-red-800"
							type="button"
							onClick={(e) =>
								finishTale(
									windowUser,
									storyInfo,
									currentText,
									router
								)
							}
						>
							Terminar relato
						</button>
					) : (
						<></>
					)}
				</div>
			</form>
		</div>
	);
};

async function finishTale(user, tale, body, router) {
	if (body == "") {
		alert("Añade texto");
		return;
	}

	const info = {
		username: user.username,
		password: user.password,
		id: tale.id,
		body: body,
		isLast: 1,
	};

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(info),
	};

	fetch("http://localhost:3000/api/tale_mode/add_tale_paragraph", options);
	router.push("/storyMode");
}

export default WriteStory;
