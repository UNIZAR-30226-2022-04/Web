import prisma from "../../../lib/prisma";

export async function selectPetitionsDB(username) {
	const query = await prisma.petition.findMany({
		where: {
			petition_name: { equals: username },
		},
	});
	return query;
}
