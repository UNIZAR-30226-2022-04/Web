import prisma from "../../../lib/prisma";

export async function deletePetitionDB(username, petition_name) {
	const query = await prisma.petition.deleteMany({
		where: {
			username: username,
			petition_name: petition_name
		},
	});
	return query;
}
