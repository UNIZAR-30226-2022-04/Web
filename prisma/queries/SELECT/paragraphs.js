import prisma from "../../../lib/prisma";

export async function selectParagraphsDB(story_id) {
	const query = await prisma.paragraph.findMany({
		where: {
			story_id: { equals: story_id },
		},
		orderBy: {
			turn_number: "asc",
		},
	});

	return query;
}
