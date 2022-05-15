import prisma from "../../../lib/prisma";

export async function selectTaleDB(story_id) {
	const query = await prisma.tale_mode.findMany({
		where: {
			story_id: { equals: story_id },
		},
	});

	return query[0];
}
