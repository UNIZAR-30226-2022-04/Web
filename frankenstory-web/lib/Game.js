import { gamesList } from "./GamesManager";
import { getTrends } from "./TrendsManager";
import { randomWordsList } from "./GamesManager";

export default class Game {
	constructor(
		room_id,
		host,
		time,
		isPrivate,
		mode,
		state,
		maxTime,
		topic,
		randomWords
	) {
		this.room_id = room_id;
		this.host = host;
		this.time = time;
		this.isPrivate = isPrivate;
		this.mode = mode; //random / twitter
		this.state = state;
		this.maxTime = maxTime;
		//this.timeRemaining = maxTime
		this.turn = 0;
		//this.haveFinished = 0;
		this.topic = topic;
		this.randomWords = randomWords;
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

	/*timer(time){
		setTimeout(saludos);
	}

	startGame(){
		this.state = state.INGAME;
		var myWorker = new Worker('gameWorker.js');
	}*/
}

export async function createGame(
	room_id,
	host,
	time,
	isPrivate,
	mode,
	state,
	maxTime
) {
	const game = gamesList.find((game) => game.host.username == host.username);
	if (game != undefined) {
		gamesList.splice(gamesList.indexOf(game));
	}
	const randomWords = [];
	const topics = [];

	if (mode == "random") {
		var random1 =
			randomWordsList[Math.floor(Math.random() * randomWordsList.length)];

		var random2 =
			randomWordsList[Math.floor(Math.random() * randomWordsList.length)];

		while (random2 == random1) {
			random2 =
				randomWordsList[
					Math.floor(Math.random() * randomWordsList.length)
				];
		}

		var random3 =
			randomWordsList[Math.floor(Math.random() * randomWordsList.length)];

		while (random3 == random1 || random3 == random2) {
			random3 =
				randomWordsList[
					Math.floor(Math.random() * randomWordsList.length)
				];
		}

		randomWords.push(random1);
		randomWords.push(random2);
		randomWords.push(random3);
	} else if (mode == "twitter") {
		const query = await getTrends();
		const trends = query[0].trends;
		trends.forEach((trend) => {
			topics.push(trend.name);
		});
		var topic = topics[Math.floor(Math.random() * topics.length)];
	}

	gamesList.push(
		new Game(
			room_id,
			host,
			time,
			isPrivate,
			mode,
			state,
			maxTime,
			topic,
			randomWords
		)
	);
}

export function addPlayerGame(room_id, player) {
	const game = gamesList.find((game) => game.room_id == room_id);
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

export function findGame(room_id) {
	const game = gamesList.find((game) => game.room_id == room_id);
	return game;
}
