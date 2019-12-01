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
    setTimeout(() => selectMethodElement.remove(), 300);
};

const micInputView = () => {
    const contentNode = document.querySelector("#fridgeView .content");
    const templateView = `
        <div class="inputButtons">
            <button class="listen_button ctaBig">
                <i class="material-icons">mic</i> Start listening
            </button>
            <button class="stop_listen_button ctaBig hide">
                <i class="material-icons">mic_off</i>
            </button>
        </div>
        <div class="ingredientsDesc">
            <p>Say <b>let's cook</b> or click <b>let's cook button</b> if you want to look at recipes we prepared for you :)</p>
        </div>
        <div class="card__image"></div>
        <section class="card__ingredients">
            <h1>Your Ingredients: <span class="ingredientsCount"><b>0</b>/6</span></h1>
            <div class="card__list">
            </div>
        </section>
        <button class="letsCookButton ctaBig hide">
            <i class="material-icons">sentiment_very_satisfied</i> &nbsp;Let's cook :) 
        </button>`;
    const micSection = utilCreateElem("section", templateView);
    micSection.id = "micInputView";
    contentNode.insertBefore(micSection, null);
    const micSelector = document.getElementById("micInputView");
    setTimeout(() => micSelector.classList.add("show"), 500);

    // Speech rec object

    SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    // Ingredient element to push

    let ingred = document.createElement('div');
    ingred.setAttribute("class", "ingredientToBeAdded");


    const ingList = document.querySelector('.card__list');
    const ingredArray = [];
    const listenButton = document.querySelector(".listen_button");
    const fridge = document.querySelector("#mainWrapper .fridge");
    const stopListenButton = document.querySelector(".stop_listen_button");
    const ingredientsCount = document.querySelector(".content .ingredientsCount");
    const letsCookButton = document.querySelector("#micInputView .letsCookButton");
    letsCookButton.addEventListener("click", () => handleDoneEnteringIngredients());

    const removeFromList = (e) => {
        const elementToRemove = e.target.parentElement.parentElement;
        const elIndex = ingredArray.indexOf(e.target.textContent);
        ingredArray.splice(elIndex, 1);
        ingList.removeChild(elementToRemove);
        if (ingredArray.length === 0 && !letsCookButton.classList.contains("hide")) {
            letsCookButton.classList.add("hide");
        }
        const ingredientsCount = document.querySelector(".content .ingredientsCount");
        ingredientsCount.innerHTML = `<b>${ingredArray.length}</b> / 6`;
        if (ingredArray.length < 6 && ingredientsCount.classList.contains("pulsing")) {
            ingredientsCount.classList.remove("pulsing");
        }
    };


    const startListening = () => {
        listenButton.classList.add("buttonBlock");
        stopListenButton.classList.remove("hide");
        stopListenButton.addEventListener("click", () => pauseEnteringIngredients());
        recognition.addEventListener('result', handleInpuResult);
        recognition.addEventListener('end', recognition.start);
        recognition.start();
        const ingredientsContainer = document.querySelector(".card__ingredients");
        ingredientsContainer.insertBefore(ingred, ingList);
        setTimeout(() => ingred.classList.add("show"), 500);

    };

    listenButton.addEventListener('click', startListening);

    const handleFinalInput = (ingredient) => {
        ingredArray.push(ingredient);
        ingredientsCount.innerHTML = `<b>${ingredArray.length}</b> / 6`;
        if (ingredArray.length) {
            letsCookButton.classList.remove("hide");
        }

        const chipTemplate = `
            <span class="mdl-chip__text">${ingredient}</span>
            <button type="button" class="mdl-chip__action"><i class="material-icons">cancel</i></button>
        `;

        const chip = utilCreateElem("span", chipTemplate, ["mdl-chip mdl-chip--deletable"]);
        chip.lastElementChild.addEventListener("click", e => removeFromList(e));
        ingList.appendChild(chip);
        componentHandler.upgradeElement(chip);
        if (ingredArray.length === 6) {
            ingredientsCount.classList.add("pulsing");
        }
        setTimeout(() => {
            ingred.textContent = "";
            ingred.classList.remove("inputBeingAdded");
        }, 500);

    };


    const handleInpuResult = (e) => {
        //sprawdzam, czy mam miejsce na kolejny składnik

        ingred.classList.add("inputBeingAdded");
        let ingredient = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
        ingred.textContent = ingredient;

        if (e.results[0].isFinal) {
            if (ingredient === "let's cook" && ingredArray.length > 0) {
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

        pauseEnteringIngredients();
        setTimeout(() => {
            fridge.classList.add("hide");
            contentNode.classList.add("hide");
        }, 400);
        setTimeout(() => {
            const handleStartCooking = require("./recipes-view");
            handleStartCooking(ingredArray);
            fridge.remove();
            contentNode.remove();
        }, 700);

    };

    const pauseEnteringIngredients = () => {
        removeSpeechListeners();
        recognition.stop();
        ingred.classList.add("hide");
        listenButton.classList.remove("buttonBlock");
        stopListenButton.classList.add("hide");
        setTimeout(() => ingred.remove(), 500);
    }

};

const keyboardInputView = () => {
    const contentNode = document.querySelector("#fridgeView .content");
    const templateView = `
        <div class="ingredientsDesc">
            <p>Click <b>let's cook button</b> if you want to look at recipes we prepared for you :)</p>
        </div>
        <div class="card__image"></div>
        <section class="card__ingredients">
            <h1>Your Ingredients: <span class="ingredientsCount"><b>0</b>/6</span></h1>
            <div class="ingredientTextField">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="text" id="ingredientField">
                <label class="mdl-textfield__label" for="ingredientField">New Ingredient</label>
            </div>
            <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                <i class="material-icons">add</i>
            </button>
            </div>
            <div class="card__list">
            </div>
        </section>
        <button class="letsCookButton ctaBig hide">
            <i class="material-icons">sentiment_very_satisfied</i> &nbsp;Let's cook :) 
        </button>`;
    const keyboardSection = utilCreateElem("section", templateView);
    keyboardSection.id = "keyboardInputView";
    contentNode.insertBefore(keyboardSection, null);
    const keyboardTextField = document.querySelector(".mdl-textfield");
    const keyboardIngredientAdd = document.querySelector(".mdl-button");
    componentHandler.upgradeElement(keyboardTextField);
    componentHandler.upgradeElement(keyboardIngredientAdd);
    const keyboardSelector = document.getElementById("keyboardInputView");
    setTimeout(() => keyboardSelector.classList.add("show"), 500);
    const ingredientsCount = document.querySelector(".content .ingredientsCount");
    const ingList = document.querySelector('.card__list');
    const ingredArray = [];
    const fridge = document.querySelector("#mainWrapper .fridge");
    const letsCookButton = document.querySelector("#keyboardInputView .letsCookButton");
    keyboardIngredientAdd.addEventListener("click", () => handleIngredientAdd());
    letsCookButton.addEventListener("click", () => handleDoneEnteringIngredients());


    const handleIngredientAdd = () => {
        const ingredient = keyboardTextField.firstElementChild.value;
        if (ingredient !== "" && ingredArray.length <= 5) {
            ingredArray.push(ingredient);
            ingredientsCount.innerHTML = `<b>${ingredArray.length}</b> / 6`;
            if (ingredArray.length) {
                letsCookButton.classList.remove("hide");
            }

            const chipTemplate = `
                <span class="mdl-chip__text">${ingredient}</span>
                <button type="button" class="mdl-chip__action"><i class="material-icons">cancel</i></button>
            `;

            const chip = utilCreateElem("span", chipTemplate, ["mdl-chip mdl-chip--deletable"]);
            chip.lastElementChild.addEventListener("click", e => removeFromList(e));
            ingList.appendChild(chip);
            keyboardTextField.firstElementChild.value = '';
            componentHandler.upgradeElement(chip);
            if (ingredArray.length === 6) {
                ingredientsCount.classList.add("pulsing");
            }
        } else {
            keyboardTextField.firstElementChild.value = '';
        }
        const removeFromList = (e) => {
            const elementToRemove = e.target.parentElement.parentElement;
            const elIndex = ingredArray.indexOf(e.target.textContent);
            ingredArray.splice(elIndex, 1);
            ingList.removeChild(elementToRemove);
            if (ingredArray.length === 0 && !letsCookButton.classList.contains("hide")) {
                letsCookButton.classList.add("hide");
            }
            const ingredientsCount = document.querySelector(".content .ingredientsCount");
            ingredientsCount.innerHTML = `<b>${ingredArray.length}</b> / 6`;
            if (ingredArray.length < 6 && ingredientsCount.classList.contains("pulsing")) {
                ingredientsCount.classList.remove("pulsing");
            }
        };
    };

    const handleDoneEnteringIngredients = () => {
        setTimeout(() => {
            fridge.classList.add("hide");
            contentNode.classList.add("hide");
        }, 400);
        setTimeout(() => {
            const handleStartCooking = require("./recipes-view");
            handleStartCooking(ingredArray);
            fridge.remove();
            contentNode.remove();
        }, 700);

    };
};

const toSwitchViewFromCurrent = () => {

};


module.exports = showView;

