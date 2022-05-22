import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Meta from "components/Meta";

import Layout from "components/Layout";
import Rulette from "components/Rulette";
import Spinner from "components/Spinner";

export default function Friends() {
	const router = useRouter();
	const [windowUser, setWindowUser] = useState({});
	const [notification, setNotifications] = useState();
	const [friends, setFriends] = useState();

	const [name, setName] = useState("");
	const [found, setFound] = useState(false);

	const [mustReload, setMustReload] = useState(false);

	// Obtención de los datos almacenados localmente
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
			router.push("/");
		}
	}, [router]);

	useEffect(() => {
		setFound(false);
	}, [name]);

	// Llamadas a la API
	useEffect(() => {
		if (windowUser.username == undefined) {
			console.log("no permito sacar datos");
			return;
		}

		// Función que llama a la api
		const getData = async () => {
			const info = {
				username: windowUser.username,
				password: windowUser.password,
			};

			// Opciones para llamar a la api
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(info),
			};

			// Obtención de todos mis amigos
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/api/general/friends`,
				options
			);
			const data = await res.json();

			// Si no ha ido bien o no estoy logeado volvemos a /
			if (data.result === "error") {
				alert("Error en fetch de amigos");
				router.push("/");
				return;
			}

			setFriends(data.friends);
			setNotifications(data.notifications);
		};

		if (windowUser != undefined) {
			getData();
		}
	}, [windowUser, mustReload, router]);

	// Si tadavía no hoy usuario, esperamos a que lo haya
	if (!windowUser || !friends || !notification) {
		return <Spinner showLayout={true} />;
	}

	const layoutInfo = {
		username: windowUser.username,
		stars: windowUser.stars,
		coins: windowUser.coins,
		image_ID: windowUser.picture,
	};

	return (
		<Layout data={layoutInfo}>
			<Meta title="Amigos" />
			<div className="flex flex-row p-40 justify-center space-x-20">
				<div className="flex flex-col space-y-5">
					<div className="commonTitle">Tus amigos</div>
					<div className="scrollBox overflow-y-auto h-[600px]">
						<ul className="flex flex-col space-y-2 w-96">
							{friends.length === 0 && <p>No tienes amigos.</p>}
							{friends.map((friend, index) => (
								<Friend
									key={index}
									username={windowUser.username}
									password={windowUser.password}
									friend={friend}
									new_friend={false}
									setFound={setFound}
									reloaderState={mustReload}
									reloader={setMustReload}
								/>
							))}
						</ul>
					</div>
				</div>
				<div className="flex flex-col space-y-5">
					<div className="commonTitle">Peticiones</div>
					<div className="scrollBox">
						<ul className="flex flex-col space-y-2">
							{notification.length === 0 && (
								<p>
									No tienes notificaciones de amistad
									pendientes.
								</p>
							)}
							{notification.map((request, index) => (
								<FriendRequest
									key={index}
									username={windowUser.username}
									password={windowUser.password}
									friend={request.username}
									reloader={setMustReload}
									reloaderState={mustReload}
								/>
							))}
						</ul>
					</div>
				</div>
				<div className="flex flex-col space-y-5">
					<div className="commonTitle">Buscar amigos</div>
					<form
						onSubmit={(e) =>
							searchPerson(
								e,
								windowUser.username,
								windowUser.password,
								friends,
								name,
								setFound
							)
						}
					>
						<input
							className="relative p-2 w-full rounded-lg"
							value={name}
							type="text"
							placeholder="Introduce nombre"
							onChange={(e) => setName(e.target.value)}
						/>
					</form>
					{found ? (
						<Friend
							username={windowUser.username}
							password={windowUser.password}
							friend={name}
							new_friend={true}
							setFound={setFound}
							reloader={setMustReload}
							reloaderState={mustReload}
						/>
					) : (
						<></>
					)}
				</div>
			</div>
			<Rulette page="friends" />
		</Layout>
	);
}

function Friend({
	username,
	password,
	friend,
	setFound,
	new_friend,
	reloaderState,
	reloader,
}) {
	return (
		<div className="flex flex-row p-1 items-center justify-between px-2 bg-gris_claro rounded-md">
			<div className="text-xl text-gris font-arial-b">{friend}</div>

			<button
				onClick={() =>
					manageFriend(
						username,
						password,
						friend,
						new_friend,
						setFound,
						reloaderState,
						reloader
					)
				}
			>
				{new_friend ? (
					<Image
						src={"/friends/add_friend.png"}
						width={25}
						height={25}
						alt={"Add"}
					/>
				) : (
					<Image
						src={"/friends/delete_friend.png"}
						width={25}
						height={25}
						alt={"Delete"}
					/>
				)}
			</button>
		</div>
	);
}

function FriendRequest({
	username,
	password,
	friend,
	reloaderState,
	reloader,
}) {
	return (
		<div className="flex flex-row p-1 items-center justify-between px-2 bg-gris_claro">
			<div className="text-xl text-gris font-arial-b">{friend}</div>
			<div className="flex flex-row space-x-1">
				<button
					onClick={() =>
						manageRequest(
							username,
							password,
							friend,
							true,
							reloaderState,
							reloader
						)
					}
				>
					<Image
						src={"/friends/accept.png"}
						width={25}
						height={25}
						alt={"Accept"}
					/>
				</button>
				<button
					onClick={() =>
						manageRequest(
							username,
							password,
							friend,
							false,
							reloaderState,
							reloader
						)
					}
				>
					<Image
						src={"/friends/cancel.png"}
						width={25}
						height={25}
						alt={"Deny"}
					/>
				</button>
			</div>
		</div>
	);
}

async function manageRequest(
	username,
	password,
	friend,
	accept,
	reloaderState,
	reloader
) {
	var info = {
		username: username,
		password: password,
		targetUser: friend,
		answer: accept,
	};

	console.log(info);

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(info),
	};
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_URL}/api/general/answer_petition`,
		options
	);

	reloader(!reloaderState);
}

async function manageFriend(
	username,
	password,
	friend,
	new_friend,
	setFound,
	reloaderState,
	reloader
) {
	setFound(false);

	var info = {
		username: username,
		password: password,
		targetUser: friend,
		type: "add",
	};

	if (!new_friend) {
		info.type = "delete";
	}

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(info),
	};
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_URL}/api/general/manage_friendship`,
		options
	);

	reloader(!reloaderState);
}

// Busqueda de una persona en la BD
async function searchPerson(
	e,
	username,
	password,
	myFriends,
	friend,
	setFound,
	reloaderState,
	reloader
) {
	e.preventDefault();
	setFound(false);

	// No te puedes buscar a ti mismo
	if (username == friend) {
		return;
	}

	// No puedes añadir a alguien que ya es amigo
	if (myFriends.indexOf(friend) > -1) {
		return;
	}

	// Llamada a la BD
	const info = {
		username: username,
		password: password,
		searchedName: friend,
	};
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(info),
	};
	var res = await fetch(
		`${process.env.NEXT_PUBLIC_URL}/api/general/search_friends`,
		options
	);
	const data = await res.json();

	if (data.result == "success") {
		if (data.isFound) {
			setFound(true);
		} else {
			setFound(false);
		}
	} else {
		alert("Error en busqueda de usuario");
	}
}
