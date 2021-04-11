const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillioners = document.getElementById("show-millioners");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

for (let i = 0; i < 6; i++) {
  getRandomUser();
}

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
    image: `${user.picture.medium}`,
  };

  addData(newUser);
}

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDom();
}

function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDom();
}

function showOnlyMillioners() {
  data = data.filter((item) => item.money > 1000000);

  updateDom();
}

function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total wealth: <strong> ${formatMoney(
    wealth
  )}</strong></h3>`;

  main.appendChild(wealthEl);
}

function addData(obj) {
  data.push(obj);

  updateDom();
}

function updateDom(providedData = data) {
  // Clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<img src="${item.image}"/><strong>${
      item.name
    }</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

// Format number as money

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillioners.addEventListener("click", showOnlyMillioners);
calculateWealthBtn.addEventListener("click", calculateWealth);
