// Selectors

const appStart = document.querySelector("#loaderLogo button");
const logoOverlay = document.getElementById("loaderLogo");
const ctaLocation = document.getElementById("ctaLocation");
const wall = document.querySelector("#wallBg");
const kitchen = document.querySelector("#kitchenFurniture");
const kitchenElements = document.querySelectorAll("#kitchenFurniture > div");

const toKitchenView = () => {
    logoOverlay.classList.add("hide");
    setTimeout(() => logoOverlay.remove(), 500);

};

const toFridgeView = () => {
    wall.classList.add("hide");
    kitchen.classList.add("hide");
    ctaLocation.classList.add("hide");
    setTimeout(() => {
        wall.remove();
        kitchen.remove();
        ctaLocation.remove();
    }, 1000);
};

// helpers

const utilCreateElem = (elem, html) => {
    const el = document.createElement(elem);
    el.innerHTML = html;
    return el;
};


// Start of an app

appStart.addEventListener("click", () => {
    toKitchenView();
    let button;
    setTimeout(() => {
        kitchenElements.forEach(ele => {
            if (!ele.classList.contains("fridge")) {
                ele.classList.add("grayscaled");
            } else {
                ele.addEventListener("click", () => toFridgeView());
            }
        });
        const buttonCreation = `<button class="ctaBig hide"><h3>Find what to eat :)</h3></button>`;
        const elem = utilCreateElem("div", buttonCreation);
        elem.addEventListener("click", () => toFridgeView());
        ctaLocation.insertBefore(elem, null);
        button = document.querySelector("#ctaLocation button");

    }, 1000);
    setTimeout(() => button.classList.remove("hide"), 1200);
});


