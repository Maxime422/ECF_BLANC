/* eslint-disable prefer-const */

// Récupérer toutes les catégories de l'API
async function categoriesMeal() {
	const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
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
categoriesMeal();

// Utiliser et afficher les éléments récupérés
function Meal(json) {
	const section = document.querySelector(`.grid`);

	json.categories.forEach((foods) => {
		// Base de la structure (Figure et article)
		let article = document.createElement(`article`);
		let subText = document.createElement(`span`);
		let footer = document.createElement(`footer`);
		let div = document.createElement(`div`);
		let button = document.createElement(`button`);
		let a = document.createElement(`a`);
		let figure = document.createElement(`figure`);

		// Récupération des informations
		let img = document.createElement(`img`);
		img.src = foods.strCategoryThumb;

		a.href = `/categorie.html?c=${foods.strCategory}`;
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
	});
}

// Fait V2
