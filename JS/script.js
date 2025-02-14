const nextMeal = document.querySelector('#NextMeal');
nextMeal.addEventListener(`click`, getData);

// function RandomMeal() {

// 	const section = document.getElementById('zf');
// 	const article = document.createElement(`article`);
// 	const p = document.createElement('p');
//     p.textContent = getData();
//     console.log(p);

//     section.appendChild(article);
//     article.appendChild(p);
    
// 	// location.href = 'random.html';
// }

async function getData() {
	const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		console.log(json);
        console.log(json.array);
        const ul = document.createElement("ul");
        for (let i = 0; i <= 100; i++) {
            console.log(json.meals.idMeal);
          }
        

        const section = document.getElementById('zf');
        section.appendChild(ul);


	} catch (error) {
		console.error(error.message);
	}
}


// for (const element in json) {
//     var li = document.createElement("li");
//     li.innerHTML = element + ' : ' + json[element];
//     ul.appendChild(li);
// }