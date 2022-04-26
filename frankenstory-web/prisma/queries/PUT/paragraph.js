import prisma from "../../../lib/prisma";

export async function updateParagraphDB(story_id, index) {
	const query = await prisma.paragraph.updateMany({
		data: {
			Score: {
				increment: 1,
			},
		},
		where: {
			AND: [
				{ story_id: { equals: story_id } },
				{ turn_number: { equals: index } },
			],
		},
	});
	return query;
}
