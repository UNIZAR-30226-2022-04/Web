import { selectFriendnames } from "../../../lib/Friendships";
import prisma from "../../../lib/prisma";

export async function selectpublicTalesDB(username) {
	const friends = await selectFriendnames(username);

	const participant = await prisma.participant.findMany({
		where: {
			NOT: {
				OR: [
					{
						username: { in: friends },
					},
					{
						username: { equals: username },
					},
				],
			},
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
			privacy: { equals: false },
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

	return myTales;
}
