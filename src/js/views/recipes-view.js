const utilCreateElem = require("../util/helper");

const apiKey = "a1a5bdfa7e2640be98b35a595487d3da";
const mainWrapper = document.getElementById("mainWrapper");

const showView = () => {
    const templateView = `
        <div>
            <div class="kitchen"></div>
            <div><h2>Let's see what you can cook :)</h2></div>
            <div><button class="backToFridge ctaBig">Back to ingredients screen</button></div>
        </div>
        </div>
        <div class="loading">
            <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        <section class="card__recipe">
            
            <ol class="card__recipe-list">

            </ol>
        </section>
            `;

    mainWrapper.firstElementChild.remove();
    const recipeSection = utilCreateElem("section", templateView);
    recipeSection.id = "recipeView";
    recipeSection.classList.add("hide");
    mainWrapper.insertBefore(recipeSection, null);
    const backButton = document.querySelector(".backToFridge");
    backButton.addEventListener("click", () => backToFridgeView())
};

const backToFridgeView = () => {
    const loader = document.querySelector(".loading");
    const recipeView = document.getElementById("recipeView");
    recipeView.classList.add("hide");
    setTimeout(() => {
        recipeView.remove();
    }, 500);
    setTimeout(() => {
        const backToFridge = require("./fridge-view");
        backToFridge();
    }, 700);

};

const handleStartCooking = (ingredArray) => {
    showView();
    const kitchen = document.querySelector('#recipeView');
    const loader = document.querySelector(".loading");
    setTimeout(() => kitchen.classList.remove('hide'), 500);

    ingr = ingredArray.toString().replace(new RegExp(' ', 'g'), ',');
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=
    false&ingredients=${ingr}&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(json => {
            setTimeout(() => {
                loader.classList.add('hide');
            }, 1000);

            setTimeout(() => {
                loader.remove();
            }, 2000);
            setTimeout(() => {
                getRecipes(json);
            }, 2200);
        }).catch(err => console.log(err));
};

const getRecipes = (recipes) => {
    console.log(recipes);
    for (r of recipes) {
        fetch(`https://api.spoonacular.com/recipes/${r.id}/information?includeNutrition=false&apiKey=${apiKey}`)
            .then(response => response.json())
            .catch(new Error('Could not get recipe info'))
            .then(json => {
                getRecipeSteps(json);
            }).catch(err => console.log(err));
    }
};

const getRecipeSteps = (recipe) => {
    fetch(`https://api.spoonacular.com/recipes/${recipe.id}/analyzedInstructions?stepBreakdown=false&apiKey=${apiKey}`)
        .then(response => response.json())
        .catch(new Error('Could not get steps info'))
        .then(json => {
            console.log(json);
            createRecipeEntry(recipe, json);
        }).catch(err => console.log(err));
};

const createRecipeEntry = (recipeJson, stepsJson) => {
    const recipeList = document.querySelector('.card__recipe-list');
    let li = document.createElement("li");
    let div_c_wrap = document.createElement("div");
    li.appendChild(div_c_wrap);

    let h1_c_title = document.createElement("h1");
    h1_c_title.textContent = recipeJson.title;
    div_c_wrap.appendChild(h1_c_title);

    let div_c_img = document.createElement('div');
    div_c_wrap.appendChild(div_c_img);

    var img = document.createElement('img');
    img.src = recipeJson.image;
    div_c_img.appendChild(img);

    let section_c_ing = document.createElement('section');
    section_c_ing.innerHTML = `<h2>Ingredients:</h2>`;
    div_c_wrap.appendChild(section_c_ing);

    let ul_c_list = document.createElement('ul');
    ul_c_list.setAttribute("class", "ingredientsList");
    section_c_ing.appendChild(ul_c_list);

    for (let ing of recipeJson.extendedIngredients) {
        let li_c_list_item = document.createElement("li");
        li_c_list_item.appendChild(document.createTextNode(ing.name));
        ul_c_list.appendChild(li_c_list_item)
    }

    let section_c_step = document.createElement('section');
    section_c_step.innerHTML = `<h2>Steps:</h2>`;
    div_c_wrap.appendChild(section_c_step);

    let ul_c_step_list = document.createElement('ul');
    ul_c_step_list.setAttribute("class", "stepList");
    section_c_step.appendChild(ul_c_step_list);

    for (let section of stepsJson) {
        for (let step of section.steps) {
            let li_c_list_item = document.createElement("li");
            li_c_list_item.appendChild(document.createTextNode(step.step));
            ul_c_step_list.appendChild(li_c_list_item);
        }
    }
    recipeList.appendChild(li);
};

module.exports = handleStartCooking;
