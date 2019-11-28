import "./sass/all.scss";

// const button = document.querySelector(".search__button");
// const input = document.querySelector(".search__input > input");
// const controls = document.querySelector(".search__input");
// const banner = document.querySelector(".banner");
// const recipes = document.querySelector(".recipes");
// const card = document.querySelector(".card");
//
// const recipeSummary = json => {
//   const newCard = document.createElement("article");
//   newCard.innerHTML = `
//   ${json}
//   `;
//   card.appendChild(newCard);
// };
//
// const createRecipe = json => {
//   for (let i = 0; i < json.products.length; i++) {
//     const newRecipe = document.createElement("article");
//     newRecipe.dataset.id = json.products[i].id;
//     newRecipe.classList.add("recipe");
//     newRecipe.classList.add("container");
//     newRecipe.innerHTML = `<div class="recipe__image" data-id="${json.products[i].id}" style="background-image: url(${json.products[i].image})"></div>
//     <p data-id="${json.products[i].id}" class="recipe__description">${json.products[i].title}</p>`;
//     recipes.appendChild(newRecipe);
//   }
// };
// button.addEventListener("click", e => {
//   e.preventDefault();
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
//
// recipes.addEventListener("click", e => {
//   console.log(e.target.dataset.id);
//   fetch(
//     `https://api.spoonacular.com/food/products/search?query=${input.value}&apiKey=2b3c299fe32948c1b09544ea44078485`
//   )
//     .then(response => response.json())
//     .then(json => {
//       recipeSummary(json);
//       console.log(json);
//     });
//   recipes.classList.toggle("off");
//   controls.classList.toggle("off");
// });
