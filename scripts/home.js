// navigation.js
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('mainNav');
  const toggle = document.getElementById('navToggle');

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    // toggle visibility
    if (nav.style.display === 'block') {
      nav.style.display = '';
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      nav.style.display = 'block';
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  // close nav on resize to large screen to avoid stuck state
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 700) {
      nav.style.display = '';
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// date.js
document.addEventListener('DOMContentLoaded', () => {
  // current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // last modified (document.lastModified is okay for this assignment)
  const lm = document.getElementById('lmValue');
  if (lm) lm.textContent = document.lastModified || 'Unknown';
});

// courses.js
// sample courses array — replace/edit as needed per your course list
const courses = [
  { id: 1, code: 'WDD 130', title: 'Web Development Basics', subject: 'WDD', credits: 3, completed: true },
  { id: 2, code: 'WDD 131', title: 'Front-End Development', subject: 'WDD', credits: 3, completed: false },
  { id: 3, code: 'WDD 231', title: 'Intermediate Web Dev', subject: 'WDD', credits: 3, completed: false },
  { id: 4, code: 'CSE 140', title: 'Intro to Programming', subject: 'CSE', credits: 3, completed: true },
  { id: 5, code: 'CSE 210', title: 'Data Structures', subject: 'CSE', credits: 3, completed: false }
];

document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.getElementById('coursesList');
  const creditsCountEl = document.getElementById('creditsCount');
  const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));

  function renderCourses(filter = 'all') {
    // filter array
    let filtered = courses.slice();
    if (filter !== 'all') {
      filtered = filtered.filter(c => c.subject === filter);
    }

    // clear
    listEl.innerHTML = '';

    // build cards
    filtered.forEach(course => {
      const card = document.createElement('article');
      card.className = 'course-card';
      if (course.completed) card.classList.add('completed');

      card.innerHTML = `
        <div class="course-meta">
          <div class="course-code">${course.code}</div>
          <div class="course-title">${course.title}</div>
        </div>
        <div class="course-credits">${course.credits} credit${course.credits !== 1 ? 's' : ''}</div>
      `;
      // accessible label for completion
      card.setAttribute('aria-label', `${course.code} ${course.title}. ${course.credits} credits. ${course.completed ? 'Completed' : 'Not completed'}`);

      listEl.appendChild(card);
    });

    // total credits via reduce
    const totalCredits = filtered.reduce((sum, c) => sum + (Number(c.credits) || 0), 0);
    creditsCountEl.textContent = totalCredits;
  }

  // initial render
  renderCourses('all');

  // filter handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const filter = btn.dataset.filter;
      filterBtns.forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      renderCourses(filter);
    });
  });
});