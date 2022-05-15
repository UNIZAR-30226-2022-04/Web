import prisma from "../../../lib/prisma";

export async function selectPlayersDB(username) {
	const query = await prisma.player.findMany({
		where: {
			username: { equals: username || undefined },
		},
	});

	return query;
}
