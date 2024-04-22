const urlSearchParams = new URLSearchParams(window.location.search);
const id = urlSearchParams.get('id');

fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(response => response.json())
    .then(data => {        
        meal = data.meals[0];

        const headerDiv = document.querySelector('h2');
        headerDiv.textContent = meal.strMeal;

        const img = document.querySelector('img');
        img.src = meal.strMealThumb;

        const instruction = document.querySelector('p');
        instruction.textContent = meal.strInstructions;
    })