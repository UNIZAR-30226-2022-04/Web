import prisma from "../../../lib/prisma";

export async function selectParticipantsDB(id) {
	const query = await prisma.participant.findMany({
		where: {
			story_id: { equals: id },
		},
	});
	return query;
}
