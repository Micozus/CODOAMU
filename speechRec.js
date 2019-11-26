window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

//tworzę pojedynczy pojemnik na składnik
let ingred = document.createElement('li');
ingred.setAttribute("class", "card__list-item"); //zmienić li na odpowiedni tag ? chips ?
const ingList = document.querySelector('.card__list');
ingList.appendChild(ingred);

//pojemnik na składniki
//todo dodawanie składników wprowadzonych tekstowo, a nie głosowo
//todo usuwanie składników z listy -> eventListener?
const ingredArray = ['potato'];

//kończy to wciśnięcie przycisku Let's cook;
//todo przekazanie listy do api
const handleStartCooking = () => {
    // alert(`finding recipes including: ${ingredArray.toString()}`);
    ingr = ingredArray.toString().replace(new RegExp(' ', 'g'), ',');
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients=${ingr}&apiKey=649be07875ee49d9ac67a87858375775`)
        .then(response => response.json())
        .then(json => {
            getRecipes(json);
        });
};

const handleFinalInput = (ingredient) => {
    //pushuje składnik do listy tylko gdy jest final
    ingredArray.push(ingredient);

    ingred = document.createElement('li');
    ingred.setAttribute("class", "card__list-item");
    ingList.appendChild(ingred);
};

const removeSpeechListeners = () => {
    recognition.removeEventListener('end', recognition.start);
    recognition.removeEventListener('result', handleInpuResult);
};

const handleDoneEnteringIngredients = () => {
    //todo zmienić na async, zeby najpierw text się czyścił
    ingred.textContent = '';//usuwa let's cook z listy wyświetlanych składników
    //odpinam nasłuch
    removeSpeechListeners();
    //emit eventu czy przekazanie od razu do szukania przepisów?
    handleStartCooking();
};

// const promise = new Promise(function (resolve, reject) {
//     resolve(ingred.textContent = '');
// });


const handleInpuResult = (e) => {
    let ingredient = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
    ingred.textContent = ingredient;

    if (e.results[0].isFinal) {
        if (ingredient === "let's cook") {
            // promise.then(removeSpeechListeners).then(handleStartCooking);
            handleDoneEnteringIngredients();
        } else {
            handleFinalInput(ingredient);
        }
    }
};

//pobieranie tekstu
//obsługa przycisku do rozpoczęcia przyjmowania skłądników
//dopiero do wciśnięciu, aplikacja zaczyna nasłuchiwać
const button = document.getElementById("start_stop");
button.addEventListener('click', () => {
    recognition.addEventListener('result', handleInpuResult);
    //ponowne uruchomienie nasłuchu po przyjęciu skłądnika
    recognition.addEventListener('end', recognition.start);
    //rozpoczęcie nasłuchu
    recognition.start();
});

//obsługa zakończenia wprowadania składników,
const cookButton = document.getElementById("cookingTime");
cookButton.addEventListener('click', handleDoneEnteringIngredients);

const getRecipes = (recipes) => {
    console.log(recipes);
    for (r of recipes) {
        fetch(`https://api.spoonacular.com/recipes/${r.id}/information?includeNutrition=false&apiKey=649be07875ee49d9ac67a87858375775`)
            .then(response => response.json())
            .catch(new Error('Could not get recipe info'))
            .then(json => {
                getRecipeSteps(json);
            });
    }
}

const getRecipeSteps = (recipe) => {
    fetch(`https://api.spoonacular.com/recipes/${recipe.id}/analyzedInstructions?stepBreakdown=false&apiKey=649be07875ee49d9ac67a87858375775`)
        .then(response => response.json())
        .catch(new Error('Could not get steps info'))
        .then(json => {
            console.log(json);
            createRecipeEntry(recipe, json);
        });
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

}