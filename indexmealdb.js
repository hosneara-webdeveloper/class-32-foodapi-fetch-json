// we will show meal details

const mealDetails = document.getElementById('meal-detail');

const loadMealDetail = (mealId) => {
    // console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=  ${mealId}`
    console.log(url);

    // console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => displayMealDetails(data.meals[0]))


}

const displayMealDetails = (meal) => {
    console.log(meal);

    mealDetails.textContent = '';
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
                <img src="${meal.strMealThumb
        }" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions
        }</p> 
                    <a id="youTube" class="btn btn-info" target="_blank" href="${meal.strYoutube}">Go YouTube</a>

                </div>
            
 
  `
    mealDetails.appendChild(div);


}

// Search button will work when the user press enter button from kye-board as well.

let inputSearchField = document.getElementById("search-field");

inputSearchField.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("search-button").click();
        mealDetails.innerHTML = ''; 
    }
})




document.getElementById('error-message').style.display = 'none';
document.getElementById('null-message').style.display = 'none';

const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    mealDetails.innerHTML = '';
    if (searchText == '') {
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('search-result').innerHTML = '';

    } else {
        // search fetch-field
        document.getElementById('error-message').style.display = 'none';

        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        // console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResult(data.meals))
    }


}




const displaySearchResult = (meals) => {

    // console.log(meals);
    //  NB: we will find single single meal by using forEach loop

    //  NB: meals.forEach(meal => console.log(meal) )

    //  NB: console.log(meal) ta delete korea

    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';

    if (meals == null || meals.length < 1) {
        document.getElementById('null-message').style.display = "block";
    } else {
        document.getElementById('null-message').style.display = "none";
        meals.forEach(meal => {
            
           
            console.log(meal);
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML = `
            <div onclick="loadMealDetail(${meal.idMeal} )">
                    <div class="card">
                    <img src="${meal.strMealThumb
                }" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 150)
                }</p>
                    </div>
                </div>
          </div>
          `

            searchResult.appendChild(div);

        })



    }

}

























