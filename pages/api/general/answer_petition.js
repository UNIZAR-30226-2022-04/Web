import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { createFriendshipDB } from "../../../prisma/queries/CREATE/friendship";
import { deletePetitionDB } from "../../../prisma/queries/DELETE/petition";
import {checkFields} from "../../../lib/checkFields";

export default async (req, res) => {
	const message = req.body;
	
	const fields = ['username','password','targetUser','answer'];

	const rest = checkFields(message,fields)
	if (rest.length != 0){
		const msg = "invalid credentials, expected: " + rest
		res.status(200).json({ result: "error", reason: msg });
		return;
	}

	const user = await selectPlayerDB(message.username);

	// checks the autenticity
	if (user != undefined) {
		if (user.password_hash == message.password) {
			//cambiar por password + anadir mecanismo hash

			const targetUser = await selectPlayerDB(message.targetUser);
			
			if (targetUser != undefined) {
				if (message.answer == 1) {
					await createFriendshipDB(
						message.username,
						message.targetUser
					);
				}
				await deletePetitionDB(message.targetUser, message.username);
			}
			res.status(200).json({ result: "success", reason: "" });
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
