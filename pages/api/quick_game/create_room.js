import { createGame, checkEmpty } from "../../../lib/Game";
import Player from "../../../lib/Player";
import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { checkFields } from "../../../lib/checkFields";
import { state, gamesList } from "../../../lib/GamesManager";

export default async (req, res) => {
	const message = req.body;

	console.log(req.body)

	const fields = ["username", "password", "time", "isPrivate", "mode"];

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
			const p = new Player(
				message.username,
				message.password,
				user.image_ID,
				user.stars,
				user.mooncoins
			);
			const oldGame = gamesList.find(
				(game) =>
					game.players.find((player) => player.username == p.username) !=
					undefined
			);
			if (oldGame!=undefined) checkEmpty(oldGame.room_id);
			var id =
				"#" +
				Date.now().toString(36).substr(12, 4) +
				Math.random().toString(36).substr(2, 5);
			if (
				(await createGame(
					id,
					p,
					message.time,
					message.isPrivate,
					message.mode,
					state.LOBBY,
					message.time
				)) == true
			) {
				
				res.status(200).json({ result: "success", id: id });
			} else {
				res.status(200).json({
					result: "error",
					reason: "player_in_game",
				});
			}
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
