import prisma from "../../../lib/prisma";

export async function createFriendshipDB(username, friendname) {
	const query = await prisma.friendship.create({
		data: {
			username: username,
			friendname: friendname
		},
	});
	return query;
}
