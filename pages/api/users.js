import { selectPlayersDB } from "../../prisma/queries/SELECT/players";

export default async (req, res) => {
	const players = await selectPlayersDB();
	res.status(200).json({players: players});
};
