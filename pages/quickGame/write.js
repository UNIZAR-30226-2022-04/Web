import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Layout from "components/Layout";
import Spinner from "components/Spinner";
import Meta from "components/Meta";

export default function Write() {
	const router = useRouter();
	const [windowUser, setWindowUser] = useState({});
	const [userCoins, setUserCoins] = useState();

	const [punyetasMenu, setPunyetasMenu] = useState(false);
	const [punyetaCarro, setPunyetaCarro] = useState("");
	const [punyetasCompradas, setPunyetasCompradas] = useState([]);
	const [currentText, setCurrentText] = useState("");

	const [clock, setClock] = useState(0);

	const [checkNextTurn, setCheckNextTurn] = useState(false);
	const [refresh, setRefresh] = useState(false);

	const [disableClick, setDisableClick] = useState("")

	// Info de una partida
	const [turn, setTurn] = useState(0);
	const [rivals, setRivals] = useState([]);
	const [roomID, setRoomID] = useState();

	const [game, setGame] = useState({
		state: "",
		time: 20,
		topic: "",
		randomWords: [],
		lastParagraph: "",
		last: false,
		turn: 0,
		punyeta: "",
		location: 1
	});

	// Saca la información del usuario de la pantalla
	// Solo se obtiene al principio
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
				stars: stars,
			});

			setUserCoins(coins);
		} else {
			router.push("/login");
		}
	}, []);

	// Obtiene los datos de la sala
	// Se ejcuta una vez por turno
	useEffect(() => {
		if (!windowUser.username || !roomID) {
			return;
		}
		setCurrentText("");

		const getData = async () => {
			// Información que necesitan las apis
			const infoRoom = {
				username: windowUser.username,
				password: windowUser.password,
				id: "#" + roomID,
			};

			const infoTurn = {
				username: windowUser.username,
				password: windowUser.password,
				turn: 0,
				id: "#" + roomID,
			};

			// Opciones para la realización de la llamada HTTP
			const optionsRoom = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(infoRoom),
			};

			const optionsTurn = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(infoTurn),
			};

			// Llamadas a las apis
			const resRoom = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/api/quick_game/get_room`,
				optionsRoom
			);
			const dataRoom = await resRoom.json();

			const resTurn = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/api/quick_game/play_quick_game`,
				optionsTurn
			);
			const dataTurn = await resTurn.json();

			if (dataRoom.result != "error" && dataTurn.result != "error") {
				if(dataTurn.result != "error"){
					setGame({
						state: dataTurn.result,
						time: dataTurn.s,
						topic: dataTurn.topic,
						randomWords: dataTurn.randomWords,
						lastParagraph: dataTurn.lastParagraph,
						last: dataTurn.isLast,
						turn: dataTurn.turn,
						punyeta: dataTurn.puneta,
						location: dataRoom.hasStarted
					});
				}				
				setRivals(
					dataRoom.participants.filter(
						(rival) => rival.username != windowUser.username
					)
				);

			}else if(dataRoom.hasStarted == 2){
				router.push(`/quickGame/vote?id=${roomID}`);

			} else {
				console.log("ERROR AL OBTENER DATOS DE ESCRITURA");
				console.log("SALA:", dataRoom);
				console.log("TURNO:", dataTurn);
				router.push("/quickGame");
			}
		};

		getData();
	}, [windowUser, roomID, turn, refresh, router]);
	

	//Temporizador
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

				submitParagraph(
					windowUser,
					roomID,
					"",
					turn,
					setTurn,
					punyetasCompradas,
					setCheckNextTurn,
					setDisableClick,
					router
				);
				setCheckNextTurn(true);
				setTurn(turn + 1);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [windowUser, roomID, checkNextTurn, setCheckNextTurn, punyetasCompradas, setTurn, setDisableClick, game, router]);


	// Compruebo continuamente si estoy esperando al resto
	useEffect(() => {
		const interval = setInterval(() => {
			console.log("Check Continuo");
			console.log("PARTIDA: ", game.state, game.turn, game.last, game.location)
			
			if (checkNextTurn == true) {
				if (game.state == "waiting_players") {
					if(game.location == 2){
						router.push(`/quickGame/vote?id=${roomID}`);
					}
					console.log("tengo que checkear el paso de turno");
					setRefresh(!refresh);
					
				} else {					
					console.log("paso de turno");
					setCheckNextTurn(false);
					setDisableClick("")
				}
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [windowUser, roomID, checkNextTurn, game]);

	// Si tadavía no hoy usuario o sala, esperamos a que lo haya
	if (!windowUser || game.state == "") {
		return <Spinner showLayout={true} />;
	}

	const layoutInfo = {
		username: windowUser.username,
		stars: windowUser.stars,
		coins: userCoins,
		image_ID: windowUser.picture,
	};

	// Página principal
	return (
		<Layout data={layoutInfo} inGame={true}>
		<Meta title={"#" + roomID} />
		{ game.punyeta != "desorden" ? (
			<div className="flex flex-row w-full mb-20">
				<div className="flex flex-col items-center align-middle justify-center w-full h-full space-y-2">
					<div className="commonTitle h-auto">
						{turn == 0
							? "Comienza la historia"
							: "Párrafo anterior"}
					</div>
					<div>{game.lastParagraph}</div>
					<div className="">
						{game.topic ? (
							<div className="flex flex-row space-x-2 items-center">
								<div>Tema de la historia</div>
								<div className="rounded bg-blue-400 p-1">
									#{game.topic}
								</div>
								<Image
									className=""
									src="/quick-game/twitter_trend.png"
									width={30}
									height={30}
								/>
							</div>
						) : (
							<div className="flex flex-col items-center">
								<div className="">Palabras a introducir</div>
								<div className="flex flex-row space-x-2 items-center">
									<DisplayPalabraClave
										palabra={game.randomWords[0]}
										currentText={currentText}
									/>
									<DisplayPalabraClave
										palabra={game.randomWords[1]}
										currentText={currentText}
									/>
									<DisplayPalabraClave
										palabra={game.randomWords[2]}
										currentText={currentText}
									/>
								</div>
							</div>
						)}
					</div>

					<div className="flex flex-row items-center">
						<Image
							className=""
							src="/quick-game/clock.png"
							width={30}
							height={30}
						/>
						<div>
							{parseInt(clock / 60)}min:{clock % 60}seg
						</div>
					</div>

					<textarea
						className={`text-2xl font-arial h-2/5 w-2/5 p-3 rounded-lg ${
							game.punyeta == "reves" ? "font-reverse" : ""
						} ${
							game.punyeta == "ciego" ? "font-blank bg-black" : ""
						}`}
						type="password"
						required={true}
						value={currentText}
						placeholder="Escribe tu parrafo"
						onChange={(e) => setCurrentText(e.target.value)}
					/>
					<button
						disabled={disableClick}
						className="commonButton bg-verde_top"
						type="button"
						onClick={() =>
							submitParagraph(
								windowUser,
								roomID,
								currentText,
								turn,
								setTurn,
								punyetasCompradas,
								setCheckNextTurn,
								setDisableClick,
								router
							)
						}
					>
						{game.last? "Terminar historia":"Enviar parrafo"}
					</button>
				</div>
				<div className="bg-green-800 flex flex-col align-middle w-1/4 items-center">
					<div className="flex-row">
						{game.last ? (
							<div className="flex flex-row items-center space-x-2 text-center w-full p-4">
								<div className="text-white text-xl">
									Ultima ronda, puñetas no disponibles
								</div>
								<Image
									src={`/quick-game/punyetas.png`}
									width={60}
									height={60}
								/>
							</div>
						) : (
							<button
							disabled={disableClick}
								type="button"
								className="text-xl text-white m-2"
								onClick={() =>
									openClose(
										punyetasMenu,
										setPunyetasMenu,
										setPunyetaCarro
									)
								}
							>
								{punyetasMenu == "objetivo" ? (
									"¿A quien le envias la puñeta?"
								) : (
									<div className="flex flex-row items-center space-x-2">
										<div>Comprar puñetas</div>
										<Image
											src={`/quick-game/punyetas.png`}
											width={60}
											height={60}
										/>
									</div>
								)}
							</button>
						)}
					</div>

					{punyetasMenu == "punyeta" ? (
						<div className="flex flex-col space-y-2 2">
							<ButtonPunyeta
								img={"letras_reves"}
								name={"reves"}
								text={"Letras al revés"}
								price={150}
								setPunyetasMenu={setPunyetasMenu}
								setPunyetaCarro={setPunyetaCarro}
							/>
							<ButtonPunyeta
								img={"escribe_ciegas"}
								name={"ciego"}
								text={"Escribe a ciegas"}
								price={300}
								setPunyetasMenu={setPunyetasMenu}
								setPunyetaCarro={setPunyetaCarro}
							/>
							<ButtonPunyeta
								img={"desorden_total"}
								name={"desorden"}
								text={"Desorden total"}
								price={500}
								setPunyetasMenu={setPunyetasMenu}
								setPunyetaCarro={setPunyetaCarro}
							/>
						</div>
					) : (
						<></>
					)}

					{punyetasMenu == "objetivo" ? (
						<div className="flex flex-col space-y-2">
							{rivals.map((rival, index) => (
								<Rival
									key={index}
									coins={userCoins}
									setCoins={setUserCoins}
									rivalName={rival.username}
									picture={rival.picture}
									punyetaCarro={punyetaCarro}
									setPunyetasMenu={setPunyetasMenu}
									punyetasCompradas={punyetasCompradas}
									setPunyetasCompradas={setPunyetasCompradas}
									rivals={rivals}
									setRivals={setRivals}
								/>
							))}
							<button
								disabled={disableClick}
								type="button"
								className="bg-white flex flex-row space-x-2 p-2 rounded items-center text-center"
								onClick={() => setPunyetasMenu("")}
							>
								{"<-"} A Nadie
							</button>
						</div>
					) : (
						<></>
					)}
				</div>
			</div>)
			:
			(
			<div className="flex flex-row w-full mb-20">

					<div className="w-1/3">
						
					{/*U*/}
						<Image src = "/quick-game/desorden_total.png" width={350} height={350}/>
					{/*U*/}
					
					{/*5*/}
					<textarea
						className="text-2xl font-arial h-2/5 w-2/5 p-3 rounded-lg"
						type="password"
						required={true}
						value={currentText}
						placeholder="Escribe tu parrafo"
						onChange={(e) => setCurrentText(e.target.value)}
					/>
					{/*5*/}
					</div>


					{/*6*/}
					<button
						disabled={disableClick}
						className="commonButton bg-verde_top"
						type="button"
						onClick={() =>
							submitParagraph(
								windowUser,
								roomID,
								currentText,
								turn,
								setTurn,
								punyetasCompradas,
								setCheckNextTurn,
								setDisableClick,
								router
							)
						}
						>
					{game.last? "Terminar historia":"Enviar parrafo"}
					</button>
					{/*6*/}

					{/*1*/}
					<div>{game.lastParagraph}</div>
					<div className="commonTitle h-auto">
						Párrafo anterior 
					</div>

					{/*1*/}

				{/*7*/}
				<div className="bg-green-800 flex flex-col align-middle w-20 h-20 mt-32 items-center">
					<div className="flex-row">
						{game.last ? (
							<div className="flex flex-row items-center space-x-2 text-center w-full p-4">
								<div className="text-white text-xl">
									Ultima ronda, puñetas no disponibles
								</div>
								<Image
									src={`/quick-game/punyetas.png`}
									width={60}
									height={60}
								/>
							</div>
						) : (
							<button
								disabled={disableClick}
								type="button"
								className="text-xl text-white m-2"
								onClick={() =>
									openClose(
										punyetasMenu,
										setPunyetasMenu,
										setPunyetaCarro
									)
								}
							>
								{punyetasMenu == "objetivo" ? (
									"¿A quien le envias la puñeta?"
								) : (
									<div className="flex flex-row items-center space-x-2">
										<div>Comprar puñetas</div>
										<Image
											src={`/quick-game/punyetas.png`}
											width={60}
											height={60}
										/>
									</div>
								)}
							</button>
						)}
					</div>
					{punyetasMenu == "punyeta" ? (
						<div className="flex flex-col space-y-2 2">
							<ButtonPunyeta
								img={"letras_reves"}
								name={"reves"}
								text={"Letras al revés"}
								price={150}
								setPunyetasMenu={setPunyetasMenu}
								setPunyetaCarro={setPunyetaCarro}
							/>
							<ButtonPunyeta
								img={"escribe_ciegas"}
								name={"ciego"}
								text={"Escribe a ciegas"}
								price={300}
								setPunyetasMenu={setPunyetasMenu}
								setPunyetaCarro={setPunyetaCarro}
							/>
							<ButtonPunyeta
								img={"desorden_total"}
								name={"desorden"}
								text={"Desorden total"}
								price={500}
								setPunyetasMenu={setPunyetasMenu}
								setPunyetaCarro={setPunyetaCarro}
							/>
						</div>
					) : (
						<></>
					)}

					{punyetasMenu == "objetivo" ? (
						<div className="flex flex-col space-y-2">
							{rivals.map((rival, index) => (
								<Rival
									key={index}
									coins={userCoins}
									setCoins={setUserCoins}
									rivalName={rival.username}
									picture={rival.picture}
									punyetaCarro={punyetaCarro}
									setPunyetasMenu={setPunyetasMenu}
									punyetasCompradas={punyetasCompradas}
									setPunyetasCompradas={setPunyetasCompradas}
									rivals={rivals}
									setRivals={setRivals}
								/>
							))}
							<button
								disabled={disableClick}
								type="button"
								className="bg-white flex flex-row space-x-2 p-2 rounded items-center text-center"
								onClick={() => setPunyetasMenu("")}
							>
								{"<-"} A Nadie
							</button>
						</div>
					) : (
						<></>
					)}
				</div>
				{/*7*/}

						{/*3*/}
					<div className="mt-64 pt-64">
						{game.topic ? (
							<div className="flex flex-row space-x-2 items-center">
								<div>Tema de la historia</div>
								<div className="rounded bg-blue-400 p-1">
									#{game.topic}
								</div>
								<Image
									className=""
									src="/quick-game/twitter_trend.png"
									width={30}
									height={30}
								/>
							</div>
						)
						:
						(
						<div className="flex flex-col items-center">
							<div className="">Palabras a introducir</div>
							<div className="flex flex-row space-x-2 items-center">
								<DisplayPalabraClave
									palabra={game.randomWords[0]}
									currentText={currentText}
								/>
								<DisplayPalabraClave
									palabra={game.randomWords[1]}
									currentText={currentText}
								/>
								<DisplayPalabraClave
									palabra={game.randomWords[2]}
									currentText={currentText}
								/>
							</div>
						</div>
						)}
					</div>
					{/*3*/}
						
					{/*U*/}
						<div>
							<Image src = "/quick-game/desorden_total.png" width={350} height={350}/>
							{/*4*/}
							<div className="flex flex-row items-center">
								<Image
									className=""
									src="/quick-game/clock.png"
									width={30}
									height={30}
								/>
								<div>
									{parseInt(clock / 60)}min:{clock % 60}seg
								</div>
							</div>
							{/*4*/}
						</div>
					{/*U*/}

			</div>)}
			

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
/*
  FUNCIONES QUE SOLO EJECUTAN JS
*/

// te redirecciona a votación
async function submitParagraph(
	windowUser,
	roomID,
	currentText,
	turn,
	setTurn,
	punyetas,
	setCheckNextTurn,
	setDisableClick,
	router
) {
	setDisableClick("yes")
	const res = await addParagraph(
		windowUser,
		roomID,
		currentText,
		turn,
		punyetas
	);
	console.log("Mensaje Envío Parrafo: ", res);

	if (res.result != "success") {
		alert("Error al enviar parrafo");
		router.push("/quickGame");
	}

	
	setCheckNextTurn(true);
	setTurn(turn + 1);
}

// Añade un párrafo
async function addParagraph(windowUser, roomID, currentText, turn, punyetas) {
	const info = {
		username: windowUser.username,
		password: windowUser.password,
		id: "#" + roomID,
		body: currentText,
		turn: turn,
		punetas: punyetas,
	};
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(info),
	};

	console.log("ADD PARAGRAPH INFO: ", info);

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_URL}/api/quick_game/add_quick_game_paragraph`,
		options
	);
	const data = await res.json();
	return data;
}

// Abre o cierra el menú de la puñetas
// No hace falta una función para esto
function openClose(punyetasMenu, setPunyetasMenu, setPunyetaCarro) {
	if (punyetasMenu == "") {
		setPunyetasMenu("punyeta");
	} else {
		setPunyetasMenu("");
		setPunyetaCarro("");
	}
}

function chooseTarget(
	coins,
	setCoins,
	rivalName,
	punyetaCarro,
	setPunyetasMenu,
	punyetasCompradas,
	setPunyetasCompradas,
	rivals,
	setRivals
) {
	var precio;
	//Comprobamos precio de puñeta
	switch (punyetaCarro) {
		case "reves":
			precio = 150;
			break;
		case "ciego":
			precio = 300;
			break;
		default:
			precio = 500;
	}

	setPunyetasMenu("punyeta");

	const dupla = {
		puneta: punyetaCarro,
		username: rivalName,
	};

	if (coins - precio < 0) {
		alert("Monedas no suficientes");
		return;
	}

	setCoins(coins - precio);

	var pyt = punyetasCompradas;
	pyt.push(dupla);

	setPunyetasCompradas(pyt);
	setRivals(rivals.filter((rival) => rival.username != rivalName));

	return;
}

/*
  FUNCIONES QUE MUESTRAN HTML
*/
// Muesta una plabra clave?
function DisplayPalabraClave({ currentText, palabra }) {
	const style = currentText.includes(palabra)
		? "bg-green-800 text-white"
		: "bg-green-600";
	return (
		<div className={`${style} px-2 rounded-md text-center`}>{palabra}</div>
	);
}

// Muesta a quién va a dirigida la puñeta
function Rival({
	coins,
	setCoins,
	rivalName,
	picture,
	punyetaCarro,
	setPunyetasMenu,
	punyetasCompradas,
	setPunyetasCompradas,
	rivals,
	setRivals,
	disableClick
}) {
	return (
		<button
			type="button"
			className="bg-white flex flex-row space-x-2 p-2 rounded items-center"
			onClick={() =>
				chooseTarget(
					coins,
					setCoins,
					rivalName,
					punyetaCarro,
					setPunyetasMenu,
					punyetasCompradas,
					setPunyetasCompradas,
					rivals,
					setRivals
				)
			}
		>
			<Image src={`/profPic/icon${picture}.png`} width={50} height={50} />
			<div className="text-xl">{rivalName}</div>
		</button>
	);
}

// Devuelve un solo botón de las puñetas
function ButtonPunyeta({
	img,
	name,
	text,
	price,
	setPunyetasMenu,
	setPunyetaCarro,
}) {
	return (
		<button
			type="button"
			className="bg-white rounded flex flex-row justify-around items-center px-6"
			onClick={() => (setPunyetasMenu("objetivo"), setPunyetaCarro(name))}
		>
			<Image src={`/quick-game/${img}.png`} width={60} height={60} />
			<div className="flex flex-col py-1">
				<div>{text}</div>
				<div className="flex flex-row items-center justify-center">
					<div>{price}</div>
					<Image src={`/icons/mooncoin.png`} width={50} height={50} />
				</div>
			</div>
		</button>
	);
}
