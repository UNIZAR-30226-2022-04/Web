import Layout from "components/Layout";
import WriteStory from "components/WriteStory";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Meta from "components/Meta";

export default function Continue() {
	const router = useRouter();

	const [windowUser, setWindowUser] = useState({});
	const [creator, setCreator] = useState();

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
			const queryParams = new URLSearchParams(window.location.search);
			setCreator(queryParams.get("creator"));
		} else {
			router.push("/login");
		}
	}, []);

	const layoutInfo = {
		username: windowUser.username,
		stars: windowUser.stars,
		coins: windowUser.coins,
		image_ID: windowUser.picture,
	};

	return (
		<Layout data={layoutInfo}>
			<Meta title={"Relato de " + creator} />
			<WriteStory first={false}/>
		</Layout>
	);
}
