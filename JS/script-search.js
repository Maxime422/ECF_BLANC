/* eslint-disable prefer-const */

const button = document.querySelector(`#submit`);
button.addEventListener(`click`, searchWord);

// Récupérer les section pour pouvoir les supprimer lors des nouvelles recherches
const section = document.querySelector(`.grid`);
const messages = document.querySelector(`.messages`);

function searchWord(event) {
	event.preventDefault();
	section.innerHTML = ``;
	messages.innerHTML = ``;

	let searchValue = document.getElementById(`search`).value;
	if (searchValue != ``) {
		searchMeal(searchValue);
		console.log(searchValue);
	} else {
		let alert = document.createElement(`p`);
		alert.textContent = `Veuillez rentrer un valeur`;
		messages.appendChild(alert);
	}
	document.querySelector(`form`).reset();
}

async function searchMeal(searchValue) {
	const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		console.log(json);

		if (json.meals != null && json.meals.length > 0) {
			Meal(json);
		} else {
			let alert = document.createElement(`p`);
			alert.textContent = `Plat inconnu, désolé`;
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
		a.href = `./meal.html?i=${foods.idMeal}`;

		let title = document.createElement(`h3`);
		title.classList.add(`padding`);
		title.textContent = foods.strMeal;

		// AppendChilds
		figure.appendChild(img);

		a.appendChild(figure);
		a.appendChild(title);

		article.appendChild(a);
		section.appendChild(article);
	});
}
