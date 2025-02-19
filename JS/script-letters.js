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
	const section = document.getElementById(`alphabetDiv`);
	section.innerHTML = ``;

	json.meals.forEach((foods) => {
		console.log(foods.strMeal);
		let article = document.createElement(`article`);
		let title = document.createElement(`h3`);
		title.textContent = foods.strMeal;
	
		let category = document.createElement(`span`);
		category.textContent = `Catégorie : ${foods.strCategory}`;
	
		let zone = document.createElement(`span`);
		zone.textContent = ` Zone Géo : ${foods.strArea}`;
	
		article.appendChild(title);
		article.appendChild(category);
		article.appendChild(zone);
		section.appendChild(article);
	});
}