
async function loadProducts() {
  try {
    const response = await fetch('products.json');

    if (!response.ok) {
      throw new Error(`Failed to load products.json: ${response.status}`);
    }

    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Fetch Error:', error);
    const grid = document.getElementById('productGrid');
    if (grid) {
      grid.innerHTML = "<p class='error'>⚠ Could not load products. Check console.</p>";
    }
  }
}



function displayProducts(products) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  grid.innerHTML = ''; 

  products.forEach((p) => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
      <img 
        data-src="${p.img}" 
        alt="${p.name}" 
        class="lazy-img"
        loading="lazy"
      >
      <h3>${p.name}</h3>
      <p>${p.cpu} | ${p.ram} | ${p.storage}</p>
      <p class="price">$${p.price}</p>
    `;

    card.addEventListener('click', () => openModal(p));
    grid.appendChild(card);
  });

  lazyLoadImages();
}


function lazyLoadImages() {
  const lazyImages = document.querySelectorAll('.lazy-img');

  if (!('IntersectionObserver' in window)) {
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
      img.classList.remove('lazy-img');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const img = e.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy-img');
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => observer.observe(img));
}

//4. MODAL FUNCTIONALITY 
function openModal(p) {
  const modal = document.getElementById('productModal');
  const modalImage = document.getElementById('modalImage');
  const modalName = document.getElementById('modalName');
  const modalSpecs = document.getElementById('modalSpecs');
  const modalPrice = document.getElementById('modalPrice');

  if (!modal || !modalImage || !modalName || !modalSpecs || !modalPrice) return;

  modalImage.src = p.img;
  modalImage.alt = p.name;
  modalName.textContent = p.name;
  modalSpecs.textContent = `${p.cpu} | ${p.ram} | ${p.storage}`;
  modalPrice.textContent = `$${p.price}`;

  modal.style.display = 'flex';
}

const closeModalBtn = document.getElementById('closeModal');
const modalEl = document.getElementById('productModal');

if (closeModalBtn && modalEl) {
  closeModalBtn.onclick = () => {
    modalEl.style.display = 'none';
  };

  window.onclick = (e) => {
    if (e.target === modalEl) {
      modalEl.style.display = 'none';
    }
  };
}

//5. MENU 
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');
const openIcon = document.getElementById('open-icon');
const closeIcon = document.getElementById('close-icon');

if (menuBtn && navMenu && openIcon && closeIcon) {
  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');

    openIcon.style.display = isOpen ? 'none' : 'inline';
    closeIcon.style.display = isOpen ? 'inline' : 'none';
  });
}

//6. FOOTER YEAR 
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

//7. AUTO‑RUN ON LOAD 
loadProducts();