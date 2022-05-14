import prisma from "../../../lib/prisma";

export async function selectStoriesDB(username) {
	const query = await prisma.participant.findMany({
		where: {
			username: { equals: username },
		},
		select: {
			story: {
				select: {
					story_id: true,
					date: true,
					tale: true,
					quick_match: {
						select: {
							mode: true,
						},
					},
				},
			},
		},
	});
	return query;
}
