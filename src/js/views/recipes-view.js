

const handleStartCooking = () => {
    // alert(`finding recipes including: ${ingredArray.toString()}`);
    ingr = ingredArray.toString().replace(new RegExp(' ', 'g'), ',');
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=
    false&ingredients=${ingr}&apiKey=649be07875ee49d9ac67a87858375775`)
        .then(response => response.json())
        .then(json => {
            getRecipes(json);
        }).catch(err => console.log(err));
};

const getRecipes = (recipes) => {
    console.log(recipes);
    for (r of recipes) {
        fetch(`https://api.spoonacular.com/recipes/${r.id}/information?includeNutrition=false&apiKey=649be07875ee49d9ac67a87858375775`)
            .then(response => response.json())
            .catch(new Error('Could not get recipe info'))
            .then(json => {
                getRecipeSteps(json);
            }).catch(err => console.log(err));
    }
};

const getRecipeSteps = (recipe) => {
    fetch(`https://api.spoonacular.com/recipes/${recipe.id}/analyzedInstructions?stepBreakdown=false&apiKey=649be07875ee49d9ac67a87858375775`)
        .then(response => response.json())
        .catch(new Error('Could not get steps info'))
        .then(json => {
            console.log(json);
            createRecipeEntry(recipe, json);
        }).catch(err => console.log(err));
}

const createRecipeEntry = (recipeJson, stepsJson) => {
    const recipeList = document.querySelector('.card__recipe-list');
    //<li class="card__recipe-list-item">
    //  <div class="card__wrapper">
    //   <h1 class="card__title">placeholder</h1>
    //   <div class="card__image"></div>
    //   <section class="card__ingredients">ingredients:
    //       <ul class="card__list">
    //              <li class="card__list-item">placeholder</li>
    //       </ul>
    //   </section>
    //   <section class="card__recipe">
    //       <ol class="card__recipe-list">
    //              <li class="card__recipe-list-item">placeholder</li>
    //          </ol>
    //      </section>
    //  </div>
    //</li>
    let li = document.createElement("li");
    let div_c_wrap = document.createElement("div");
    li.appendChild(div_c_wrap);

    let h1_c_title = document.createElement("h1");
    h1_c_title.textContent = recipeJson.title;
    div_c_wrap.appendChild(h1_c_title);

    let div_c_img = document.createElement('div');
    div_c_wrap.appendChild(div_c_img);

    var img = document.createElement('img');
    img.src = recipeJson.image
    div_c_img.appendChild(img);

    let section_c_ing = document.createElement('section');
    section_c_ing.textContent = 'Ingredients:';
    div_c_wrap.appendChild(section_c_ing);

    let ul_c_list = document.createElement('ul');
    section_c_ing.appendChild(ul_c_list);

    for (let ing of recipeJson.extendedIngredients) {
        let li_c_list_item = document.createElement("li");
        li_c_list_item.appendChild(document.createTextNode(ing.name));
        ul_c_list.appendChild(li_c_list_item)
    }

    let section_c_step = document.createElement('section');
    section_c_step.textContent = 'Steps:';
    div_c_wrap.appendChild(section_c_step);

    let ul_c_step_list = document.createElement('ul');
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
