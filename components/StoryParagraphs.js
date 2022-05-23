export default function StoryParagraphs({
	story,
	chosenStory,
	setChosenStory,
}) {
	return (
		<div className="flex flex-row flex-wrap w-full h-1/2 justify-center items-center space-x-5 overflow-y-scroll overflow-x-hidden">
			{story.paragraphs.map((paragraph, index) => (
				<Paragraph
					key={index}
					info={paragraph}
					chosen={chosenStory}
					index={index}
					stateFunc={setChosenStory}
				/>
			))}
		</div>
	);
}

function Paragraph({ info, chosen, index, stateFunc }) {
	const bgcolor =
		chosen == index ? "bg-verde_parrafo_seleccionado" : "bg-verde_parrafo";

	return (
		<div className="flex flex-col space-y-2">
			{info.username != undefined ? (
				<div className="flex flex-row space-x-1">
					<h1 className="text-left">Escrito por:</h1>
					<h1 className="text-left font-arial-b">{info.username}</h1>
				</div>
			) : (
				<></>
			)}

			<button
				className={`flex flex-row text-left items-center w-96 ${bgcolor} rounded-lg px-5 py-2 justify-between space-x-3 text-white font-arial-b`}
				onClick={() => stateFunc(index)}
			>
				{info.words ? (
					<SpecialText info={info} selected={chosen == index} />
				) : (
					<p>{info.text}</p>
				)}
			</button>
		</div>
	);
}

function SpecialText({ info, selected }) {
	var fullText = info.text;
	const txt_color = selected ? "" : "text-red-500";

	info.words.map((palabraClave) => {
		const textSplit = fullText.split(palabraClave);
		textSplit.map((trozo, index) => {
			if (index == 0) {
				fullText = trozo;
			} else {
				fullText += ";" + palabraClave + ";" + trozo;
			}
		});
	});

	return (
		<div className="flex flex-row flex-wrap space-x-2 w-full">
			{fullText.split(";").map((trozo, index) => (
				<>
					{index % 2 == 0 ? (
						<div key={index} className="text-white">
							{trozo}
						</div>
					) : (
						<div key={index} className={`${txt_color}`}>
							{trozo}
						</div>
					)}
				</>
			))}
		</div>
	);
}
