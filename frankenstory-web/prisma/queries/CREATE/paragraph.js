import prisma from "../../../lib/prisma";

export async function createParagraphDB(data) {
	const query = await prisma.paragraph.create({
		data: data,
	});
	return query;
}
