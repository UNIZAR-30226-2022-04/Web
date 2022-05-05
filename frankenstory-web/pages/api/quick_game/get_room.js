import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { checkFields } from "../../../lib/checkFields";
import { gamesList } from "../../../lib/GamesManager";

// Al ir a http://localhost:3000/api/quick_game/get_room te devuelve el siguiente json
export default async (req, res) => {
	const message = req.body;

	const fields = ["username", "password", "id"];

	const rest = checkFields(message, fields);
	if (rest.length != 0) {
		const msg = "invalid credentials, expected: " + rest;
		res.status(200).json({ result: "error", reason: msg });
		return;
	}

	const user = await selectPlayerDB(message.username);

	// checks if username exists
	if (user != undefined) {
		if (user.password_hash == message.password) {
			var found = false;
			gamesList.forEach((game) => {
				if (game.room_id == message.id) {
					const participants = game.players;
					participants.forEach((participant) => {
						delete participant.password;
						delete participant.mooncoins;
					});
					const mode = game.mode;
					const hasStarted = game.hasStarted;
					res.status(200).json({
						result: "success",
						mode: mode,
						participants: participants,
						hasStarted: hasStarted,
					});
					found = true;
					return;
				}
			});
			if (!found) {
				res.status(200).json({
					result: "error",
					reason: "room_not_found",
				});
			}
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
