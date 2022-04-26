import { createGame } from "../../../lib/Game";
import Player from "../../../lib/Player";
import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { checkFields } from "../../../lib/checkFields";

// Al ir a http://localhost:3000/api/quick_game/create_room te devuelve el siguiente json
export default async (req, res) => {
	const message = req.body;

	const fields = ["username", "password", "time", "isPrivate", "mode"];

	if (!checkFields(message, fields)) {
		res.status(200).json({
			result: "error",
			reason: "invalid credentials",
		});
		return;
	}

	const user = await selectPlayerDB(message.username);

	// checks if username exists
	if (user != undefined) {
		if (user.password_hash == message.password) {
			const p = new Player(
				message.username,
				message.password,
				user.image_ID,
				user.stars,
				user.mooncoins
			);

			var id =
				"#" +
				Date.now().toString(36).substr(12, 4) +
				Math.random().toString(36).substr(2, 5);
			createGame(id, p, message.time, message.isPrivate, message.mode);
			res.status(200).json({ result: "success", id: id });
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
