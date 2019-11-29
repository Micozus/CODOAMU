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
};

const micInputView = () => {

};

const keyboardInputView = () => {

};


module.exports = showView;
