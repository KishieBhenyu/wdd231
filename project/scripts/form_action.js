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

// DISPLAY FORM DATA FROM URL SEARCH PARAMS
const resultsBox = document.querySelector('#form-results');

if (resultsBox) {
  const params = new URLSearchParams(window.location.search);

  const fullname = params.get('fullname') || 'Not provided';
  const email = params.get('email') || 'Not provided';
  const subject = params.get('subject') || 'Not provided';
  const message = params.get('message') || 'Not provided';

  resultsBox.innerHTML = `
    <p><strong>Full Name:</strong> ${fullname}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong> ${message}</p>
  `;
}