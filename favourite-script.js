const mealListEl = document.getElementById('mealList');
const urlSearchParams = new URLSearchParams(window.location.search);
const favMealsQueryParam = urlSearchParams.get('favMeals');
const favMeals = JSON.parse(decodeURIComponent(favMealsQueryParam));

console.log(favMeals)

favMeals.forEach((meal) => {

    const mealDiv = document.createElement('div');
    mealDiv.classList.add('meal')

    mealDiv.innerHTML = `
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}">
            <button class="remove-from-fav-btn">Remove</button>
            `
    mealListEl.appendChild(mealDiv)

    const removeFromFavBtn = mealDiv.querySelector('button');
    removeFromFavBtn.addEventListener('click', ()=>{
        favMeals.pop(meal);
        mealDiv.remove();
    })
    
})