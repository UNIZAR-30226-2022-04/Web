import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const QuickVote = ({ user }) => {
	const router = useRouter();
	const [vote, setVote] = useState(-1);
	const [story, setStory] = useState({ title: "", paragraphs: [] });
	const [creator, setCreator] = useState("");
	const queryParams = new URLSearchParams(window.location.search);

	useEffect(() => {
		setCreator(queryParams.get("creator"));
		const getStory = async () => {
			// Opciones para llamar a la api
			const body = {
				username: user.username,
				password: user.password,
				id: parseInt(queryParams.get("id")),
			};
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			};

			// Llamada a la api
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/api/tale_mode/get_paragraphs`,
				options
			);
			var data = await res.json();

			// Si no ha ido bien o no estoy logeado volvemos a /
			if (data.result === "error") {
				router.push("/");
				return;
			}
			// Llama al hook que almacena la información del usuario
			setStory(data);
		};
		getStory();
	}, []);

	function Paragraph({ body, words, turn }) {
		const voteParagraph = (e) => {
			e.preventDefault();
			if (user != localStorage.getItem("username")) {
				setVote(turn);
			} else {
				alert("No te puedes votar a ti mismo Jaime");
			}
		};
		/**/
		return (
			<div className="mb-2 w-full">
				<input
					className={`rounded-xl ${
						vote == turn ? `bg-green-600` : `bg-green-800`
					}`}
					type="button"
					onClick={voteParagraph}
					value={body}
				/>
				{vote == turn ? (
					<Image src="/icons/crown.png" width={20} height={20} />
				) : (
					""
				)}
			</div>
		);
	}

	const trySend = async () => {
		const body = {
			username: user.username,
			password: user.password,
			id: parseInt(queryParams.get("id")),
			paragraph: vote,
		};
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		};

		// Llamada a la api
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_URL}/api/tale_mode/get_paragraphs`,
			options
		);
		console.log(res);
		return res.json();
	};

	const sendVote = (e) => {
		e.preventDefault();
		trySend().then((res) => {
			if (res.result != "success") {
				alert("Error al enviar voto");
			}
			router.push("/quickGame");
		});
	};

	return (
		<div className="friendsBox w-2/3">
			<div className="centered">Votaciones</div>
			<div className="centered">Elige el párrafo que más te guste</div>
			<div className="centered">Historia de {creator}</div>
			<div className="centered">Titulo:{story.title}</div>
			<div className="scrollBox h-auto text-center">
				<ul>
					{story.paragraphs.map((paragraph, num, index) => (
						<Paragraph
							key={index}
							body={paragraph.text}
							words={paragraph.words}
							turn={num}
						/>
					))}
				</ul>
			</div>
			<input
				className="clickableItem bg-green-800 rounded-xl"
				type="button"
				onClick={sendVote}
				value="Enviar voto"
			/>
		</div>
	);
};

export default QuickVote;
