import { selectPlayerDB } from "../../prisma/queries/SELECT/player";
import { createFriendshipDB } from "../../prisma/queries/CREATE/friendship";
import { deletePetitionDB } from "../../prisma/queries/DELETE/petition";

// Al ir a http://localhost:3000/api/answer_petition te devuelve el siguiente json
export default async (req, res) => {
	const message = req.body;

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
