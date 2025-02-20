/* eslint-disable prefer-const */

// Récupérer l'URL du navigateur et chercher dans l'API la bonne catégorie
const currentUrl = window.location.search;
console.log(currentUrl);

async function categoriesMeal() {
	const url = `https://www.themealdb.com/api/json/v1/1/filter.php${currentUrl}`;
	try {
		const response = await fetch(url);
		console.log(url);
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
		console.log(foods.strMeal);

		let article = document.createElement(`article`);
		let figure = document.createElement(`figure`);

		// Récupération des informations
		let img = document.createElement(`img`);
		img.src = foods.strMealThumb;

		let a = document.createElement(`a`);
		a.href = `meal.html?i=${foods.idMeal}`;

		let title = document.createElement(`h3`);
		title.textContent = foods.strMeal;

		// AppendChilds
		figure.appendChild(img);

		a.appendChild(figure);
		a.appendChild(title);

		article.appendChild(a);
		section.appendChild(article);
	});
}

// Fait
