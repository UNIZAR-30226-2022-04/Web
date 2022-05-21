import { addPlayerGame, checkEmpty, findGame } from "../../../lib/Game";
import Player from "../../../lib/Player";
import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { checkFields } from "../../../lib/checkFields";
import { gamesList } from "../../../lib/GamesManager";
import { MAX_AMOUNT_PLAYERS } from "../../../lib/GamesManager";

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
			if (gamesList.length == 0) {
				res.status(200).json({
					result: "error",
					reason: "no_rooms_available",
				});
			} else {
				const p = new Player(
					message.username,
					message.password,
					user.image_ID,
					user.stars,
					user.mooncoins
				);
				var oldGame = gamesList.find(
					(game) =>
						game.players.find((player) => player.username == p.username) !=
						undefined
				);
				if (oldGame != undefined) {
					await checkEmpty(oldGame.room_id);
					oldGame = findGame(oldGame.room_id);
				}
				if (oldGame != undefined){
					res.status(200).json({
						result: "success",
						id: oldGame.room_id,
					});
					return
				}
				var found = false;
				var game;
				for (var i = 0; found == false && i < gamesList.length; i++) {
					game = gamesList[i];
					if (game.players.lenght >= MAX_AMOUNT_PLAYERS) {
					} else if (addPlayerGame(game.room_id, p)) {
						found = true;
					}
				}
				if (found) {
					res.status(200).json({
						result: "success",
						id: game.room_id,
					});
				} else {
					res.status(200).json({
						result: "error",
						reason: "no_rooms_available",
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
