/* eslint-disable prefer-const */

// Boutton d`activation
const buttonRandom = document.querySelector(`#buttonRandom`);
buttonRandom.addEventListener(`click`, () => {
	randomMeal();
});

// Récupérer un repas aléatoire de l`API
async function randomMeal() {
	const url = `https://www.themealdb.com/api/json/v1/1/random.php`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();

		Meal(json);
	} catch (error) {
		console.error(error.message);
	}
}

// Utiliser et afficher les éléments récupérés
function Meal(json) {
	const section = document.querySelector(`#randomMealsSection`);
	section.innerHTML = ``;

	const IdMeal = json.meals[0];

	// Base de la structure (Figure et article)
	let article = document.createElement(`article`);
	let figure = document.createElement(`figure`);
	let img = document.createElement(`img`);
	img.src = IdMeal.strMealThumb;

	// Récupération des informations
	let title = document.createElement(`h3`);
	title.textContent = IdMeal.strMeal;

	let category = document.createElement(`a`);
	category.textContent = ` Catégorie : ${IdMeal.strCategory}`;
	category.href = `./categorie.html?c=${IdMeal.strCategory}`;

	let zone = document.createElement(`a`);
	zone.textContent = ` Zone Géographique : ${IdMeal.strArea}`;
	zone.href = `./categorie.html?c=${IdMeal.strArea}`;

	// AppendChilds
	figure.appendChild(img);

	article.appendChild(title);
	article.appendChild(category);
	article.appendChild(zone);

	section.appendChild(figure);
	section.appendChild(article);
}

// Récupérer toutes les catégories de l`API
async function categoriesMeal() {
	const url = `https://www.themealdb.com/api/json/v1/1/categories.php`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		await CategoryMeal(json);
	} catch (error) {
		console.error(error.message);
	}
}
categoriesMeal();

// Utiliser et afficher les éléments récupérés
function CategoryMeal(json) {
	const section = document.querySelector(`.grid`);
	section.innerHTML = ``;

	for (let i = 0; i < 3; i++) {
		let foods = json.categories[i];
		// Base de la structure (Figure et article)
		let article = document.createElement(`article`);
		let subText = document.createElement(`span`);
		let footer = document.createElement(`footer`);
		let div = document.createElement(`div`);
		let button = document.createElement(`button`);
		let a = document.createElement(`a`);
		a.classList.add(`padding`);
		let figure = document.createElement(`figure`);

		// Récupération des informations
		let img = document.createElement(`img`);
		img.src = foods.strCategoryThumb;

		a.href = `./categorie.html?c=${foods.strCategory}`;
		let title = document.createElement(`h3`);
		title.textContent = foods.strCategory;
		button.textContent = `En savoir plus`;
		subText.textContent = `Catégorie`;
		button.classList.add(`cta`);
		button.classList.add(`mainCta`);

		// AppendChilds
		figure.appendChild(img);

		a.appendChild(figure);

		div.appendChild(subText);
		div.appendChild(title);
		footer.appendChild(div);
		footer.appendChild(button);
		a.appendChild(footer);

		article.appendChild(a);
		section.appendChild(article);
	}
}
