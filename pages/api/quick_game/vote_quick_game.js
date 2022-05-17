import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { checkFields } from "../../../lib/checkFields";
import { findGame } from "../../../lib/Game";

export default async (req, res) => {
	const message = req.body;

	const fields = ["username", "password", "id","paragraph"];

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

            await game.vote(message.username,message.paragraph);

            if (game.voted == game.players.length) {
                await game.saveStory();
                game.nextTurn();
            }

            res.status(200).json({result: "success",});
			
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
