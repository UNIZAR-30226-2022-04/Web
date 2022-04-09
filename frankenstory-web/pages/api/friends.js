import { selectPlayerDB } from "../../prisma/queries/SELECT/player";
import { selectPetitionsDB } from "../../prisma/queries/SELECT/petitions";
import {selectFriendnames} from "../../lib/Friendships";

// Al ir a http://localhost:3000/api/friends te devuelve el siguiente json
export default async (req, res) => {
	const message = req.body;

	// searches for the user in the DB
	const user = await selectPlayerDB(message.username);

	// looks for friends
	//const friends = [users[0].username, users[1].username]; // sustituir por inferior cuando se puedan hacer amistades
	const friends = await selectFriendnames(message.username); // friends of the user

	// checks notifications
	//const notifications = [users[2].username, users[3].username]; // sustituir por inferior cuando se puedan mandar notificaciones
	const notifications = await selectPetitionsDB(message.username); // pending users
	// checks the autenticity
	if (user != undefined) {
		if (user.password_hash == message.password) {
			//cambiar por password + anadir mecanismo hash
			res.status(200).json({
				result: "success",
				friends,
				notifications,
				reason: "",
			});
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" }); //wrong_validation?
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" }); //wrong_validation y unificar ifs?
	}
};
