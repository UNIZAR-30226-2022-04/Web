import prisma from "../../../lib/prisma";

export async function selectmyTalesDB(username) {
	const participant = await prisma.participant.findMany({
		where: {
			username: { equals: username },
			creator: { equals: true },
		},
	});

	const myTalesId = [];
	participant.forEach((part) => myTalesId.push(part.story_id));

	const myTales = await prisma.tale_mode.findMany({
		where: {
			story_id: { in: myTalesId },
			finished: { equals: false },
			scored: { equals: false },
		},
	});

	myTales.forEach((tale) => (tale.creator = username));

	return myTales;
}
