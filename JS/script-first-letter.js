/* eslint-disable prefer-const */
const submit = document.querySelector('.alphabet');
submit.addEventListener(`submit`, (event) => {
	event.preventDefault();
	searchLetters();
});

function searchLetters() {
	try {
		let letters = document.querySelector(`input[name="alphabetletters"]:checked`).id;
		console.log(letters);

		lettersMeals(letters);
	} catch (error) {
		console.error(error);
	}
}

const section = document.querySelector('.grid');
const messages = document.querySelector(`.messages`);

async function lettersMeals(letters) {
	const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letters}`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const json = await response.json();
		console.log(json);

		section.innerHTML = '';
		messages.innerHTML = '';
		if (json.meals != null) {
			Meal(json);
		} else {
			let alert = document.createElement(`p`);
			alert.textContent = `Aucun plat trouvé avec la lettre ${letters}`;
			messages.appendChild(alert);
		}
	} catch (error) {
		console.error(error.message);
	}
}

function Meal(json) {
	json.meals.forEach((foods) => {
		console.log(foods.strMeal);

		let article = document.createElement(`article`);
		let figure = document.createElement(`figure`);

		// Récupération des informations
		let img = document.createElement(`img`);
		img.src = foods.strMealThumb;

		let a = document.createElement(`a`);
		a.href = `ECF_BLANC/meal.html?i=${foods.idMeal}`;

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
