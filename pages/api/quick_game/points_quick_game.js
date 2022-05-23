import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { checkFields } from "../../../lib/checkFields";
import { findGame } from "../../../lib/Game";
import { state } from "../../../lib/GamesManager";

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
			await checkEmpty(message.id);
			const game = findGame(message.id);

			if (game == undefined) {
				res.status(200).json({
					result: "error",
					reason: "room_not_found",
				});
				return;
			}
			const result =
				game.state == state.END ? "success" : "waiting_players";

			if (result == "waiting_players") {
				res.status(200).json({
					result: result,
				});
				return;
			}

			const ranking = game.getRanking();
			const pl = game.players.find((p) => p.username == message.username);
			res.status(200).json({
				result: result,
				classification: ranking,
				coins: pl.scored,
			});
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
