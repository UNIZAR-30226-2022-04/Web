import { addPlayerGame, createGame, findGame } from "../../../lib/Game";
import Player from "../../../lib/Player";
import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { checkFields } from "../../../lib/checkFields";

// Al ir a http://localhost:3000/api/quick_game/play_quick_game te devuelve el siguiente json
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
			const result = (game.players.length == game.haveFinished ||
				game.turn == 0) ? "success" : "waiting_players";
			/*const result = (game.players.length == game.haveFinished ||
				game.turn == 0 || game.timeRemaining == 0) ? "success" : "waiting_players";

			if (game.players.length == game.haveFinished || game.turn == 0){
				startTurn(game.room_id);
			}*/

			res.status(200).json({
				result: result,
				s: game.maxTime,
				//s: game.timeRemaining,
				topic: game.topic,
				randomWords: game.randomWords,
				lastParagraph: "",
				isLast: game.turn == game.players.length - 1,
				puneta: "",
			});
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
