import { places } from "../data/discover.mjs";

const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

// Nav toggle
navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", !expanded);
  mainNav.classList.toggle("open");
});

// Last visit message
const messageBox = document.getElementById("last-visit");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  messageBox.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
  messageBox.textContent = days === 0 ? "Back so soon! Awesome!" :
      `You last visited ${days} day${days === 1 ? "" : "s"} ago.`;
}
localStorage.setItem("lastVisit", now);

// Build cards
const container = document.querySelector(".discover-grid");
places.forEach(place => {
  const card = document.createElement("section");
  card.classList.add("place-card");
  card.innerHTML = `
    <img src="${place.image}" alt="${place.name}" loading="lazy">
    <h3>${place.name}</h3>
    <p class="address">${place.address}</p>
    <p>${place.description}</p>
    <button class="learn-btn">Learn More</button>
  `;
  container.appendChild(card);
});

// Footer year and last modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;