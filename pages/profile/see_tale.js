import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";

import Layout from "components/Layout";
import Spinner from "components/Spinner";
import Meta from "components/Meta";

export default function See_Tale() {
	const router = useRouter();
	const [windowUser, setWindowUser] = useState({});
	const [story, setStory] = useState({});

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
		const queryParams = new URLSearchParams(window.location.search);
		const title = queryParams.get("title");
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
				router.push("/");
				return;
			}

			data.title = title;
			data.id = id;
			data.type = type;

			setStory(data);
			console.log(title);
		};
		getData();
	}, []);

	// Si tadavía no hoy usuario, esperamos a que lo haya
	if (!windowUser || !story) {
		return <Spinner showLayout={true} />;
	}

	const layoutInfo = {
		username: windowUser.username,
		stars: windowUser.stars,
		coins: windowUser.coins,
		image_ID: windowUser.picture,
	};

	console.log(story);

	return (
		<Layout data={layoutInfo}>
			<Meta title={story.title} />
			<div className="flex flex-col w-full items-center m-10 space-y-3">
				<div className="commonTitle">{story.title}</div>
				<div className="relative bg-scroll bg-contain overflow-auto text-center mx-32 h-auto text-xl font-arial-r bg-slate-100 p-2 rounded-xl">
					{story.body}
				</div>
				<Link href="/profile/saved_tales">
					<a>
						<div className="relative mt-12 commonButton bg-red-500 hover:bg-red-700">
							VOLVER
						</div>
					</a>
				</Link>
			</div>
		</Layout>
	);
}
