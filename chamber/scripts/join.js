const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
    mainNav.classList.toggle("open");
  });

  // close mobile nav when a link is clicked
  document.querySelectorAll("#mainNav a").forEach(a => {
    a.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", false);
    });
  });
}

// Fill the hidden timestamp with the current date/time when the form loads
document.addEventListener("DOMContentLoaded", () => {
  const ts = document.getElementById("timestamp");
  if (ts) {
    // Use ISO string for machine-friendly format; also include a readable string
    ts.value = new Date().toISOString();
  }

  // Kick off card animations: add class to each membership-card to start animation
  document.querySelectorAll(".membership-card").forEach(card => {
    // small timeout to ensure CSS animation runs after paint
    requestAnimationFrame(() => {
      card.style.opacity = "1";
    });
  });

  // modal logic
  initModals();
});

// Modal utilities
function initModals() {
  const openButtons = document.querySelectorAll(".open-modal");
  const backdrop = document.getElementById("modal-backdrop");
  let lastFocused = null;

  openButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const modalId = btn.getAttribute("data-modal");
      openModal(modalId, btn);
    });
  });

  // close buttons
  document.querySelectorAll(".modal-close").forEach(btn => {
    btn.addEventListener("click", () => closeAllModals());
  });

  // backdrop click closes
  if (backdrop) {
    backdrop.addEventListener("click", () => closeAllModals());
  }

  // Esc key closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllModals();
  });

  function openModal(id, opener) {
    const modal = document.getElementById(id);
    if (!modal) return;
    lastFocused = opener || document.activeElement;

    // show backdrop + modal
    if (backdrop) {
      backdrop.hidden = false;
      backdrop.setAttribute("aria-hidden", "false");
    }
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");

    // move focus to modal close button for accessibility
    const closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();

    // simple trap: keep TAB inside modal by capturing focusable elements
    trapFocus(modal);
  }

  function closeAllModals() {
    document.querySelectorAll(".modal").forEach(m => {
      m.hidden = true;
      m.setAttribute("aria-hidden", "true");
    });
    if (backdrop) {
      backdrop.hidden = true;
      backdrop.setAttribute("aria-hidden", "true");
    }
    // restore focus
    if (lastFocused) lastFocused.focus();
  }

  // Basic focus trap
  function trapFocus(modal) {
    const focusable = modal.querySelectorAll('a[href], button:not([disabled]), textarea, input, select');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function handleTab(e) {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    modal.addEventListener("keydown", handleTab);
    // remove handler when modal closes
    const observer = new MutationObserver(() => {
      if (modal.hidden) {
        modal.removeEventListener("keydown", handleTab);
        observer.disconnect();
      }
    });
    observer.observe(modal, { attributes: true, attributeFilter: ["hidden"] });
  }
}