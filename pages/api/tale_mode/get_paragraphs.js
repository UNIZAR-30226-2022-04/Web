import { selectParagraphsDB } from "../../../prisma/queries/SELECT/paragraphs";
import { selectTaleDB } from "../../../prisma/queries/SELECT/tale_mode";
import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import {checkFields} from "../../../lib/checkFields";

// Al ir a http://localhost:3000/api/get_paragraphs te devuelve el siguiente json
export default async (req, res) => {
	const message = req.body;
	
	const fields = ['username','password','id'];

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
			const tale = await selectTaleDB(message.id);
			const paragraphs = await selectParagraphsDB(message.id);

			res.status(200).json({
				result: "success",
				title: tale.title,
				paragraphs: paragraphs,
			});
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
