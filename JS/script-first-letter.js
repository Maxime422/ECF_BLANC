/* eslint-disable prefer-const */
const buttonRandom = document.querySelector('.alphabet');
buttonRandom.addEventListener(`submit`, () => {
	searchLetters();
});

function searchLetters() {
	event.preventDefault();

	try {
		let letters = document.querySelector(`input[name="alphabetletters"]:checked`).id;
		console.log(letters);

		lettersMeals(letters);
	} catch (error) {
		console.error(error);
	}
}

async function lettersMeals(letters) {
	const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letters}`;
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

function Meal(json) {
	const section = document.querySelector(`.grid`);
	section.innerHTML = ``;

	json.meals.forEach((foods) => {
		console.log(foods.strMeal);

		let article = document.createElement(`article`);
		let figure = document.createElement(`figure`);

		// Récupération des informations
		let img = document.createElement(`img`);
		img.src = foods.strMealThumb;

		let a = document.createElement(`a`);
		a.href = `/meal.html?i=${foods.idMeal}`;

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