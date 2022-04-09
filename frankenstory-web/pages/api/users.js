import { selectPlayersDB } from "../../prisma/queries/SELECT/players";

// Al ir a http://localhost:3000/api/users te devuelve el siguiente json
export default async (req, res) => {
	const players = await selectPlayersDB();
	res.status(200).json(players);
};
