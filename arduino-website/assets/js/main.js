(function () {
  const qs = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

  // Mobile nav toggle
  const navToggle = qs('[data-nav-toggle]');
  const navLinks = qs('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on link click (mobile)
    qsa('.nav-links a').forEach((a) => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Active nav link by data-page attribute on body
  const page = document.body.getAttribute('data-page');
  if (page) {
    const link = qs(`.nav-links a[data-page="${page}"]`);
    if (link) link.classList.add('active');
  }

  // Intersection Observer for reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  qsa('.reveal').forEach((el) => observer.observe(el));

  // Project filters
  const filterContainer = qs('[data-filter-group]');
  if (filterContainer) {
    const filterButtons = qsa('.filter-btn', filterContainer);
    const cards = qsa('[data-project-card]');

    const applyFilter = (value) => {
      cards.forEach((card) => {
        const difficulty = card.getAttribute('data-difficulty');
        const matches = (value === 'all') || (difficulty === value);
        card.style.display = matches ? '' : 'none';
      });
    };

    filterButtons.forEach((btn) => btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const value = btn.getAttribute('data-filter');
      applyFilter(value);
    }));
  }

  // Tutorials accordion: enhance <details>
  qsa('details').forEach((det) => {
    det.addEventListener('toggle', () => {
      // Close others when one opens (accordion behavior)
      if (det.open) {
        qsa('details').forEach((other) => { if (other !== det) other.removeAttribute('open'); });
      }
    });
  });

  // Contact form handler
  const form = qs('#contact-form');
  const alertBox = qs('#contact-alert');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const subject = String(formData.get('subject') || '').trim();
      const message = String(formData.get('message') || '').trim();

      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!name || !isValidEmail || !message) {
        showAlert('Please fill in name, a valid email, and your message.', 'error');
        return;
      }

      // Simulate success
      showAlert('Thanks! Your message has been sent. We\'ll get back to you soon.', 'success');
      form.reset();
    });
  }

  function showAlert(text, type) {
    if (!alertBox) return;
    alertBox.textContent = text;
    alertBox.classList.add('show');
    alertBox.style.background = type === 'error' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(16, 185, 129, 0.12)';
    alertBox.style.borderColor = type === 'error' ? 'rgba(239, 68, 68, 0.28)' : 'rgba(16, 185, 129, 0.28)';
  }
})();