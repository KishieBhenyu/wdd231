
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

// CONTACT FORM LOGIC
const form = document.querySelector('.contact-form');
const fullNameInput = document.querySelector('#fullname');
const emailInput = document.querySelector('#email');
const subjectInput = document.querySelector('#subject');
const messageInput = document.querySelector('#message');

// Simple confirmation "modal" using a dynamically created element
let confirmationBox = null;

function showConfirmation(name, subject) {
  if (!confirmationBox) {
    confirmationBox = document.createElement('div');
    confirmationBox.style.position = 'fixed';
    confirmationBox.style.bottom = '1rem';
    confirmationBox.style.right = '1rem';
    confirmationBox.style.background = '#004aad';
    confirmationBox.style.color = '#fff';
    confirmationBox.style.padding = '1rem 1.5rem';
    confirmationBox.style.borderRadius = '8px';
    confirmationBox.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    confirmationBox.style.zIndex = '2000';
    confirmationBox.style.maxWidth = '260px';
    confirmationBox.style.fontSize = '0.9rem';
    document.body.appendChild(confirmationBox);
  }

  confirmationBox.innerHTML = `
    <strong>Message ready to send</strong><br>
    From: ${name}<br>
    Subject: ${subject}
  `;

  confirmationBox.style.display = 'block';

  setTimeout(() => {
    confirmationBox.style.display = 'none';
  }, 4000);
}

// Load saved name & email from localStorage (usability improvement)
const savedContact = localStorage.getItem('contactInfo');
if (savedContact) {
  try {
    const info = JSON.parse(savedContact);
    if (info.fullname && fullNameInput) fullNameInput.value = info.fullname;
    if (info.email && emailInput) emailInput.value = info.email;
  } catch (e) {
    console.warn('Could not parse saved contact info:', e);
  }
}

if (form) {
  form.addEventListener('submit', (event) => {
    // Basic client-side validation
    const nameVal = fullNameInput?.value.trim();
    const emailVal = emailInput?.value.trim();
    const subjectVal = subjectInput?.value.trim();
    const messageVal = messageInput?.value.trim();

    if (!nameVal || !emailVal || !subjectVal || !messageVal) {
      event.preventDefault();
      alert('Please fill in all required fields before submitting the form.');
      return;
    }

    // Save name and email to localStorage
    const contactInfo = {
      fullname: nameVal,
      email: emailVal
    };
    localStorage.setItem('contactInfo', JSON.stringify(contactInfo));

    // Show confirmation UI but still allow normal GET to form_action.html
    showConfirmation(nameVal, subjectVal);
  });
}