export default class Game{
    constructor(id, host){
        this.id = id;
        this.host = host;   // esto o que el player[0] sea siempre el host
        this.addPlayer(host);
    }

    addPlayer(player){
        this.players.push(player)
    }

    deletePlayer(player){
        this.players = this.players.filter(p => p = player);
    }

}