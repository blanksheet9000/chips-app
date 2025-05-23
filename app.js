const chips = [
  {
    id: 1,
    name: "Lays Сметана и Лук",
    brand: "Lays",
    image: "https://i.imgur.com/Fmh1kHG.jpg"
  },
  {
    id: 2,
    name: "Pringles Paprika",
    brand: "Pringles",
    image: "https://i.imgur.com/yaeH8Fl.jpg"
  },
  {
    id: 3,
    name: "Cheetos Crunchy",
    brand: "Cheetos",
    image: "https://i.imgur.com/UeJWZGB.jpg"
  },
  {
    id: 4,
    name: "Lays Краб",
    brand: "Lays",
    image: "https://i.imgur.com/jJwDsPo.jpg"
  },
  {
    id: 5,
    name: "Pringles Original",
    brand: "Pringles",
    image: "https://i.imgur.com/wl5dPdt.jpg"
  },
  {
    id: 6,
    name: "Cheetos Flamin' Hot",
    brand: "Cheetos",
    image: "https://i.imgur.com/HnELsJp.jpg"
  }
];

let currentTab = 'all';

function setTab(tab) {
  currentTab = tab;
  renderChips();
}

const container = document.getElementById('chip-list');
const searchInput = document.getElementById('search');
const brandFilter = document.getElementById('brand-filter');

function renderChips() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedBrand = brandFilter.value;
  container.innerHTML = '';

  const filtered = chips.filter(chip => {
    const matchName = chip.name.toLowerCase().includes(searchTerm);
    const matchBrand = selectedBrand ? chip.brand === selectedBrand : true;
    const matchTab = currentTab === 'fav' ? localStorage.getItem(`fav-${chip.id}`) : true;
    return matchName && matchBrand && matchTab;
  });

  filtered.forEach(chip => {
    const isTried = localStorage.getItem(`tried-${chip.id}`);
    const isFav = localStorage.getItem(`fav-${chip.id}`);

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${chip.image}" alt="${chip.name}" />
      <h3>${chip.brand}</h3>
      <p>${chip.name}</p>
      <button onclick="toggleTried(${chip.id})">
        ${isTried ? 'Уже пробовал' : 'Пробовал'}
      </button>
      <button onclick="toggleFav(${chip.id})" style="background:${isFav ? 'red' : '#007BFF'};">
        ❤
      </button>
    `;
    container.appendChild(card);
  });
}

function toggleTried(id) {
  const key = `tried-${id}`;
  localStorage.getItem(key) ? localStorage.removeItem(key) : localStorage.setItem(key, 'true');
  renderChips();
}

function toggleFav(id) {
  const key = `fav-${id}`;
  localStorage.getItem(key) ? localStorage.removeItem(key) : localStorage.setItem(key, 'true');
  renderChips();
}

searchInput.addEventListener('input', renderChips);
brandFilter.addEventListener('change', renderChips);

renderChips();