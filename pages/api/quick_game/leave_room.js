import { addPlayerGame, createGame } from "../../../lib/Game";
import Player from "../../../lib/Player";
import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { checkFields } from "../../../lib/checkFields";
import { gamesList } from "../../../lib/GamesManager";
import { MAX_AMOUNT_PLAYERS } from "../../../lib/GamesManager";
import { state } from "../../../lib/GamesManager";

// Al ir a http://localhost:3000/api/quick_game/leave_room te devuelve el siguiente json
export default async (req, res) => {
	const message = req.body;

	const fields = ["username", "password"];

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
			const game = gamesList.find(
				(game) =>
					game.players.find(
						(player) => player.username == player.username
					) != undefined
			);

			if (game == undefined) {
				res.status(200).json({
					result: "error",
					reason: "room_not_found",
				});
				return;
			}

			const index = game.players.indexOf(
				game.players.find(
					(player) => player.username == player.username
				)
			);
			game.players.splice(index);
			if (game.players.length == 0) {
				const gameIndex = gamesList.indexOf(game);
				gamesList.splice(gameIndex);
			}
			res.status(200).json({ result: "success" });
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
