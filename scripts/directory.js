const membersEl = document.getElementById("members");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");
const searchInput = document.getElementById("search");
const levelFilter = document.getElementById("levelFilter");
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

document.getElementById("year").textContent = new Date().getFullYear();

/* NAV TOGGLE */
navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", !expanded);
  mainNav.classList.toggle("open");
});

/* LOAD MEMBERS FROM JSON */
async function loadMembers() {
  const res = await fetch("data/members.json");
  const members = await res.json();

  // BUILD DIRECTORY
  membersEl.innerHTML = "";
  members.forEach(m => {
    const card = document.createElement("article");
    card.className = "member-card";
    card.dataset.level = m.level;
    card.innerHTML = `
      <img class="logo-img" src="${m.image}" alt="${m.name}" />
      <h3>${m.name}</h3>
      <p>${m.address}</p>
      <p>${m.phone}</p>
      <p><a href="${m.website}" target="_blank">${m.website.replace("https://","")}</a></p>
    `;
    membersEl.appendChild(card);
  });

  buildSpotlight(members);
}
loadMembers();

/* SPOTLIGHT (Random Gold/Silver) */
function buildSpotlight(members) {
  const spotlightBox = document.getElementById("spotlightBox");
  const premium = members.filter(m => m.level >= 2);
  const selected = premium.sort(() => 0.5 - Math.random()).slice(0, 3);

  spotlightBox.innerHTML = selected.map(m => `
    <div class="spotlight-card">
      <img class="logo-img" src="${m.image}" alt="${m.name}" />
      <h3>${m.name}</h3>
      <p>${m.address}</p>
    </div>
  `).join("");
}

/* WEATHER (Open-Meteo API) */
async function loadWeather() {
  try {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=-17.83&longitude=31.05&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=Africa%2FHarare";
    const res = await fetch(url);
    const data = await res.json();

    const cur = data.current_weather;
    const daily = data.daily;

    document.getElementById("weatherBox").innerHTML = `
      <h3>Current: ${cur.temperature}°C — ${cur.weathercode}</h3>
      <p>3-Day Forecast:</p>
      <ul>
        <li>${daily.temperature_2m_max[0]}° / ${daily.temperature_2m_min[0]}°</li>
        <li>${daily.temperature_2m_max[1]}° / ${daily.temperature_2m_min[1]}°</li>
        <li>${daily.temperature_2m_max[2]}° / ${daily.temperature_2m_min[2]}°</li>
      </ul>
    `;
  } catch {
    document.getElementById("weatherBox").textContent = "Weather unavailable.";
  }
}
loadWeather();

/* VIEW TOGGLE */
function setView(view) {
  membersEl.classList.toggle("grid-view", view === "grid");
  membersEl.classList.toggle("list-view", view === "list");

  gridBtn.setAttribute("aria-pressed", view === "grid");
  listBtn.setAttribute("aria-pressed", view === "list");
}
gridBtn.onclick = () => setView("grid");
listBtn.onclick = () => setView("list");

/* SEARCH + FILTER */
function filterMembers() {
  const query = searchInput.value.toLowerCase();
  const level = levelFilter.value;

  document.querySelectorAll(".member-card").forEach(card => {
    const text = card.textContent.toLowerCase();
    const matches = text.includes(query) && (level === "all" || card.dataset.level === level);
    card.style.display = matches ? "" : "none";
  });
}
searchInput.addEventListener("input", filterMembers);
levelFilter.addEventListener("change", filterMembers);

/* DEFAULT VIEW */
setView(window.innerWidth < 420 ? "list" : "grid");

[
  {
    "name": "Harare Textile Co.",
    "level": "3",
    "image": "images/harare-textile.png",
    "address": "18 Robert Mugabe Rd, Harare",
    "phone": "+263 4 700123",
    "website": "https://example.com/harare-textile"
  },
  {
    "name": "Sakunda Logistics",
    "level": "2",
    "image": "images/sakunda.png",
    "address": "67 Borrowdale Rd, Harare",
    "phone": "+263 4 701234",
    "website": "https://example.com/sakunda"
  },
  {
    "name": "Zim Agro Supplies",
    "level": "1",
    "image": "images/zim-agro.png",
    "address": "4 Harare-West Market, Harare",
    "phone": "+263 4 702345",
    "website": "https://example.com/zim-agro"
  },
  {
    "name": "Sunrise Cafe",
    "level": "1",
    "image": "images/sunrise.png",
    "address": "22 Samora Machel Ave, Harare",
    "phone": "+263 71 300001",
    "website": "https://example.com/sunrise-cafe"
  },
  {
    "name": "Innovate Hub Harare",
    "level": "2",
    "image": "images/innovate.png",
    "address": "Innovation Park, Mt Pleasant",
    "phone": "+263 77 222333",
    "website": "https://example.com/innovate-hub"
  },
  {
    "name": "Greenfield Pharmacies",
    "level": "3",
    "image": "images/greenfield.png",
    "address": "2 Josiah Tongogara St, Harare",
    "phone": "+263 4 703456",
    "website": "https://example.com/greenfield"
  },
  {
    "name": "Karibu Travel",
    "level": "1",
    "image": "images/karibu.png",
    "address": "10 Kwame Nkrumah Ave, Harare",
    "phone": "+263 77 777888",
    "website": "https://example.com/karibu"
  }
]