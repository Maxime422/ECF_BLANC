/* eslint-disable prefer-const */
const buttonRandom = document.querySelector('#buttonRandom');
buttonRandom.addEventListener(`click`, () => {
	randomMeal();
});

async function randomMeal() {
	const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
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
	const section = document.getElementById(`randomMealsSection`);
	section.innerHTML = ``;

	const randomMeal = json.meals[0];
	console.log(randomMeal);

	let article = document.createElement(`article`);
	let title = document.createElement(`h3`);
	title.textContent = randomMeal.strMeal;

	let category = document.createElement(`span`);
	category.textContent = ` Catégorie : ${randomMeal.strCategory}`;

	let zone = document.createElement(`span`);
	zone.textContent = ` Zone Géo : ${randomMeal.strArea}`;

	article.appendChild(title);
	article.appendChild(category);
	article.appendChild(zone);
	section.appendChild(article);
}