import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "components/Layout";
import Spinner from "components/Spinner";

var sha512 = require(`sha512`);
var SecureRandom = require("securerandom");
import Meta from "components/Meta";

export default function Settings() {
	const [passwd, setPass] = useState("");
	const [passwdRep, setPassRep] = useState("");
	const [icon, setIcon] = useState("");
	const [deleteCheck, setDeleteCheck] = useState("");

	const router = useRouter();

	const [windowUser, setWindowUser] = useState({});

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
	}, []);

	// Si tadavía no hoy usuario, esperamos a que lo haya
	if (!windowUser) {
		return <Spinner showLayout={true} />;
	}

	const layoutInfo = {
		username: windowUser.username,
		stars: windowUser.stars,
		coins: windowUser.coins,
		image_ID: windowUser.picture,
	};

	return (
		<Layout data={layoutInfo} inSettingsScreen="true">
			<Meta title="Ajustes" />
			<div className="background">
				<div className="flex flex-col items-center justify-center w-full mt-24">
					<div className="flex flex-row items-center space-x-5">
						<img src="/icons/settings.png" width="36" height="36" />
						<div className="commonTitle">Ajustes</div>
					</div>

					<div className="flex flex-row items-center space-x-56 mt-20">
						<form className="flex flex-col space-y-8">
							<div className="flex flex-col space-y-2">
								<div className="commonTitle">Contraseña</div>
								<input
									className=" h-8 rounded-lg"
									type="password"
									value={passwd}
									placeholder=" **********"
									onChange={(e) => setPass(e.target.value)}
								/>
							</div>
							<div className="flex flex-col space-y-2">
								<div className="commonTitle">
									Repita la Contraseña
								</div>
								<input
									className=" h-8 rounded-lg"
									type="password"
									value={passwdRep}
									placeholder=" **********"
									onChange={(e) => setPassRep(e.target.value)}
								/>
							</div>
							<button
								className="commonButton bg-verde_top hover:bg-emerald-600"
								type="button"
								onClick={() =>
									changePassword(
										windowUser,
										passwd,
										passwdRep
									)
								}
							>
								Cambiar Contraseña
							</button>
						</form>

						<div className="flex flex-col space-y-8">
							<div className="flex flex-col items-center space-y-4">
								<div className="flex flex-row space-x-3">
									<ProfilePic
										iconId="0"
										path="/profPic/icon0.png"
										selectedIcon={icon}
										setIcon={setIcon}
									/>
									<ProfilePic
										iconId="1"
										path="/profPic/icon1.png"
										selectedIcon={icon}
										setIcon={setIcon}
									/>
									<ProfilePic
										iconId="2"
										path="/profPic/icon2.png"
										selectedIcon={icon}
										setIcon={setIcon}
									/>
									<ProfilePic
										iconId="3"
										path="/profPic/icon3.png"
										selectedIcon={icon}
										setIcon={setIcon}
									/>
								</div>

								<div className="flex flex-row space-x-3">
									<ProfilePic
										iconId="4"
										path="/profPic/icon4.png"
										selectedIcon={icon}
										setIcon={setIcon}
									/>
									<ProfilePic
										iconId="5"
										path="/profPic/icon5.png"
										selectedIcon={icon}
										setIcon={setIcon}
									/>
									<ProfilePic
										iconId="6"
										path="/profPic/icon6.png"
										selectedIcon={icon}
										setIcon={setIcon}
									/>
									<ProfilePic
										iconId="7"
										path="/profPic/icon7.png"
										selectedIcon={icon}
										setIcon={setIcon}
									/>
								</div>

								<div className="flex flex-row space-x-3">
									<ProfilePic
										iconId="8"
										path="/profPic/icon8.png"
										selectedIcon={icon}
										setIcon={setIcon}
									/>
									<ProfilePic
										iconId="9"
										path="/profPic/icon9.png"
										selectedIcon={icon}
										setIcon={setIcon}
									/>
								</div>
							</div>
							<button
								className="commonButton bg-amber-500 hover:bg-amber-700"
								type="button"
								onClick={() => changeIcon(windowUser, icon)}
							>
								Cambiar Icono
							</button>
							{deleteCheck == "" ? (
								<button
									className="commonButton bg-red-600 hover:bg-red-800"
									type="button"
									onClick={() =>
										deleteUser(
											windowUser,
											deleteCheck,
											setDeleteCheck
										)
									}
								>
									Eliminar Cuenta
								</button>
							) : (
								<button
									className="commonButton bg-red-600 hover:bg-red-800"
									type="button"
									onClick={() =>
										deleteUser(
											windowUser,
											deleteCheck,
											setDeleteCheck
										)
									}
								>
									Estoy seguro
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

function ProfilePic({ iconId, path, selectedIcon, setIcon }) {
	if (selectedIcon == iconId) {
		return (
			<div className="rounded-full h-12 w-12 ring ring-violet-800">
				<Image
					id={iconId}
					src={path}
					width="50"
					height="50"
					onClick={(e) => setIcon(e.target.id)}
				/>
			</div>
		);
	} else {
		return (
			<div className="hover:ring hover:ring-violet-300 rounded-full h-12 w-12">
				<Image
					id={iconId}
					src={path}
					width="50"
					height="50"
					onClick={(e) => setIcon(e.target.id)}
				/>
			</div>
		);
	}
}

async function changeIcon(user, icon) {
	if (icon != "") {
		const info = {
			username: user.username,
			password: user.password,
			newPicture: parseInt(icon),
		};

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(info),
		};

		const result = await fetch(
			`${process.env.NEXT_PUBLIC_URL}/api/general/change_picture`,
			options
		);
		const resultJson = await result.json();
		if (resultJson.result == "success") {
			localStorage.setItem("picture", parseInt(icon));
			window.location.reload();
		} else {
			alert("Icono no cambiado");
		}
	}
}

// cambiar alerts por algo mejor
async function changePassword(user, passwd, passwdRep) {
	if (passwd == "") {
		alert("Las contraseñas no puede estar vacía");
		return;
	}

	if (passwd != passwdRep) {
		alert("Las contraseñas no coinciden");
		return;
	}

	if (passwd.length < 1) {
		alert("Las contraseñas debe superar los 10 caracteres");
		return;
	}

	const salt = await getSalt(user);
	const passHash = sha512(passwd + salt);
	const newPasswd = passHash.toString("hex");

	const info = {
		username: user.username,
		password: user.password,
		newPassword: newPasswd,
	};

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(info),
	};

	const result = await fetch(
		`${process.env.NEXT_PUBLIC_URL}/api/general/change_password`,
		options
	);
	const resultJson = await result.json();

	if (resultJson.result == "success") {
		localStorage.setItem("password", newPasswd);
		window.location.reload();
	} else {
		alert("Conteseña no cambiada");
	}
}

async function deleteUser(user, deleteCheck, setDeleteCheck) {
	if (deleteCheck == "") {
		alert(
			"Seguro que quieres borrar la cuenta, esta acción no se puede deshacer"
		);
		setDeleteCheck("estoy seguro");
	} else {
		setDeleteCheck("");

		const info = {
			username: user.username,
			password: user.password,
		};

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(info),
		};

		const result = await fetch(
			`${process.env.NEXT_PUBLIC_URL}/api/general/delete_user`,
			options
		);
		const resultJson = await result.json();
		if (resultJson.result == "success") {
			window.location.reload();
		} else {
			alert("Cuenta no borrada");
		}
	}
}

const getSalt = async (name) => {
	const info = {
		username: name.username,
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
		`${process.env.NEXT_PUBLIC_URL}/api/general/get_salt`,
		options
	);
	const data = await res.json();
	return data.salt;
};
