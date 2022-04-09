
export default class Player {
    constructor(username, password, picture, stars, coins){
        this.username = username;
        this.password = password;
        this.picture = picture;
        this.stars = stars;
        this.coins = coins;
    }
    friends(){
        return 0;
        //return getFriends(this.username);
    }
}