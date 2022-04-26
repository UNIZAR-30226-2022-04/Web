import prisma from "../../../lib/prisma";

export async function updateParticipantDB(username, story_id, voted) {
	const query = await prisma.participant.updateMany({
		data: {
			voted: voted,
		},
		where: {
			AND: [
				{ story_id: { equals: story_id } },
				{ username: { equals: username } },
			],
		},
	});
	return query;
}
