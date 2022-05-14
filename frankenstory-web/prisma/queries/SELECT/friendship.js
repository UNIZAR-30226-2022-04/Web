import prisma from "../../../lib/prisma";

export async function selectFriendshipDB(username,friendname){
	const query = await prisma.friendship.findMany({
		where: {
			AND: [
				{ username: { equals: username } },
				{ friendname: { equals: friendname } },
			],
		},
	});
	//console.log(query)
	return query;
}