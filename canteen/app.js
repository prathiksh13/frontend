const MENU_ITEMS = [
  { id: 1, name: "Veg Meal", category: "Meals", price: 80 },
  { id: 2, name: "Chicken Meal", category: "Meals", price: 120 },
  { id: 3, name: "Samosa", category: "Snacks", price: 30 },
  { id: 4, name: "Burger", category: "Snacks", price: 70 },
  { id: 5, name: "Tea", category: "Drinks", price: 15 },
  { id: 6, name: "Coffee", category: "Drinks", price: 25 }
];


let tray = {}; // { id: qty }
let filteredItems = [...MENU_ITEMS];


function formatRupee(n) {
  return "₹" + Math.round(Number(n));
}


function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function renderMenu(items) {
  const grid = document.getElementById("menuGrid");
  if (!grid) return;
  grid.innerHTML = "";

  for (let item of items) {
    const card = `
      <div class="card">
        <div class="name">${escapeHtml(item.name)}</div>
        <div class="meta">${escapeHtml(item.category)}</div>
        <div class="price">${formatRupee(item.price)}</div>
        <button onclick="addToTray(${item.id})">Add</button>
      </div>
    `;
    grid.innerHTML += card;
  }
}


function renderTray() {
  const trayList = document.getElementById("trayList");
  const trayTotal = document.getElementById("trayTotal");

  const ids = Object.keys(tray);
  if (ids.length === 0) {
    trayList.innerHTML = "<li>Tray is empty</li>";
    trayTotal.textContent = "₹0";
    return;
  }

  let html = "";
  let total = 0;

  for (let id of ids) {
    const item = MENU_ITEMS.find((m) => m.id == id);
    const qty = tray[id];
    const itemTotal = item.price * qty;
    total += itemTotal;

    html += `
      <li>
        ${escapeHtml(item.name)} x ${qty}
        <button onclick="removeOne(${id})">−</button>
        <button onclick="addToTray(${id})">+</button>
        <button onclick="removeAll(${id})">Remove</button>
      </li>
    `;
  }

  trayList.innerHTML = html;
  trayTotal.textContent = formatRupee(total);
}


function addToTray(id) {
  if (!tray[id]) tray[id] = 0;
  tray[id]++;
  renderTray();
}


function removeOne(id) {
  if (tray[id]) {
    tray[id]--;
    if (tray[id] <= 0) delete tray[id];
  }
  renderTray();
}

function removeAll(id) {
  delete tray[id];
  renderTray();
}

function clearTray() {
  tray = {};
  renderTray();
}

function applyFilters() {
  const category = document.getElementById("categorySelect").value;
  const sort = document.getElementById("sortSelect").value;

  filteredItems = MENU_ITEMS.filter((item) => {
    if (category === "ALL") return true;
    return item.category === category;
  });

  if (sort === "PRICE_ASC") {
    filteredItems.sort((a, b) => a.price - b.price);
  } else if (sort === "PRICE_DESC") {
    filteredItems.sort((a, b) => b.price - a.price);
  }

  renderMenu(filteredItems);
}


function resetFilters() {
  document.getElementById("categorySelect").value = "ALL";
  document.getElementById("sortSelect").value = "NONE";
  filteredItems = [...MENU_ITEMS];
  renderMenu(filteredItems);
}

window.onload = function () {
  renderMenu(MENU_ITEMS);
  renderTray();
};