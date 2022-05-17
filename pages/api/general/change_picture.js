import { updatePlayerDB } from "../../../prisma/queries/PUT/player";
import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import {checkFields} from "../../../lib/checkFields";

export default async (req, res) => {
	const message = req.body;
	
	const fields = ['username','password','newPicture'];

	const rest = checkFields(message,fields)
	if (rest.length != 0){
		const msg = "invalid credentials, expected: " + rest
		res.status(200).json({ result: "error", reason: msg });
		return;
	}

	const user = await selectPlayerDB(message.username);

	// checks if the requested user exists
	if (user != undefined) {
		// checks password
		if (user.password_hash == message.password) {
			//cambiar por password + anadir mecanismo hash
			user.image_ID = message.newPicture;
			await updatePlayerDB(user.username, user);
			res.status(200).json({ result: "success", reason: "" });
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
