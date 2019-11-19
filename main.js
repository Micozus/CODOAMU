const button = document.querySelector(".search__button");
const input = document.querySelector(".search__input");
const banner = document.querySelector(".banner");
const recipes = document.querySelector(".recipes");

const createRecipe = json => {
  for (let i = 0; i < json.length; i++) {
    const newRecipe = document.createElement("article");
    newRecipe.classList.add("recipe");
    newRecipe.classList.add("container");
    newRecipe.innerHTML = `<div class="recipe__image" style="background-image: url(https://picsum.photos/id/${i}/100/100)"></div>
    <a href="#" class="recipe__description">${json[i].title}</a>`;
    recipes.appendChild(newRecipe);
  }
};
button.addEventListener("click", e => {
  e.preventDefault();
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(json => {
      createRecipe(json);
      console.log(json);
    });
  console.log(input.value);
  if (!banner.classList.contains("off")) {
    banner.classList.add("off");
  }
  input.value = null;
});
