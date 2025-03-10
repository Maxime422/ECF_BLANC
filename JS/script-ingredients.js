/* eslint-disable prefer-const */

// Récupérer toutes les zones de l`API
async function categoriesMeal() {
	const url = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		console.log(json);
		Meal(json);
	} catch (error) {
		console.error(error.message);
	}
}
categoriesMeal();

// Utiliser et afficher les éléments récupérés
function Meal(json) {
	const section = document.querySelector(`.grid`);

	json.meals.forEach((foods) => {
		// Base de la structure (Figure et article)
		let article = document.createElement(`article`);
		article.classList.add(`center`);
		let a = document.createElement(`a`);
		console.log(a);

		// Récupération des informations

		a.href = `./ingredient.html?i=${foods.strIngredient}`;
		let title = document.createElement(`h3`);
		title.textContent = foods.strIngredient;
		a.classList.add(`cta`);
		a.classList.add(`mainCta`);

		// AppendChilds
		a.appendChild(title);
		article.appendChild(a);
		section.appendChild(article);
	});
}

// Fait V2
