/* eslint-disable prefer-const */
const button = document.querySelector('#submit');
button.addEventListener(`click`, searchWord);

// Récupérer les section pour pouvoir les supprimer lors des nouvelles recherches
const form = document.querySelector(`form`);
const section = document.querySelector(`.grid`);

function searchWord(event) {
	event.preventDefault();

	let searchValue = document.getElementById(`search`).value;
	if (searchValue != '') {
		searchMeal(searchValue);
	} else if (searchValue === '') {
		let alert = document.createElement(`span`);
		alert.textContent = `Aucune valeur, veuillez rentrer un plat avant de valider svp`;
		form.appendChild(alert);
	}

	section.innerHTML = ``;
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
		if (json === null) {
			let alert = document.createElement(`span`);
			alert.textContent = `Aucun plat trouver, désolé`;
			form.appendChild(alert);
		}
		await Meal(json);
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
