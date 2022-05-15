import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { checkFields } from "../../../lib/checkFields";
import Paragraph from "../../../lib/Paragraph";
import { gamesList } from "../../../lib/GamesManager";

// Al ir a http://localhost:3000/api/add_quick_game_paragraph te devuelve el siguiente json
export default async (req, res) => {
	const message = req.body;

	const fields = [
		"username",
		"password",
		"id",
		"body",
		"turn",
		"punetas",
	];

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
			const paragraph = new Paragraph(
				message.username,
				message.turn,
				message.body
			);
			const game = gamesList.find((game) => game.room_id == message.id);

			if (game == undefined) {
				res.status(200).json({
					result: "error",
					reason: "room_not_found",
				});
				return;
			}

			const player = game.players.find(
				(p) => p.username == message.username
			);
			await game.addPunetas(message.username,message.punetas)
			game.addParagraph(player, paragraph);

			res.status(200).json({ result: "success" });
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
