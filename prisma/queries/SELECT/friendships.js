import prisma from "../../../lib/prisma";

export async function selectFriendshipsDB(username) {
	const query = await prisma.friendship.findMany({
		where: {
			OR: [
				{ username: { equals: username } },
				{ friendname: { equals: username } },
			],
		},
	});

	return query;
}