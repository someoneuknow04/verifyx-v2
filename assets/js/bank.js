// ===== SEARCH FUNCTION =====
const searchBar = document.getElementById("searchBar");
const bankCards = document.querySelectorAll(".bank-card");

searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase();
  bankCards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    card.style.display = name.includes(query) ? "block" : "none";
  });
});

// ===== FAVORITES SYSTEM =====
const favButtons = document.querySelectorAll(".fav-btn");
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function updateFavorites() {
  favButtons.forEach(btn => {
    const card = btn.closest(".bank-card");
    const name = card.dataset.name;
    btn.textContent = favorites.includes(name) ? "💛" : "⭐";
  });
}

favButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".bank-card");
    const name = card.dataset.name;
    if (favorites.includes(name)) {
      favorites = favorites.filter(f => f !== name);
    } else {
      favorites.push(name);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateFavorites();
  });
});

updateFavorites();

// ===== DARK MODE TOGGLE =====
const toggleMode = document.getElementById("toggleMode");
toggleMode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const mode = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("mode", mode);
  toggleMode.textContent = mode === "dark" ? "☀️" : "🌙";
});

if (localStorage.getItem("mode") === "dark") {
  document.body.classList.add("dark");
  toggleMode.textContent = "☀️";
}
