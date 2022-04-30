import { addPlayerGame, createGame } from "../../../lib/Game";
import Player from "../../../lib/Player";
import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { checkFields } from "../../../lib/checkFields";
import { gamesList } from "../../../lib/GamesManager";

// Al ir a http://localhost:3000/api/quick_game/join_room te devuelve el siguiente json
export default async (req, res) => {
	const message = req.body;

	const fields = ["username", "password"];

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

			if (gamesList[0] == undefined) {
				res.status(200).json({
					result: "error",
					reason: "no_rooms_available",
				});
			} else {
				const id = gamesList[0].id;
				if (addPlayerGame(id, p)) {
					res.status(200).json({ result: "success", id: id });
				} else {
					res.status(200).json({
						result: "error",
						reason: "player_in_game",
					});
				}
			}
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
