import { gamesList } from "../../../lib/GamesManager";

// Al ir a http://localhost:3000/api/quick_game/get_room te devuelve el siguiente json
export default async (req, res) => {
	res.status(200).json({
		result: "success",
		games: gamesList,
		total: gamesList.length,
	});
};
