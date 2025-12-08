document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector("#menu-btn");
  const navMenu = document.querySelector("#nav-menu");
  const openIcon = document.querySelector("#open-icon");
  const closeIcon = document.querySelector("#close-icon");

  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");

    if (navMenu.classList.contains("open")) {
      openIcon.style.display = "none";   // hide ☰
      closeIcon.style.display = "inline"; // show ✕
    } else {
      openIcon.style.display = "inline";  // show ☰
      closeIcon.style.display = "none";   // hide ✕
    }
  });
});