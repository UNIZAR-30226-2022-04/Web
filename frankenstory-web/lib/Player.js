export default class Player {
	constructor(username, password, picture, stars, mooncoins) {
		this.username = username;
		this.password = password;
		this.picture = picture;
		this.stars = stars;
		this.mooncoins = mooncoins;
	}
	friends() {
		return 0;
		//return getFriends(this.username);
	}
}
