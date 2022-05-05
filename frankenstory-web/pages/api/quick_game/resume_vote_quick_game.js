import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { checkFields } from "../../../lib/checkFields";
import { findGame } from "../../../lib/Game";

// Al ir a http://localhost:3000/api/quick_game/get_room te devuelve el siguiente json
export default async (req, res) => {
	const message = req.body;

	const fields = ["username", "password", "id"];

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
			const game = findGame(message.id);

			if (game == undefined) {
				res.status(200).json({
					result: "error",
					reason: "room_not_found",
				});
				return;
			}
			const result = game.state == 0 ? "waiting_players" : "success";
			const paragraphs = [];
			game.paragraphs.forEach((paragraph) => {
				var paraInfo;
				paraInfo.body = paragraph.body;
				paraInfo.randomWords = game.randomWords;
				paragraphs.push(paragraph);
			});

			res.status(200).json({
				result: result,
				topic: game.topic,
				paragraphs: paragraphs,
			});
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
