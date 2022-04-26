import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { selectTaleDB } from "../../../prisma/queries/SELECT/tale_mode";
import { selectParagraphsDB } from "../../../prisma/queries/SELECT/paragraphs";
import { selectFriendnames } from "../../../lib/Friendships";
import {checkFields} from "../../../lib/checkFields";

// Al ir a http://localhost:3000/api/resume_tale te devuelve el siguiente json
export default async (req, res) => {
	const message = req.body;
	
	const fields = ['username','password','id'];

	if (!checkFields(message,fields)){
		res.status(200).json({ result: "error", reason: "invalid credentials" });
		return;
	}

	const user = await selectPlayerDB(message.username);

	// checks if the requested user exists
	if (user != undefined) {
		// checks password
		if (user.password_hash == message.password) {
			//cambiar por password + anadir mecanismo hash
			const tale = await selectTaleDB(message.id);

			if (tale != undefined) {
				const paragraphs = await selectParagraphsDB(message.id);

				let friendnames = await selectFriendnames(message.username);
				/*const canEdit =
					(friendnames.indexOf(paragraphs[0].username) != -1 ||
						friendnames.indexOf(paragraphs[0].username) ==
							message.username ||
						tale.privacy == 0) &&
					tale.max_turns > paragraphs.length &&
					friendnames.indexOf(
						paragraphs[paragraphs.length - 1].username
					) != message.username;

				if (canEdit) {*/
					res.status(200).json({
						result: "success",
						title: tale.title,
						reason: "",
						paragraphs: paragraphs,
						maxCharacters: tale.max_paragraph_chars,
					});/*
				} else {
					res.status(200).json({
						result: "error",
						reason: "cannot_access_tale",
					});
				}*/
			} else {
				res.status(200).json({
					result: "error",
					reason: "tale_doesnot_exist",
				});
			}
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
	if (message.username.length == 0 || message.password.length == 0) {
		res.status(200).json({
			result: "error",
			reason: "invalid credentials",
		});
	}
	//console.log("Username:", message.username);
	//console.log("Password:", message.password);
};
