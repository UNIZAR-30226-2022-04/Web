import prisma from "../../../lib/prisma";

export async function createQuickGameDB(data) {
	const query = await prisma.Quick_match.create({
		data: data,
	});
	return query;
}