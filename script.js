
const favMeals = [];

const inputEl = document.getElementById('search');
const mealListEl = document.getElementById('mealList');
inputEl.focus();
inputEl.addEventListener('input', debounce(searchMeals, 500));
const favsButton = document.getElementById('go-to-favs');
favsButton.addEventListener('click', navigateToFavourites);

function navigateToFavourites(){
    const favMealsQueryParam = encodeURIComponent(JSON.stringify(favMeals));
    window.location.href=`favourites.html?favMeals=${favMealsQueryParam}`
}


function searchMeals() {
    console.log('searchMeals -input value ', inputEl.value)
    const searchKeyword = inputEl.value;

    mealListEl.innerHTML = "";

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKeyword}`)
    .then(response => response.json())
    .then( data =>{
        console.log(data.meals)
        data.meals.forEach((meal)=>{
            const mealDiv = document.createElement('div');
            mealDiv.classList.add('meal')
            
            mealDiv.innerHTML = `
            <h3 id="meal-heading">${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}">
            <button class="add-to-fav-btn">Add To Favourite</button>
            `
            mealListEl.appendChild(mealDiv)

            const favBtn = mealDiv.querySelector('.add-to-fav-btn');
            favBtn.addEventListener('click', ()=>{
                favBtn.disabled = true;
                favBtn.classList.add('disabled')
                addToFavourite(meal);
            })

            const mealHeading = mealDiv.querySelector('#meal-heading');
            mealHeading.addEventListener('click',()=>{
                window.location.href=`mealDetail.html?id=${meal.idMeal}`
            })
        })
    })
}

function addToFavourite(meal){
    favMeals.push(meal);
}

function debounce(func, timeout) {
    console.log('debounce func is called');
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            searchMeals();
        }, timeout);
    }
}

export {favMeals};