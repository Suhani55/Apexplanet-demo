// script.js

const recipes = [
  { title: "Grilled Chicken", ingredient: "chicken", image: "assets/recipe1.jpg", description: "Juicy grilled chicken with herbs." },
  { title: "Pasta Alfredo", ingredient: "pasta", image: "assets/recipe2.jpg", description: "Creamy alfredo pasta with parmesan." },
  { title: "Avocado Toast", ingredient: "avocado", image: "assets/recipe3.jpg", description: "Toasted bread topped with mashed avocado." }
];

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const recipeResults = document.getElementById("recipeResults");
const mealList = document.getElementById("mealList");
const clearMeals = document.getElementById("clearMeals");

// Modal elements
const recipeModal = document.getElementById("recipeModal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalDescription = document.getElementById("modalDescription");
const closeModal = document.getElementById("closeModal");

searchForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const query = searchInput.value.toLowerCase();
  recipeResults.innerHTML = "";
  const filtered = recipes.filter(r => r.ingredient.includes(query));

  if (filtered.length === 0) {
    recipeResults.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  filtered.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" />
      <h3>${recipe.title}</h3>
      <button onclick="addToMeal('${recipe.title}')">Add to Meal</button>
      <button onclick="showRecipe('${recipe.title}')">View</button>
    `;
    recipeResults.appendChild(card);
  });
});

function addToMeal(title) {
  const li = document.createElement("li");
  li.textContent = title;
  mealList.appendChild(li);
  saveMeals();
}

function showRecipe(title) {
  const recipe = recipes.find(r => r.title === title);
  if (recipe) {
    modalTitle.textContent = recipe.title;
    modalImage.src = recipe.image;
    modalDescription.textContent = recipe.description;
    recipeModal.style.display = "flex";
  }
}

closeModal.addEventListener("click", () => {
  recipeModal.style.display = "none";
});

// Contact form validation
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  if (!name.value || !email.value || !message.value) {
    formMsg.textContent = "All fields are required.";
    formMsg.style.color = "red";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    formMsg.textContent = "Please enter a valid email.";
    formMsg.style.color = "red";
    return;
  }

  formMsg.textContent = "Message sent successfully!";
  formMsg.style.color = "green";
  contactForm.reset();
});

// Save/load meal plan using localStorage
function saveMeals() {
  const items = [...mealList.children].map(li => li.textContent);
  localStorage.setItem("meals", JSON.stringify(items));
}

function loadMeals() {
  const saved = JSON.parse(localStorage.getItem("meals")) || [];
  saved.forEach(title => {
    const li = document.createElement("li");
    li.textContent = title;
    mealList.appendChild(li);
  });
}

clearMeals.addEventListener("click", () => {
  mealList.innerHTML = "";
  localStorage.removeItem("meals");
});

window.onload = loadMeals;
