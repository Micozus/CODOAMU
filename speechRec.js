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
const ingredArray = [];

//kończy to wciśnięcie przycisku Let's cook;
//todo przekazanie listy do api
const handleStartCooking = () => {
    // alert(`finding recipes including: ${ingredArray.toString()}`);
    ingr = ingredArray.toString().replace(new RegExp(' ', 'g'), ',');
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients=${ingr}&apiKey=649be07875ee49d9ac67a87858375775`)
        .then(response => response.json())
        .then(json => {
            showRecipes(json);
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
const showRecipes = (recipes) => {
    console.log(recipes);
    const recipeList = document.querySelector('.card__recipe-list');
    for(r of recipes) {
        console.log(r);
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(r.title));
        recipeList.appendChild(li)
    }
}