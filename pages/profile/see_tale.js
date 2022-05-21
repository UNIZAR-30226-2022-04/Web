import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";

import Layout from "components/Layout";
import Spinner from "components/Spinner";

export default function See_Tale() {
	const router = useRouter();
	const [windowUser, setWindowUser] = useState({});
	const [story, setStory] = useState({});
	var title;

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

	useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search);
		title = queryParams.get("title");
		const id = queryParams.get("id");
		const type = queryParams.get("type");

		const getData = async () => {
			const info = {
				username: localStorage.getItem("username"),
				password: localStorage.getItem("password"),
				id: parseInt(id),
				type: type,
			};
			var options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(info),
			};
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/api/general/watch_story`,
				options
			);
			const data = await res.json();

			if (data.result === "error") {
				localStorage.setItem("logged", "no");
				router.push("/login");
				return;
			}

			setStory(data);
		};
		getData();
	}, []);

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
		<Layout data={layoutInfo}>
			<div className="flex flex-col w-full items-center m-10 space-y-3">
				<div className="commonTitle">{title}</div>
				<div className="relative bg-scroll bg-contain overflow-auto text-center mx-32 h-auto text-xl font-arial-r">
					{story.body}
				</div>
				<Link href="/profile/saved_tales">
					<a>
						<div className="absolute left-5 bottom-5 commonButton bg-verde_letras">
							{"<-"} Volver a libreria
						</div>
					</a>
				</Link>
			</div>
		</Layout>
	);
}
