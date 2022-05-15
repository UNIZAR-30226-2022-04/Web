import prisma from "../../../lib/prisma";

export async function updatePlayerDB(username, data) {
	const query = await prisma.player.update({
		data: data,
		where: { username: username },
	});
	return query;
}
