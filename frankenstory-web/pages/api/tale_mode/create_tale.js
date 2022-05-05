import { createParagraphDB } from "../../../prisma/queries/CREATE/paragraph";
import { createParticipantDB } from "../../../prisma/queries/CREATE/participant";
import { createStoryDB } from "../../../prisma/queries/CREATE/story";
import { createTaleDB } from "../../../prisma/queries/CREATE/tale_mode";
import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import {checkFields} from "../../../lib/checkFields";

// Al ir a http://localhost:3000/api/create_tale te devuelve el siguiente json
export default async (req, res) => {
	const message = req.body;
	
	const fields = ['username','password','title','maxTurns','maxCharacters','privacy','first_paragraph'];

	const rest = checkFields(message,fields)
	if (rest.length != 0){
		const msg = "invalid credentials, expected: " + rest
		res.status(200).json({ result: "error", reason: msg });
		return;
	}

	const user = await selectPlayerDB(message.username);

	// checks if username exists
	if (user != undefined) {
		if (user.password_hash == message.password) {
			const story = await createStoryDB();

			const dataTale = {
				story_id: story.story_id,
				max_turns: message.maxTurns,
				max_paragraph_chars: message.maxCharacters,
				privacy: message.privacy,
				title: message.title,
			};
			await createTaleDB(dataTale);

			const dataParagraph = {
				text: message.first_paragraph,
				username: message.username,
				story_id: story.story_id,
			};
			await createParagraphDB(dataParagraph);

			const dataParticipant = {
				username: message.username,
				story_id: story.story_id,
				creator: true,
				voted: "",
			};
			await createParticipantDB(dataParticipant);

			res.status(200).json({ result: "success", reason: "" });
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
