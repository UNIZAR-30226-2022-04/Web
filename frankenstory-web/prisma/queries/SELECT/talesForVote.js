import prisma from "../../../lib/prisma";

export async function selecttalesForVoteDB(username) {
	const participant = await prisma.participant.findMany({
		where: {
			username: { equals: username },
		},
	});

	const myTalesId = [];
	participant.forEach((part) => myTalesId.push(part.story_id));

	const myTales = await prisma.tale_mode.findMany({
		where: {
			story_id: { in: myTalesId },
			finished: { equals: true },
			scored: { equals: false },
		},
	});

	for (const tale of myTales) {
		const creator = await prisma.participant.findMany({
			where: {
				story_id: { equals: tale.story_id },
				creator: { equals: true },
			},
		});
		tale.creator = creator[0].username;
	}

	for (const tale of myTales) {
		const voted = await prisma.participant.findMany({
			where: {
				story_id: { equals: tale.story_id },
				username: { equals: username },
			},
		});
		tale.meVoted = voted[0].voted == "" ? false : true;
	}

	return myTales;
}
