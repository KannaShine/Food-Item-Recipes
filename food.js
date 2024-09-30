const recipeContainer = document.getElementById("recipe-container");
const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");
const recipeDetails = document.getElementById("recipe-details");
const recipeDetailsContent = document.getElementById("recipe-details-content");
const closeBtn = document.getElementById("recipe-details-close");

const openRecipePopUp = (meal) =>{
    recipeDetailsContent.innerHTML = `
        <h2 id="meal-name">${meal.strMeal}</h2>
        <h3 class="meal-headings">Ingredients : </h3>
        <ul>${fetchIngredients(meal)}</ul>
        <div>
            <h3 class="meal-headings"> Instructions: </h3>
            <p>${meal.strInstructions}</p>
        <div>
    `
    recipeDetails.style.display = "block";
}

const fetchIngredients = (meal) => {
    let ingredients = "";
    for(let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if(ingredient) {
            ingredients += `<li>${measure} ${ingredient}`;
        }else{
            break;
        }
    }
    return ingredients;
}

const fetchRecipes = async (query) => {
    try{
        recipeContainer.innerHTML = "<h2>Fetching Recipes</h2>"
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        recipeContainer.innerHTML = ""
        console.log(response.meals);
        if(response.meals == null) {
            recipeContainer.innerHTML = `<h2>No results found for ${query}`;
        }else{
            response.meals.forEach(meal => {
                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add("recipe");
                recipeDiv.innerHTML = `
                    <img src="${meal.strMealThumb}">
                    <h3>${meal.strMeal}</h3>
                    <p>${meal.strArea}</p>
                    <p>${meal.strCategory}</p>
                `
                const viewRecipeBtn = document.createElement('button');
                viewRecipeBtn.textContent = "view recipe";
                viewRecipeBtn.addEventListener('click',()=>{
                    openRecipePopUp(meal);
                });
                recipeContainer.appendChild(recipeDiv);
                recipeDiv.appendChild(viewRecipeBtn);
            });
        }
    } catch(error) {
        recipeContainer.innerHTML = "<h2>Having trouble loading the data..Try again</h2>"
    }
} 
searchBtn.onclick = (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(searchInput) {
        fetchRecipes(searchInput);
    }else{
        recipeContainer.innerHTML = "<h2>Try searching something...</h2>"
        setTimeout(()=>{
            recipeContainer.innerHTML = "<h2>Search for a food recipe...</h2>"
        },1000);
    }
};

closeBtn.addEventListener('click',()=>{
    recipeDetails.style.display = "none";
});