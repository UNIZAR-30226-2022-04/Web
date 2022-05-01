import { gamesList } from "./GamesManager";

export default class Game {
	constructor(id, host, time, isPrivate, mode, state) {
		this.id = id;
		this.host = host;
		this.time = time;
		this.isPrivate = isPrivate;
		this.mode = mode; //random / twitter
		this.state = state;
		this.players = [];
		this.addPlayer(host);
	}

	addPlayer(player) {
		this.players.push(player);
	}

	deletePlayer(player) {
		this.players.splice(this.players.indexOf(player));
		//this.players = this.players.filter((p) => (p = player));
	}
}

export function createGame(id, host, time, isPrivate, mode, state) {
	const game = gamesList.find((game) => game.host.username == host.username);
	if (game != undefined){
		gamesList.splice(gamesList.indexOf(game))
	}
	gamesList.push(new Game(id, host, time, isPrivate, mode, state));
	//console.log(gamesList); //debug
}

export function addPlayerGame(id, player) {
	const game = gamesList.find((game) => game.id == id);
	if (game != undefined) {
		const inGame = game.players.find((p) => p.username == player.username);
		if (inGame == undefined) {
			game.addPlayer(player);
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}
