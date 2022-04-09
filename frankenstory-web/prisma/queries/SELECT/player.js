import prisma from "../../../lib/prisma";

export async function selectPlayerDB(username) {
	const query = await prisma.player.findMany({
		where: {
			username: { equals: username || undefined },
		},
	});

	return query[0];
}
