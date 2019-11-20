const button = document.querySelector(".search__button");
const input = document.querySelector(".search__input");
const banner = document.querySelector(".banner");
const recipes = document.querySelector(".recipes");

const createRecipe = json => {
  for (recipe of json) {
    const newRecipe = document.createElement("article");
    newRecipe.classList.add("recipe");
    newRecipe.classList.add("container");
    newRecipe.innerHTML = `<div class="recipe__image" style="background-image: url(${recipe.image})"></div>
    <a href="#" class="recipe__description">${recipe.title}</a>`;
    recipes.appendChild(newRecipe);
  }
};

// button.addEventListener("click", e => {
//   e.preventDefault();
//   console.log(input.value);
//   if (input.value) {
//     fetch(
//       `https://api.spoonacular.com/food/products/search?query=${input.value}&apiKey=2b3c299fe32948c1b09544ea44078485`
//     )
//       .then(response => response.json())
//       .then(json => {
//         createRecipe(json);
//         console.log(json);
//       });
//     console.log(input.value);
//     if (!banner.classList.contains("off")) {
//       banner.classList.add("off");
//     }
//     input.value = null;
//   }
// });

button.addEventListener("click", e => {
  e.preventDefault();
  console.log(input.value);
  if (input.value) {
    ingr = input.value.replace(new RegExp(' ', 'g'), ',');
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients=${ingr}&apiKey=649be07875ee49d9ac67a87858375775`)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        createRecipe(json);
      });
    console.log(input.value);
    if (!banner.classList.contains("off")) {
      banner.classList.add("off");
    }
    input.value = null;
  }
});

