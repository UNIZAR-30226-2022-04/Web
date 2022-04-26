import fs from "fs";
import path from "path";
// gray-matter permite convertir archivos de texto en objetos js:
//
// ---
// title: smth
// ---
// cositas
//
// pasa a ser:
//
// {
//   content: 'cositas'
//   data: {
//     title: 'smth'
//   }
// }
//
import matter from "gray-matter";
// remark permite crear html con el estilo que ofrecen los archivos
// markdown (.md)
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "/public/posts");

export function getSortedPostsData() {
	// Get file names under /posts
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {
		// Remove ".md" from file name to get id
		const id = fileName.replace(/\.md$/, "");

		// Read markdown file as string
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, "utf8");

		// Use gray-matter to parse the post metadata section
		const matterResult = matter(fileContents);

		// Combine the data with the id
		return {
			id,
			...matterResult.data,
		};
	});
	// Sort posts by date
	return allPostsData.sort(({ date: a }, { date: b }) => {
		if (a < b) {
			return 1;
		} else if (a > b) {
			return -1;
		} else {
			return 0;
		}
	});
}

/*
  Es una funcion que se ejecuta de forma asíncrona (usando un await dentro) 
  y usa promesas.
  Las promesas como hacer en go: canal = go smt() [te devuelve un canal] y 
  en ese canal recibirás un error o la respuesta a la llamada.

  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
*/
export async function getPostData(id) {
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");

	// Use gray-matter to parse the post metadata section
	const matterResult = matter(fileContents);

	// Use remark to convert markdown into HTML string
	// Usando await esperas a que remark().use(html).process(matterResult.content)
	// termine
	const processedContent = await remark()
		.use(html)
		.process(matterResult.content);
	const contentHtml = processedContent.toString();

	// Combine the data with the id and contentHtml
	return {
		id,
		contentHtml,
		...matterResult.data,
	};
}

export function getAllPostIds() {
	const fileNames = fs.readdirSync(postsDirectory);

	return fileNames.map((fileName) => {
		return {
			params: {
				id: fileName.replace(/\.md$/, ""),
			},
		};
	});
}
