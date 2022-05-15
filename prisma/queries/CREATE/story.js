import prisma from "../../../lib/prisma";

export async function createStoryDB() {
	const query = await prisma.story.create({
		data: {},
	});
	return query;
}
