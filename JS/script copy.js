/* eslint-disable prefer-const */
async function categoriesMeal() {
	const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		console.log(json);
		await Meal(json);
	} catch (error) {
		console.error(error.message);
	}
}
categoriesMeal();

function Meal(json) {
	const section = document.getElementById(`zf`);

	json.meals.forEach((foods) => {
		console.log(foods.strCategory);
		let article = document.createElement(`article`);
		let span = document.createElement(`span`);
		span.textContent = foods.strCategory;
		article.appendChild(span);
		section.appendChild(article);
	});
}
