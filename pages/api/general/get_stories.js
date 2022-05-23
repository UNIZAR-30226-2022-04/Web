import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { selectStoriesDB } from "../../../prisma/queries/SELECT/stories";
import { checkFields } from "../../../lib/checkFields";

export default async (req, res) => {
	const message = req.body;

	const fields = ["username", "password"];

	const rest = checkFields(message,fields)
	if (rest.length != 0){
		const msg = "invalid credentials, expected: " + rest
		res.status(200).json({ result: "error", reason: msg });
		return;
	}

	const user = await selectPlayerDB(message.username);

	if (message.username.length == 0 || message.password.length == 0) {
		res.status(200).json({
			result: "error",
			reason: "invalid credentials",
		});
	}

	// checks if the requested user exists
	if (user != undefined) {
		// checks password
		if (user.password_hash == message.password) {
			//cambiar por password + anadir mecanismo hash
			const query = await selectStoriesDB(message.username);
			var stories = [];
/*
			if (message.username == 'Mercutio'){
				const fc = {
					id: 1,
					title: 'FELIZ CUMPLEAÑOS!',
					type: 'tale',
					date: 'TODOS LOS DIAS',
				};
				stories.push(fc);
			}*/
			
			for (const st in query) {
				var title;
				var type;
				var store = true;

				if (query[st].story.quick_match != null) {
					title = "";
					type = query[st].story.quick_match.mode;
				} else if (query[st].story.tale != null) {
					const tale = query[st].story.tale;
					title = tale.title;
					store = tale.finished;
					type = "tale";
				}
				if (store) {
					var auxDate = query[st].story.date;
					auxDate.setMonth(auxDate.getUTCMonth() + 1);
					const [month, day, year] = [
						auxDate.getUTCMonth(),
						auxDate.getUTCDate(),
						auxDate.getUTCFullYear(),
					];

					const story = {
						id: query[st].story.story_id,
						title: title,
						type: type,
						date: day + "/" + month + "/" + year,
					};
					stories.push(story);
				}
			}
			res.status(200).json({
				result: "success",
				stories: stories,
				reason: "",
			});
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
