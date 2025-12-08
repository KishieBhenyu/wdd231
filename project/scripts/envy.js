// HAMBURGER MENU
const menuBtn = document.querySelector('#menu-btn');
const navMenu = document.querySelector('#nav-menu');
const openIcon = document.querySelector('#open-icon');
const closeIcon = document.querySelector('#close-icon');

if (menuBtn && navMenu && openIcon && closeIcon) {
  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    openIcon.style.display = isOpen ? 'none' : 'inline';
    closeIcon.style.display = isOpen ? 'inline' : 'none';
  });
}

// FOOTER YEAR
const yearSpan = document.querySelector('#year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}