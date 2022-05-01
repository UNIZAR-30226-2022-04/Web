import { selectPlayerDB } from "../prisma/queries/SELECT/player";
import { updatePlayerDB } from "../prisma/queries/PUT/player";

export async function givePoints(paragraphs,privacy){
    var multiplier = 25;
    if (privacy) multiplier = 10;
    for (const p in paragraphs) {
		const player = await selectPlayerDB(paragraphs[p].username);
        const score = paragraphs[p].Score*multiplier
        player.mooncoins += parseInt(score);
        player.stars += parseInt(score);
        await updatePlayerDB(player.username,player);
	}
}