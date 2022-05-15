import prisma from "../../../lib/prisma";

export async function selectPetitionDB(username, petition_name) {
	const query = await prisma.petition.findMany({
		where: {
			username: { equals: username },
			petition_name: { equals: petition_name },
		},
	});

	return query[0];
}
