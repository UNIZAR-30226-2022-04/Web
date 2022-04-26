import prisma from "../../../lib/prisma";

export async function selectParticipantDB(username, story_id) {
	const query = await prisma.participant.findMany({
		where: {
			story_id: { equals: story_id },
			username: { equals: username },
		},
	});

	return query;
}
