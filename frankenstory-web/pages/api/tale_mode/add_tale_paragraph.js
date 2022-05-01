import { createParagraphDB } from "../../../prisma/queries/CREATE/paragraph";
import { createParticipantDB } from "../../../prisma/queries/CREATE/participant";
import { updateTaleDB } from "../../../prisma/queries/PUT/tale_mode";
import { selectParticipantDB } from "../../../prisma/queries/SELECT/participant";
import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { selectTaleDB } from "../../../prisma/queries/SELECT/tale_mode";
import {checkFields} from "../../../lib/checkFields";

// Al ir a http://localhost:3000/api/add_tale_paragraph te devuelve el siguiente json
export default async (req, res) => {
	const message = req.body;
	
	const fields = ['username','password','id','body','isLast'];

	if (!checkFields(message,fields)){
		res.status(200).json({ result: "error", reason: "invalid credentials" });
		return;
	}

	const user = await selectPlayerDB(message.username);

	// checks if username exists
	if (user != undefined) {
		if (user.password_hash == message.password) {
			const tale = await selectTaleDB(message.id);

			const participant = await selectParticipantDB(
				message.username,
				message.id
			);

			if (
				participant[0] == undefined ||
				participant[0].username == undefined
			) {
				const dataParticipant = {
					username: message.username,
					story_id: message.id,
					creator: false,
					voted: "",
				};
				await createParticipantDB(dataParticipant);
			}

			const dataParagraph = {
				text: message.body,
				username: message.username,
				story_id: message.id,
				turn_number: tale.turn + 1,
			};

			await createParagraphDB(dataParagraph);
			const noVoting = tale.turn==0
			if (message.isLast) {
				const dataTale = {
					story_id: tale.story_id,
					max_turns: tale.maxTurns,
					turn: tale.turn + 1,
					max_paragraph_chars: tale.maxCharacters,
					privacy: tale.privacy,
					title: tale.title,
					finished: true,
					scored: noVoting
				};
				await updateTaleDB(message.id, dataTale);
			} else {
				const dataTale = {
					story_id: tale.story_id,
					max_turns: tale.maxTurns,
					turn: tale.turn + 1,
					max_paragraph_chars: tale.maxCharacters,
					privacy: tale.privacy,
					title: tale.title,
					finished: false,
				};
				await updateTaleDB(message.id, dataTale);
			}

			res.status(200).json({ result: "success", reason: "" });
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
