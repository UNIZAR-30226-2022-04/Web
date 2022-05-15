import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { checkFields } from "../../../lib/checkFields";
import { selectParagraphsDB } from "../../../prisma/queries/SELECT/paragraphs";

// Al ir a http://localhost:3000/api/watch_story te devuelve el siguiente json
export default async (req, res) => {
	const message = req.body;

	const fields = ["username", "password", "id", "type"];

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
			var body = "";
			const query = await selectParagraphsDB(message.id);

			query.forEach((paragraph) => {
				body += paragraph.text;
				body += "\n";
			});

			res.status(200).json({
				result: "success",
				body: body,
			});
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
