import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { checkFields } from "../../../lib/checkFields";
import { findGame } from "../../../lib/Game";
import { state } from "../../../lib/GamesManager";

export default async (req, res) => {
	const message = req.body;

	const fields = ["username", "password", "turn", "id"];

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
			const game = findGame(message.id);

			if (game == undefined) {
				res.status(200).json({
					result: "error",
					reason: "room_not_found",
				});
				return;
			}
			const result =
			(message.turn <= game.voteTurn && game.reviewing)
				? "success"
				: "waiting_players";

			if (result == "waiting_players"){
				res.status(200).json({
					result: result
				});
				return;
			}

			const paragraphs = game.getStoryRanking();

			const idx = game.getWinnerIndex();

			res.status(200).json({
				result: result,
				paragraphs: paragraphs,
				winner: idx,
				s: game.maxTime
			});
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
