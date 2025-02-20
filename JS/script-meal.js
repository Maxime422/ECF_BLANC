/* eslint-disable prefer-const */

// Récupérer l'URL du navigateur et chercher dans l'API le bon ID
const currentUrl = window.location.search;

async function categoriesMeal() {
	const url = `https://www.themealdb.com/api/json/v1/1/lookup.php${currentUrl}`;
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
	const section = document.getElementById(`zf`);
	section.innerHTML = ``;

	const IdMeal = json.meals[0];

	// Base de la structure (Figure et article)
	let article = document.createElement(`article`);
	let figure = document.createElement(`figure`);
	figure.classList.add(`figureReduct`);
	let img = document.createElement(`img`);
	img.src = IdMeal.strMealThumb;

	// Récupération des informations
	let title = document.createElement(`h1`);
	title.textContent = IdMeal.strMeal;
	title.classList.add(`orange`);

	let category = document.createElement(`a`);
	category.textContent = ` Catégorie : ${IdMeal.strCategory}`;
	category.href = `/categorie.html?c=${IdMeal.strCategory}`;
	category.classList.add(`bold`);

	let zone = document.createElement(`a`);
	zone.textContent = ` Zone Géographique : ${IdMeal.strArea}`;
	zone.href = `/categorie.html?c=${IdMeal.strArea}`;
	zone.classList.add(`bold`);

	let instructions = document.createElement(`a`);
	instructions.textContent = `Instructions : ${IdMeal.strInstructions}`;

	const list = document.createElement('ul');
	for (let i = 1; i <= 20; i++) {
		const ingredient = `strIngredient${i}`;
		const IngredientIn = IdMeal[ingredient];
		console.log(IngredientIn);
		if (IngredientIn === null) {
			continue;
		} else {
			const li = document.createElement('li');
			const a = document.createElement('a');
			a.textContent = IngredientIn;
			a.href = `/ingredient.html?i=${IngredientIn}`;
			a.classList.add(`bold`);

			li.appendChild(a);
			list.appendChild(li);
		}
	}
	figure.appendChild(img);

	article.appendChild(title);
	article.appendChild(category);
	article.appendChild(zone);
	article.appendChild(instructions);

	article.appendChild(list);
	section.appendChild(figure);
	section.appendChild(article);
}
