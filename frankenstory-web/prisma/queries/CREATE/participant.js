import prisma from "../../../lib/prisma";

export async function createParticipantDB(data) {
	const query = await prisma.participant.create({
		data: data,
	});
	return query;
}
