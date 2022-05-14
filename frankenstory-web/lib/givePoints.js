import { selectPlayerDB } from "../prisma/queries/SELECT/player";
import { updatePlayerDB } from "../prisma/queries/PUT/player";

const POINTS_TL_PRIVATE = 200;
const POINTS_TL_PUBLIC = 300;

export async function givePoints(paragraph,privacy){
    var multiplier = POINTS_TL_PUBLIC;
    if (privacy) multiplier = POINTS_TL_PRIVATE;
		const player = await selectPlayerDB(paragraph.username);
    player.mooncoins += parseInt(multiplier);
    player.stars += parseInt(multiplier);
    await updatePlayerDB(player.username,player);
}