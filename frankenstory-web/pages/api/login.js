import { selectPlayerDB } from "../../prisma/queries/SELECT/player";

// Al ir a http://localhost:3000/api/login te devuelve el siguiente json
export default async (req, res) => {
	const message = req.body;
	
	const user = await selectPlayerDB(message.username);

	if (message.username.length==0||message.password.length==0){
		res.status(200).json({ result: "error", reason: "invalid credentials" });
	}

	// checks if the requested user exists
	if (user != undefined) {
		// checks password
		if (user.password_hash == message.password) {
			//cambiar por password + anadir mecanismo hash
			res.status(200).json({ result: "success", reason: "" });
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
	if (message.username.length==0||message.password.length==0){
		res.status(200).json({ result: "error", reason: "invalid credentials" });
	}

};
