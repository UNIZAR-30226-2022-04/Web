
import { selectFriendshipsDB } from "../prisma/queries/SELECT/friendships";
import { selectPlayerDB } from "../prisma/queries/SELECT/player";

export async function selectFriendnames(username) {
	var friends = [];
	let data = await selectFriendshipsDB(username);
	for (const row in data) {
		if (data[row].username == username) {
			friends.push(data[row].friendname);
		} else {
			friends.push(data[row].username);
		}
	}
	return friends;
}

export async function bestN(user,N) {
	var ranking = [];
	let friendnames = await selectFriendnames(user.username);

	for (const row in friendnames){
		const friend = await selectPlayerDB(friendnames[row]);
		ranking.push({username:friendnames[row], stars:friend.stars});
	}
	ranking.push({username:user.username, stars:user.stars});
	ranking.sort((a, b) => (a.stars > b.stars) ? -1 : 1)

	let bestN = []

	for (var i = 0; i < ranking.length && i < N; i++) {
		const u = {username:ranking[i].username,stars:ranking[i].stars};
		bestN.push(u);
	}

	return bestN
}