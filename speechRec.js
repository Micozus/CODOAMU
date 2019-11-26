window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

//tworzę pojedynczy pojemnik na składnik
let ingred = document.createElement('li'); //zmienić li na odpowiedni tag ? chips ?
ingred.setAttribute("class", "card__list-item");
const ingList = document.querySelector('.card__list');
ingList.appendChild(ingred);

//pojemnik na skłądniki
const ingredArray = [];

const handleFinalInput = (ingredient) => {
    //pushuje skłądnik do listy tylko gdy jest final
    ingredArray.push(ingredient);
    //test tablicy wyników
    console.log(ingredArray);
    //
    ingred = document.createElement('li');
    ingred.setAttribute("class", "card__list-item");
    ingList.appendChild(ingred);
};
//pobieranie tekstu
recognition.addEventListener('result', e => {
    let ingredient = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    ingred.textContent = ingredient;

    if (e.results[0].isFinal) {
        handleFinalInput(ingredient);
    }
});
//ponowne uruchomienie nasłuchu po przyjęciu skłądnika
recognition.addEventListener('end', recognition.start);

//obsługa przycisku do rozpoczęcia przyjmowania skłądników
//dopiero do wciśnięciu, aplikacja zaczyna nasłuchiwać
const button = document.getElementById("start_stop");
button.addEventListener('click', () => {
    recognition.start();
});