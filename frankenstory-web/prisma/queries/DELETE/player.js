import prisma from "../../../lib/prisma";

export async function deletePlayerDB(username) {
	const query = await prisma.player.delete({
		where: { username: username },
	});
	return query;
}
