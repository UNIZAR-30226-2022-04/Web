import prisma from "../../../lib/prisma";

export async function createPetitionDB(questioner, receiver) {
	const query = await prisma.petition.create({
		data: {
			username: questioner,
			petition_name: receiver,
		},
	});
	return query;
}
