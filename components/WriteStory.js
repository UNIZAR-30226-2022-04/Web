import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "./Spinner";

export default function WriteStory({ first }) {
	const router = useRouter();

	const [currentTitle, setCurrentTitle] = useState("");
	const [parrafos, setParrafos] = useState("");
	const [currentText, setCurrentText] = useState("");

	const [windowUser, setWindowUser] = useState({});
	const [maxTurns, setMaxTurns] = useState(999);

	const [disableClick, setDisableClick] = useState("");

	const [storyInfo, setStoryInfo] = useState({
		id: "",
		creator: "",
		isLast: false,
		maxChar: 0,
		isPublic: false,
	});

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

		if (first) {
			setStoryInfo({
				id: "",
				creator: "",
				isLast: false,
				turns: parseInt(queryParams.get("turns")),
				maxChar: parseInt(queryParams.get("characters")),
				isPublic: queryParams.get("privacy") == 1,
			});
		} else {
			setMaxTurns(parseInt(queryParams.get("maxTurns")));
			setStoryInfo({
				id: parseInt(queryParams.get("id")),
				creator: queryParams.get("creator"),
				isLast: false,
				turns: "",
				maxChar: 0,
				isPublic: queryParams.get("privacy") == 1,
			});
		}
	}, []);

	useEffect(() => {
		if (!windowUser || !storyInfo.id) {
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
					if (data.paragraphs.length >= maxTurns) {
						router.push("/storyMode");
						return;
					}

					setCurrentTitle(data.title);
					setParrafos(data.paragraphs);

					if (storyInfo.creator) {
						const story = {
							id: storyInfo.id,
							creator: storyInfo.creator,
							isLast: data.paragraphs.length + 1 == maxTurns,
							maxChar: data.maxCharacters,
							isPublic: storyInfo.isPublic,
						};
						setStoryInfo(story);
					}
				} else {
					alert("No se ha encontrado la historia");
					router.push("/storyMode");
				}
			}
		};

		const interval = setInterval(() => getPrevious(), 500);
		return () => clearInterval(interval);
	}, [windowUser, router]);

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
			`${process.env.NEXT_PUBLIC_URL}/api/tale_mode/add_tale_paragraph`,
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
		lastWrite =
			parrafos[parrafos.length - 1].username == windowUser.username;
		disabled =
			lastWrite && storyInfo.creator != windowUser.username ? "yes" : "";
		placeh =
			lastWrite && storyInfo.creator != windowUser.username
				? "Has sido el ??ltimo en escribir"
				: "Escribe tu parrafo";
	}

	console.log("Historia: ", storyInfo);

	return (
		<div className="flex flex-row w-full mt-10 p-10 items-start">
			<div className="flex flex-col w-1/2 h-3/4 space-y-5 p-4">
				<div className="commonTitle">P??rrafos anteriores</div>
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
						<div className="bg-verde_parrafo text-white font-arial-b p-2 overflow-visible">
							No hay p??rrafos anteriores.
						</div>
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
						className="border-verde_parrafo border-2 w-1/2 resize text-center text-3xl font-bangers rounded-lg text-neutral-800"
						type="text"
						required={true}
						maxLength={50}
						placeholder="Inserta t??tulo del relato"
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
						restantes
					</div>
				)}

				<textarea
					disabled={disabled}
					className="border-verde_letras border-2 rounded-2xl text-center text-lg flex-col h-1/2 w-full p-3 resize-none"
					type="text"
					required={true}
					maxLength={storyInfo.maxChar}
					placeholder={placeh}
					onChange={(e) => setCurrentText(e.target.value)}
				/>

				<div className="flex flex-row space-x-3">
					{!lastWrite && !storyInfo.isLast ? (
						<button
							className="commonButton bg-verde_top hover:bg-verde_letras"
							disabled={disableClick}
						>
							Enviar p??rrafo
						</button>
					) : (
						<div className="flex flex-col">
							<button
								className="commonButton bg-red-500 shadow-red-800 hover:bg-red-700"
								type="button"
								onClick={() => router.push("/storyMode")}
							>
								Volver
							</button>
						</div>
					)}
					{(!first && storyInfo.creator == windowUser.username) ||
					storyInfo.isLast ? (
						<button
							className="commonButton bg-indigo-400 shadow-indigo-500 hover:bg-indigo-600"
							type="button"
							onClick={() =>
								finishTale(
									windowUser,
									storyInfo,
									currentText,
									setDisableClick,
									router
								)
							}
							disabled={disableClick}
						>
							Finalizar relato
						</button>
					) : (
						<></>
					)}
				</div>
			</form>
		</div>
	);
}

async function finishTale(user, tale, body, setDisableClick, router) {
	if (body == "") {
		alert("A??ade texto");
		return;
	}

	setDisableClick("si");

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

	await fetch(
		`${process.env.NEXT_PUBLIC_URL}/api/tale_mode/add_tale_paragraph`,
		options
	);
	router.push("/storyMode");
}
