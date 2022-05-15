import prisma from "../../../lib/prisma";

export async function updateTaleDB(story_id, data) {
	const query = await prisma.tale_mode.update({
		data: data,
		where: { story_id: story_id },
	});
	return query;
}
