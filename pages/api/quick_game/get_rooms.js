import { gamesList } from "../../../lib/GamesManager";

export default async (req, res) => {
	res.status(200).json({
		result: "success",
		games: gamesList,
		total: gamesList.length,
	});
};
