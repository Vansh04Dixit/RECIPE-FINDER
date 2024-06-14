const SearchBox = document.querySelector(".search-box");
const SearchButton = document.querySelector(".btn");

const cointainers = document.querySelector(".recipe-container");

const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeClosebtn = document.querySelector(".recipe-close-button");

let Api = "https://www.themealdb.com/api/json/v1/1/search.php?";

const FetchRecipes = async(Searchquery)=>{

    cointainers.innerHTML = "<h2>Fetching Recipes...</h2>";
    let data = await fetch(`${Api}s=${Searchquery}`);
    let response = await data.json();

    cointainers.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("styling");

        recipeDiv.innerHTML = `
        
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea}</p>
        <p>${meal.strCategory}</p>
        
        `

        const button = document.createElement("button");
        button.textContent = "view recipe";
        recipeDiv.appendChild(button);

        cointainers.appendChild(recipeDiv);

        button.addEventListener("click",()=>{
            Popup(meal);
        });

    });
};

function Popup(meal){
    recipeDetailsContent.innerHTML = `

        <h2 class="recipe-name">${meal.strMeal}</h2>
        <h3>Ingredents:</h3>
        <ul class="list">${fetchIngredents(meal)}</ul>

        <div class="instructions">
            <h3>Instructions :</h3>
            <p>${meal.strInstructions}</p>
        </div>

    `


    recipeDetailsContent.parentElement.style.display = "block";
}

function fetchIngredents(meal){
    let ingredentsList = "";

    for(let i = 1; i<=20 ; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredentsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredentsList;
}

SearchButton.addEventListener("click",(e)=>{
    FetchRecipes(SearchBox.value.trim());
    e.preventDefault();
});

recipeClosebtn.addEventListener("click",()=>{
    recipeDetailsContent.parentElement.style.display = "none";
})