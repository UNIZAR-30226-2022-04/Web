import { gamesList } from "./GamesManager";
import { getTrends } from "./TrendsManager";
import { selectPlayerDB } from "../prisma/queries/SELECT/player";
import { createStoryDB } from "../prisma/queries/CREATE/story";
import { createQuickGameDB } from "../prisma/queries/CREATE/quick_game";
import { createParagraphDB } from "../prisma/queries/CREATE/paragraph";
import { createParticipantDB } from "../prisma/queries/CREATE/participant";
import { updatePlayerDB } from "../prisma/queries/PUT/player";
import { randomWordsList } from "./GamesManager";
import { POINTS_QK_PRIVATE } from "./GamesManager";
import { POINTS_QK_PUBLIC } from "./GamesManager";
import { REVES_PRICE } from "./GamesManager";
import { CIEGO_PRICE } from "./GamesManager";
import { DESORDEN_PRICE } from "./GamesManager";
import { END_MARGIN } from "./GamesManager";
import { BEGIN_MARGIN } from "./GamesManager";
import { REVIEW_TIME } from "./GamesManager";
import { POINTS_TIME } from "./GamesManager";
import { state } from "./GamesManager";
import Paragraph from "./Paragraph";

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
		this.maxTime = maxTime*1000;
		this.initialTime = 0;
		this.turn = 0;
		this.paragraphs = 0;
		this.voteTurn = 0;
		this.voted = 0;
		this.reviewing = false;
		this.topic = topic;
		this.randomWords = randomWords;
		this.players = [];
		this.addPlayer(host);
	}

	getRemainingTime(){
		const t = Math.ceil((this.maxTime-(Date.now()-this.initialTime))/1000);
		if (t>this.maxTime/1000) return this.maxTime/1000;
		return ( t >= 0 ? t : 0);
	}

	addPlayer(player) {

		this.players.push(player);
	}

	deletePlayer(player) {
		const pl = this.players.find((p) => p.username == player);
		this.players.splice(this.players.indexOf(pl));
		//this.players = this.players.filter((p) => (p = player));
	}

	async addPunetas(senderUsername,punetas){
		var spent = 0;
		punetas.forEach((pun) => {
			const pl = this.players.find((p) => p.username == pun.username);
			var cost = REVES_PRICE;
			if (pun.puneta=="ciego") cost = CIEGO_PRICE;
			else if (pun.puneta=="desorden") cost = DESORDEN_PRICE;
			if (pl.punetaCost<cost) {
				spent+=cost-pl.punetaCost;
				pl.nextPuneta = pun.puneta;
			}
		});
		const sender = await selectPlayerDB(senderUsername);
		sender.mooncoins = sender.mooncoins-spent;
		await updatePlayerDB(sender.username, sender);
	}

	getPuneta(username) {
		const pl = this.players.find((p) => p.username == username);
		//console.log(this);
		if (pl != undefined && this.turn != 1) {
			return this.players[this.players.indexOf(pl)].puneta;
		}
	}

	getLastParagraph(username) {
		const pl = this.players.find((p) => p.username == username);
		//console.log(this);
		if (pl != undefined && this.turn != 1) {
			var a = this.turn / 2;
			var s = 1;
			if (this.turn % 2 != 0) {
				a = (this.turn - 1) / 2;
				s = -1;
			}
			const myIndex = this.players.indexOf(pl);
			const plIndex =
				(a * (this.players.length + s) + myIndex) % this.players.length;
			const parag = this.players[plIndex].paragraphs;
			//console.log(myIndex);
			//console.log(plIndex);
			//console.log(parag);
			//console.log(parag[parag.length - 1]);
			//console.log(parag[parag.length - 1].body);
			return parag[parag.length - 1].body;
		} else return "";
	}

	addParagraph(player, paragraph) {
		var a = this.turn / 2;
		var s = 1;
		if (this.turn % 2 != 0) {
			a = (this.turn - 1) / 2;
			s = -1;
		}
		const myIndex = this.players.indexOf(player);
		this.players[myIndex].wrote = true;
		const plIndex =
			(a * (this.players.length + s) + myIndex) % this.players.length;

		this.paragraphs++;
		this.players[plIndex].addPlayerParagraph(paragraph);
		if (this.paragraphs == this.players.length) this.nextTurn();
	}

	async vote(username,paragraph){
		const pl = this.players.find((p) => p.username == username);
		const par = this.players[this.voteTurn-1].paragraphs[paragraph]
		pl.votedTo = par.creator;
		par.score++;
		const receiver = await selectPlayerDB(par.creator);

		const rec = this.players.find((p) => p.username == par.creator);

		if (this.isPrivate) {
			receiver.mooncoins = receiver.mooncoins+POINTS_QK_PRIVATE;
			rec.scored += POINTS_QK_PRIVATE;
		}
		else {
			receiver.mooncoins = receiver.mooncoins+POINTS_QK_PUBLIC;
			rec.scored += POINTS_QK_PUBLIC;
		}
		await updatePlayerDB(receiver.username, receiver);

		this.voted++;
	}

	async saveStory(){
		const story = await createStoryDB();

		const dataQuick = {
			story_id: story.story_id,
			mode: (this.mode == "random" ? 0 : 1)
		}
		await createQuickGameDB(dataQuick);

		const par = this.players[this.voteTurn-1].paragraphs;
		for (var i = 0; i<par.length;i++){
			const dataParagraph = {
				text: par[i].body,
				username: par[i].creator,
				Score: par[i].score,
				turn_number: i,
				story_id: story.story_id,
			};
			await createParagraphDB(dataParagraph);
			const pl = this.players.find((p) => p.username == par[i].creator);
			const dataParticipant = {
				username: par[i].creator,
				story_id: story.story_id,
				creator: i==0,
				voted: pl.votedTo,
			};
			await createParticipantDB(dataParticipant);
		}
	}

	getStoryRanking(){
		var resul = [];
		this.players[this.voteTurn-2].paragraphs.forEach((p) =>{
			const aux = {
				body: p.body,
				username: p.creator
			}
			resul.push(aux);
		});
		return resul
	}

	getWinnerIndex(){
		var resul = 0;
		var max = 0;
		var i = 0;
		this.players[this.voteTurn-2].paragraphs.forEach((p) =>{
			if (p.score>max){
				max = p.score;
				resul = i;
			}
			i++;
		});
		return resul
	}

	getRanking(){
		var ranking = [];
		this.players.forEach((p) => {
			ranking.push({username: p.username, stars: p.scored});
		});
		ranking.sort((a,b) => (a.stars > b.stars) ? -1 : 1)
		return ranking;
	}

	nextTurn() {
		this.initialTime = Date.now()+BEGIN_MARGIN*1000;
		if (this.state == state.LOBBY) {
			this.state = state.INGAME;
			this.turn++;
		} else if (this.state == state.INGAME) {
			if (this.turn == this.players.length) {
				this.players.forEach((pl) => {
					if (!pl.wrote) {
						const paragraph = new Paragraph(
							pl.username,
							this.turn,
							""
						);
						this.paragraphs--;
						this.addParagraph(pl,paragraph)
					}
				});
				this.paragraphs = 0;
				this.state = state.VOTING;
				this.voteTurn++
			} else {
				this.players.forEach((pl) => {
					pl.puneta = pl.nextPuneta;
					pl.nextPuneta = "";
					pl.punetaCost = 0;
					if (!pl.wrote) {
						const paragraph = new Paragraph(
							pl.username,
							this.turn,
							""
						);
						this.paragraphs--;
						this.addParagraph(pl,paragraph)
					}
					this.paragraphs = 0;
					pl.wrote = false;
				});
				this.turn++;
			}
		} else if (this.state == state.VOTING) {
			this.initialTime = this.initialTime+1000*REVIEW_TIME
			if (this.voteTurn == this.players.length){
				this.reviewing=true;
				this.state = state.END;
			} else if (!this.reviewing){
				this.players.forEach((pl) => {
					pl.votedTo = "";
				});
				this.voted = 0;
				this.reviewing=true;
				this.voteTurn++;
			}
		}
	}
}

export async function checkEmpty(id){
	const game = findGame(id);
	if (game != undefined){
		console.log(game.turn);
		console.log(game.paragraphs);
		console.log(game.voteTurn);
		console.log(game.voted);
		console.log((Date.now()-game.initialTime)/1000);
		const elapsed = Date.now()-game.initialTime;
		if ((elapsed>(game.maxTime+1000*END_MARGIN) && game.state == state.INGAME)
			|| (elapsed>(game.maxTime+1000*END_MARGIN) && game.state == state.VOTING)
			|| (elapsed>1000*POINTS_TIME && game.state == state.END)){

			if ((game.paragraphs == 0 && game.state == state.INGAME) ||
			(game.voted == 0 && game.state == state.VOTING) ||
			game.state == state.END){
				deleteGame(game.room_id);
			} else {
				if (game.state == state.VOTING) {
					var save = false;
					game.players.forEach((pl) => {
						if (pl.votedTo=="") save = true;
					});
					if (save) {
						await game.saveStory();}
				}
				game.nextTurn();
			}
		}
	}
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
	const game = gamesList.find(
		(game) =>
			game.players.find((player) => player.username == host.username) !=
			undefined
	);
	if (game != undefined) {
		// devuelve que ya está en partida
		return false;
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

	return true;
}

export function addPlayerGame(room_id, p) {
	const inGame = gamesList.find(
		(game) =>
			game.players.find((player) => player.username == p.username) !=
			undefined
	);
	//console.log(inGame);
	const game = gamesList.find((game) => game.room_id == room_id);
	//console.log(game);
	if (
		(inGame == undefined && game.state == state.LOBBY) || // Si no esta en otra partida y me quiero unir a una partida en loby
		(inGame != undefined && inGame.room_id == room_id) // Si esta ya en esta partida
	) {
		if (inGame == undefined) {
			// Si es nuevo
			game.addPlayer(p);
		}
		return true;
	} else {
		return false;
	}
}

export function findGame(room_id) {
	const game = gamesList.find((game) => game.room_id == room_id);
	return game;
}

export function deleteGame(room_id) {
	const game = gamesList.find((game) => game.room_id == room_id);
	gamesList.splice(gamesList.indexOf(game));
}
