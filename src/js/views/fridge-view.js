const utilCreateElem = require("../util/helper");

let selectMethodElement;

const mainWrapper = document.getElementById("mainWrapper");
const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
const showView = () => {
    const templateView = ` <div class="fridge hide"></div>
            <div class="content">
                <div class="selectMethod hide">
                    <div><h3>Tell us what you have in fridge</h3><br/>
                    <h4>Then we will provide you with tasty recipe :)</h4></div>
                    <div class="methods">
                        <button class="keyboard-input">
                            <i class="material-icons">keyboard</i>
                        </button>
                    </div>
                </div>
            </div>`;

    const micButtonTemplate = `<i class="material-icons">mic</i>`;
    const fridgeSection = utilCreateElem("section", templateView);
    fridgeSection.id = "fridgeView";
    mainWrapper.insertBefore(fridgeSection, null);
    selectMethodElement = document.querySelector(".selectMethod");
    const methodsNode = document.querySelector("#fridgeView .methods");
    const keyboardButton = methodsNode.firstElementChild;
    keyboardButton.addEventListener("click", () => {
        clearView();
        keyboardInputView();
    });
    if (isChrome) {
        const micNode = utilCreateElem("button", micButtonTemplate);
        methodsNode.insertBefore(micNode, null);
        const micButton = methodsNode.lastElementChild;
        micButton.classList.add("microphone-input");
        micButton.addEventListener("click", () => {
            clearView();
            micInputView();
        });
    }
    const fridge = document.querySelector("#mainWrapper .fridge");
    setTimeout(() => {
        fridge.classList.remove("hide");
        selectMethodElement.classList.remove("hide");
    }, 300);
};

const clearView = () => {
    selectMethodElement.classList.add("hide");
    setTimeout(() => selectMethodElement.remove(), 500);
};

const micInputView = () => {
    const contentNode = document.querySelector("#fridgeView .content")
    const templateView = `
        <button class="listen_button ctaBig">
            <i class="material-icons">mic</i> Start listening
        </button>
        <div class="card__image"></div>
        <section class="card__ingredients">
            <h1>Your Ingredients:</h1>
            <div class="card__list">
            </div>
        </section>`;
    const micSection = utilCreateElem("section", templateView);
    micSection.id = "micInputView";
    contentNode.insertBefore(micSection, null);

    // Speech rec object

    SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    // Ingredient element to push

    let ingred = document.createElement('div');
    ingred.setAttribute("class", "ingredientToBeAdded");

    // Ingredient container selector
    const ingList = document.querySelector('.card__list');

    const ingredArray = [];

    const listenButton = document.querySelector(".listen_button");

    const removeFromList = (e) => {
        const elementToRemove = e.target.parentElement.parentElement;
        console.log(elementToRemove);
        console.log(ingredArray);
        const elIndex = ingredArray.indexOf(e.target.textContent);
        ingredArray.splice(elIndex, 1);
        ingList.removeChild(e.target);
    };


    const startListening = () => {
        listenButton.classList.add("buttonBlock");
        recognition.addEventListener('result', handleInpuResult);
        //ponowne uruchomienie nasłuchu po przyjęciu skłądnika
        recognition.addEventListener('end', recognition.start);
        //rozpoczęcie nasłuchu
        recognition.start();

    };

    listenButton.addEventListener('click', startListening);

    const handleFinalInput = (ingredient) => {
        //pushuje składnik do listy tylko gdy jest final
        const ingredientsContainer = document.querySelector(".card__ingredients");
        ingredientsContainer.insertBefore(ingred, ingList);
        setTimeout(() => ingred.classList.add("show"), 1000);
        ingredArray.push(ingredient);

        const chipTemplate = `
            <span class="mdl-chip__text">${ingredient}</span>
        <button type="button" class="mdl-chip__action"><i class="material-icons">cancel</i></button>
        `;

        const chip = utilCreateElem("span", chipTemplate, ["mdl-chip mdl-chip--deletable"]);
        chip.lastElementChild.addEventListener("click", e => removeFromList(e));
        ingList.appendChild(chip);
        ingred.classList.remove("show");
        setTimeout(() => {
            ingred.textContent = "";
            ingred.remove();
        }, 600);

    };


    const handleInpuResult = (e) => {
        console.log("handleInput");
        //sprawdzam, czy mam miejsce na kolejny składnik
        const ingredientsContainer = document.querySelector(".card__ingredients");
        ingredientsContainer.insertBefore(ingred, ingList);
        setTimeout(() => ingred.classList.add("show"), 300);

        let ingredient = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
        ingred.textContent = ingredient;

        if (e.results[0].isFinal) {
            if (ingredient === "let's cook") {
                handleDoneEnteringIngredients();
            } else if (ingredArray.length === 6) {
                alert("Can't add more than 6 ingredients! Proceed to recipes " +
                    "or replace ingredients with another");
            } else {
                handleFinalInput(ingredient);
            }
        }
    };


    const removeSpeechListeners = () => {
        recognition.removeEventListener('end', recognition.start);
        recognition.removeEventListener('result', handleInpuResult);
    };

    const handleDoneEnteringIngredients = () => {
        console.log("lets cook!")
        // ingList.removeChild(ingred);
        // ingred.textContent = '';//usuwa let's cook z listy wyświetlanych składników
        //odpinam nasłuch
        removeSpeechListeners();
        //emit eventu czy przekazanie od razu do szukania przepisów?
        handleStartCooking();
    };

    const pauseEnteringIngredients = () => {
        removeSpeechListeners();
    }

};

const keyboardInputView = () => {

};

const toSwitchViewFromCurrent = () => {

};


module.exports = showView;

