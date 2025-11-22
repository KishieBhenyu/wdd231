document.addEventListener("DOMContentLoaded", () => {

  // nav toggle (same behavior)
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !expanded);
      mainNav.classList.toggle("open");
    });
  }

  // Show current year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const params = new URLSearchParams(location.search);

  // Required fields to display: firstName, lastName, email, phone, organization, timestamp
  const firstName = params.get("firstName") || "(not provided)";
  const lastName = params.get("lastName") || "(not provided)";
  const email = params.get("email") || "(not provided)";
  const phone = params.get("phone") || "(not provided)";
  const organization = params.get("organization") || "(not provided)";
  const timestamp = params.get("timestamp") || "(not provided)";

  // Format timestamp for readability if present
  let tsDisplay = timestamp;
  if (timestamp && timestamp !== "(not provided)") {
    try {
      const d = new Date(timestamp);
      if (!isNaN(d)) {
        tsDisplay = d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
      }
    } catch {}
  }

  const container = document.getElementById("submissionSummary");
  container.innerHTML = `
    <dl>
      <dt><strong>First name</strong></dt><dd>${escapeHtml(firstName)}</dd>

      <dt><strong>Last name</strong></dt><dd>${escapeHtml(lastName)}</dd>

      <dt><strong>Email</strong></dt><dd><a href="mailto:${encodeURIComponent(email)}">${escapeHtml(email)}</a></dd>

      <dt><strong>Mobile phone</strong></dt><dd>${escapeHtml(phone)}</dd>

      <dt><strong>Business / Organization</strong></dt><dd>${escapeHtml(organization)}</dd>

      <dt><strong>Form loaded timestamp</strong></dt><dd>${escapeHtml(tsDisplay)}</dd>
    </dl>
  `;

});

// minimal HTML escaping helper
function escapeHtml(s){
  return String(s)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;");
}