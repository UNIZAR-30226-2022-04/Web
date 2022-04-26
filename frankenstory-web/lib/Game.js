import { gamesList } from "./GamesManager";

export default class Game {
	constructor(id, host, time, isPrivate, mode) {
		this.id = id;
		this.host = host;
		this.time = time;
		this.isPrivate = isPrivate;
		this.mode = mode;
		this.players = [];
		this.addPlayer(host);
	}

	addPlayer(player) {
		this.players.push(player);
	}

	deletePlayer(player) {
		this.players = this.players.filter((p) => (p = player));
	}
}

export function createGame(id, host, time, isPrivate, mode) {
	gamesList.push(new Game(id, host, time, isPrivate, mode));
	console.log(gamesList); //debug
}

export function addPlayerGame(id, player) {
	gamesList.forEach((game) => {
		if (game.id == id) {
			if (!game.players.includes(player)) {
				game.addPlayer(player);
				return true;
			} else {
				return false;
			}
		}
	});
	return false;
}
