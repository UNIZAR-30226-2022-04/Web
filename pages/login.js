import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

//import Lottie from 'react-lottie'
//import loginLottie from '/public/lottie/login.json'

var sha512 = require("sha512");

export default function Login() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	// Check de que el usuario no esté ya logueado
	useEffect(() => {
		if (localStorage.getItem("logged") == "si") {
			router.push("/profile");
		}
	}, [router]);

	return (
		<div className="background h-screen w-screen flex flex-col items-center justify-center">
			<Image
				src={"/frankenstory.png"}
				height={150}
				width={600}
				alt={"LOGO"}
			/>
			<div className="flex flex-row justify-center items-center">
				<form
					className="flex flex-col items-center justify-center"
					onSubmit={(e) => onSubmit(e, name, password, router)}
				>
					<h1 className="commonTitle font-arial-b">INICIAR SESIÓN</h1>
					<div className="w-96 flex flex-col space-y-2">
						<div>
							<div className="commonSubtitle">Usuario</div>
							<input
								className="w-full p-2 bg-white rounded-lg"
								maxLength={30}
								type="text"
								value={name}
								placeholder="Usuario"
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div>
							<div className="commonSubtitle">Contraseña</div>
							<input
								className="w-full p-2 bg-white rounded-lg"
								maxLength={30}
								type="password"
								value={password}
								placeholder="Contraseña"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<button
							className="commonButton bg-verde_top"
							type="submit"
						>
							Iniciar sesión
						</button>
					</div>
				</form>
			</div>
			<button
				className="commonButton bg-verde_top absolute bottom-0 right-0 m-10"
				onClick={() => router.push("/register")}
			>
				Crear Cuenta {"->"}
			</button>
		</div>
	);
}

const onSubmit = (e, name, password, router) => {
	var salt;
	var hash;
	e.preventDefault();
	if (name == "") {
		alert("Introduce un nombre de usuario");
	} else if (password == "") {
		alert("Introduce una contraseña");
	} else {
		getSalt(name).then((res) => {
			if (res.result == "success") {
				salt = res.salt;
				hash = sha512(password + salt);
				hash = hash.toString("hex");

				tryLogin(name, hash).then((res2) => {
					if (res2.result == "success") {
						localStorage.setItem("logged", "si");
						localStorage.setItem("username", name);
						localStorage.setItem("password", hash);

						router.push("/profile");
					} else {
						if (res2.reason == "user_not_found") {
							alert("Usuario desconocido");
						} else if (res2.reason == "wrong_password") {
							alert("Contraseña incorrecta");
						} else {
							alert("Error desconocido");
						}
					}
				});
			} else {
				alert("Error contraseña segura");
				return;
			}
		});
	}
};

const tryLogin = async (user, pass) => {
	const info = {
		username: user,
		password: pass,
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
		"https://frankenstory-mooncode.herokuapp.com/api/general/login",
		options
	);
	const data = await res.json();
	return data;
};

const getSalt = async (name) => {
	const info = {
		username: name,
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
		"https://frankenstory-mooncode.herokuapp.com/api/general/get_salt",
		options
	);
	return res.json();
};
