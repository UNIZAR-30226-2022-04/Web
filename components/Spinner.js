import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Layout from "./Layout";
import Meta from "./Meta";

export default function Spinner({ showLayout }) {
	const [windowUser, setWindowUser] = useState({});
	const router = useRouter();

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

	const layoutInfo = {
		username: windowUser.username,
		stars: windowUser.stars,
		coins: windowUser.coins,
		image_ID: windowUser.picture
	};

	return (
		<>
			{showLayout === true ? (
				<Layout
					data={layoutInfo}
					inSettingsScreen={false}
					inGame={true}
				>
					<div className="flex flex-col w-screen h-screen items-center justify-center align-middle">
						<Image
							src="/mooncodeLoading.gif"
							width={500}
							height={500}
							alt={"Cargando..."}
						/>
					</div>
				</Layout>
			) : (
				<div className="background flex flex-col w-screen h-screen items-center justify-center align-middle">
					<Image
						src="/mooncodeLoading.gif"
						width={500}
						height={500}
						alt={"Cargando..."}
					/>
				</div>
			)}
		</>
	);
}
