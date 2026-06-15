let coins = Number(localStorage.getItem("coins")) || 500;
let level = Number(localStorage.getItem("level")) || 1;
let xp = Number(localStorage.getItem("xp")) || 0;
let collection = JSON.parse(localStorage.getItem("collection")) || [];

function save() {
  localStorage.setItem("coins", coins);
  localStorage.setItem("level", level);
  localStorage.setItem("xp", xp);
  localStorage.setItem("collection", JSON.stringify(collection));
}

function getRandomChip() {
  let r = Math.random() * 100;

  if (r < 60) {
    return CHIPS.filter(x => x.rarity === "common")[Math.floor(Math.random() * CHIPS.filter(x => x.rarity === "common").length)];
  }

  if (r < 85) {
    return CHIPS.filter(x => x.rarity === "rare")[Math.floor(Math.random() * CHIPS.filter(x => x.rarity === "rare").length)];
  }

  if (r < 97) {
    return CHIPS.filter(x => x.rarity === "epic")[Math.floor(Math.random() * CHIPS.filter(x => x.rarity === "epic").length)];
  }

  return CHIPS.filter(x => x.rarity === "legendary")[Math.floor(Math.random() * CHIPS.filter(x => x.rarity === "legendary").length)];
}

function gainXP(amount) {
  xp += amount;

  while (xp >= level * 100) {
    xp -= level * 100;
    level++;
    coins += level * 50;
    alert("🎉 Новый уровень: " + level);
  }
}

function openPack(price) {

  if (coins < price) {
    alert("Недостаточно монет!");
    return;
  }

  coins -= price;

  const chip = getRandomChip();

  collection.push(chip);

  gainXP(25);

  document.getElementById("lastChip").innerHTML =
    `<h2>${chip.name}</h2>
     <p>Редкость: ${chip.rarity}</p>`;

  render();
}

function dailyReward() {

  const last = localStorage.getItem("dailyReward");

  const today = new Date().toDateString();

  if (last === today) {
    alert("Сегодня награда уже получена");
    return;
  }

  coins += 250;

  localStorage.setItem("dailyReward", today);

  alert("🎁 Получено 250 монет!");
  render();
}

function render() {

  document.getElementById("coins").textContent = coins;
  document.getElementById("level").textContent = level;
  document.getElementById("xp").textContent = xp;
  document.getElementById("count").textContent = collection.length;

  const list = document.getElementById("collection");

  list.innerHTML = "";

  collection.forEach(chip => {

    const div = document.createElement("div");

    div.className = chip.rarity === "legendary"
      ? "chip legendary"
      : "chip";

    div.textContent = chip.name;

    list.appendChild(div);

  });

  save();
}

window.onload = render;
