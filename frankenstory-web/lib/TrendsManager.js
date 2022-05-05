//Devuelve una lista con las tendencias actuales
export async function getTrends() {
	const res = await fetch(
		"https://api.twitter.com/1.1/trends/place.json?id=23424950",
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization:
					"Bearer AAAAAAAAAAAAAAAAAAAAAGdrbwEAAAAAvl4DMZZhj5gMuC8nS%2FzBLQP3c5E%3DqGZc91feLTYPpKltWldBFvOvZnwW9iN8nYPkxWfbUsheKuaTeU",
			},
			body: null,
		}
	);
	return res.json();
}
