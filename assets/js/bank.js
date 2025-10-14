const banks = [
  { name: "SBI", url: "https://www.onlinesbi.sbi", logo: "assets/images/logos/sbi.png" },
  { name: "HDFC", url: "https://www.hdfcbank.com", logo: "assets/images/logos/hdfc.png" },
  { name: "ICICI", url: "https://www.icicibank.com", logo: "assets/images/logos/icici.png" },
  { name: "Axis Bank", url: "https://www.axisbank.com", logo: "assets/images/logos/axis.png" },
  { name: "Kotak", url: "https://www.kotak.com", logo: "assets/images/logos/kotak.png" },
];

const grid = document.getElementById("bankGrid");
const search = document.getElementById("bankSearch");

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function toggleFavorite(name) {
  let favs = getFavorites();
  if (favs.includes(name)) favs = favs.filter(f => f !== name);
  else favs.push(name);
  localStorage.setItem("favorites", JSON.stringify(favs));
  renderBanks(banks);
}

function renderBanks(list) {
  const favs = getFavorites();
  grid.innerHTML = "";

  list.forEach(bank => {
    const card = document.createElement("div");
    card.className = "bank-card";
    card.innerHTML = `
      <img src="${bank.logo}" alt="${bank.name}">
      <h3>${bank.name}</h3>
      <div class="bank-actions">
        <a href="${bank.url}" target="_blank">Visit</a>
        <button class="fav-btn ${favs.includes(bank.name) ? 'fav' : ''}" 
          onclick="toggleFavorite('${bank.name}')">★</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

search.addEventListener("input", () => {
  const q = search.value.toLowerCase();
  renderBanks(banks.filter(b => b.name.toLowerCase().includes(q)));
});

renderBanks(banks);
