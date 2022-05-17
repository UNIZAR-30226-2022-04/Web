import { updateParagraphDB } from "../../../prisma/queries/PUT/paragraph";
import { updateParticipantDB } from "../../../prisma/queries/PUT/participant";
import { selectParagraphsDB } from "../../../prisma/queries/SELECT/paragraphs";
import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { updateTaleDB } from "../../../prisma/queries/PUT/tale_mode";
import { selectTaleDB } from "../../../prisma/queries/SELECT/tale_mode";
import { selectParticipantsDB } from "../../../prisma/queries/SELECT/participants";
import {givePoints} from "../../../lib/givePoints";
import {checkFields} from "../../../lib/checkFields";

export default async (req, res) => {
	const message = req.body;
	
	const fields = ['username','password','id','indexParagraph'];

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
			const paragraphs = await selectParagraphsDB(message.id);
			const participants = await selectParticipantsDB(message.id);
			console.log(participants,'\n')
			const voted = participants.filter((p) => (p.voted != ''));
			const paraOwner = paragraphs[message.indexParagraph];
			paragraphs[message.indexParagraph].Score += 1

			await updateParticipantDB(message.username, message.id, paraOwner.username);

			await updateParagraphDB(message.id, message.indexParagraph);
			const tale = await selectTaleDB(message.id);
			await givePoints(paraOwner,tale.privacy);
			
			if (participants.length <= voted.length+1){
				tale.scored = true;
				await updateTaleDB(message.id,tale);
			}
			res.status(200).json({
				result: "success",
			});
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
