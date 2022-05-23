import { addPlayerGame, findGame, checkEmpty } from "../../../lib/Game";
import Player from "../../../lib/Player";
import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { checkFields } from "../../../lib/checkFields";
import { MAX_AMOUNT_PLAYERS } from "../../../lib/GamesManager";
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
			const p = new Player(
				message.username,
				message.password,
				user.image_ID,
				user.stars,
				user.mooncoins
			);

			await checkEmpty(message.id);

			const game = findGame(message.id);
			if (game == undefined) {
				res.status(200).json({
					result: "error",
					reason: "room_not_found",
				});
				return;
			} else if (game.players.length >= MAX_AMOUNT_PLAYERS) {
				res.status(200).json({
					result: "error",
					reason: "game_full",
				});
			} else if (addPlayerGame(message.id, p)) {
				res.status(200).json({ result: "success" });
			} else if (game.state != state.LOBBY) {
				res.status(200).json({
					result: "error",
					reason: "game_started",
				});
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
