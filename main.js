const button = document.querySelector(".search__button");
const input = document.querySelector(".search__input > input");
const banner = document.querySelector(".banner");
const recipes = document.querySelector(".recipes");
const card = document.querySelector(".card");

const createRecipe = json => {
  recipes.innerHTML = "";
  // for (let i = 0; i < json.products.length; i++) {
  const newRecipe = document.createElement("article");
  //   newRecipe.dataset.id = json.products[i].id;
  newRecipe.dataset.id = json; // do wywalenia
  newRecipe.classList.add("recipe");
  // newRecipe.innerHTML = `<div class="recipe__image" data-id="${json.products[i].id}" style="background-image: url(${json.products[i].image})"></div>
  newRecipe.innerHTML = `<div class="recipe__image" data-id="${json}" style="background-image: url(${json})"></div>
  <p data-id="${json}" class="recipe__description">${json}</p>`;
  recipes.appendChild(newRecipe);
  // }
};
button.addEventListener("click", e => {
  e.preventDefault();
  console.log(input.value);
  if (input.value) {
    //   fetch(
    //     `https://api.spoonacular.com/food/products/search?query=${input.value}&apiKey=2b3c299fe32948c1b09544ea44078485`
    //   )
    //     .then(response => response.json())
    //     .then(json => {
    //       createRecipe(json);
    //       console.log(json);
    //     });
    //   console.log(input.value);
    if (!banner.classList.contains("off")) {
      banner.classList.add("off");
    }
    if (recipes.classList.contains("off")) {
      recipes.classList.remove("off");
    }
    if (!card.classList.contains("off")) {
      card.classList.add("off");
    }
    createRecipe(input.value);
    input.value = null;
  }
});

recipes.addEventListener("click", e => {
  console.log(e.target);
  card.innerHTML = "";
  const newRecipeSummary = document.createElement("div");
  newRecipeSummary.classList.add("card__wrapper");
  newRecipeSummary.innerHTML = `
  <h1 class="card__title">${e.target.dataset.id}</h1>
  <div class="card__image"></div>
  <div>
    <p class="card__subtitle">ingredients:</p>
      <ul class="card__list">
        <li class="card__list-item">placeholder</li>
        <li class="card__list-item">placeholder</li>
        <li class="card__list-item">placeholder</li>
        <li class="card__list-item">placeholder</li>
        <li class="card__list-item">placeholder</li>
      </ul>
  </div>
  <div>
    <p class="card__subtitle">recipe:</p>
      <ol class="card__list">
        <li class="card__list-item">placeholder</li>
        <li class="card__list-item">placeholder</li>
        <li class="card__list-item">placeholder</li>
        <li class="card__list-item">placeholder</li>
      </ol>
    </div>
  `;
  recipes.classList.toggle("off");
  card.appendChild(newRecipeSummary);
  card.classList.toggle("off");
});

input.addEventListener("keyup", e => {
  if (e.code == "Comma") {
    const chips = [];
    input.value.split(",").forEach(element => {
      if (element) {
        chips.push(`<span class="mdl-chip mdl-chip--deletable">
      <span class="mdl-chip__text">${element}</span>
      <button type="button" class="mdl-chip__action"><i class="material-icons">cancel</i></button>
  </span>`);
      }
    });
    console.log("loop");
    document.querySelector(".chips").innerHTML = chips.join("");
  }
  console.log(input.value);
});
