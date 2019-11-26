window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

//tworzę pojedynczy pojemnik na składnik
let ingred = document.createElement('li'); //zmienić li na odpowiedni tag ? chips ?
ingred.setAttribute("class", "card__list-item");
const ingList = document.querySelector('.card__list');
ingList.appendChild(ingred);

//pojemnik na składniki
//todo dodawanie składników wprowadzonych tekstowo, a nie głosowo
//todo usuwanie składników z listy -> evetListener?
const ingredArray = [];


//kończy to wciśnięcie przycisku Let's cook;
//todo przekazanie listy do api
const cookButton = document.getElementById("cookingTime");
const handleStartCooking = () => {
    alert(`finding recipes including: ${ingredArray.toString()}`);
};

const handleFinalInput = (ingredient) => {
    //pushuje skłądnik do listy tylko gdy jest final
    ingredArray.push(ingredient);
    ingred = document.createElement('li');
    ingred.setAttribute("class", "card__list-item");
    ingList.appendChild(ingred);
};

function handleDoneEnteringIngredients() {
    //odpiąć nasłuch
    recognition.removeEventListener('end', recognition.start);
    // recognition.removeEventListener('result', handleInpuResult);
    recognition.removeEventListener('result', handleInpuResult);

    // recognition.abort();
    console.log("should stop listening now");
    //emit eventu czy przekazanie od razu do szukania przepisów?
    handleStartCooking();
}

const handleInpuResult = (e) => {
    let ingredient = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
    ingred.textContent = ingredient;

    if (e.results[0].isFinal) {
        if (ingredient === "let's cook") {
            //todo zmienić na async, zeby najpierw text się czyścił
            ingred.textContent = '';//usuwa let's cook z listy wyświetlanych składników
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
cookButton.addEventListener('click', handleStartCooking);

