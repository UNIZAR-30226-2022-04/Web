import prisma from "../../../lib/prisma";

export async function createTaleDB(data) {
	const query = await prisma.tale_mode.create({
		data: data,
	});
	return query;
}
