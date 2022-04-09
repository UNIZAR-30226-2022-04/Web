import prisma from "../../../lib/prisma";

export async function createPlayerDB(data) {
	const query = await prisma.player.create({ data: data });
	return query;
}
