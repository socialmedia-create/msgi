(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('.theme-icon');
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const toast = document.getElementById('toast');

  // Theme is stored locally so the visitor's preference survives refreshes.
  const savedTheme = localStorage.getItem('ddc-theme');
  if (savedTheme === 'dark') root.dataset.theme = 'dark';
  updateThemeButton();

  themeToggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    if (root.dataset.theme === 'light') delete root.dataset.theme;
    localStorage.setItem('ddc-theme', root.dataset.theme || 'light');
    updateThemeButton();
  });

  function updateThemeButton() {
    const isDark = root.dataset.theme === 'dark';
    themeIcon.textContent = isDark ? '☀' : '☾';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));

  // Filter event cards.
  const filterButtons = [...document.querySelectorAll('.filter-chip')];
  const eventCards = [...document.querySelectorAll('.event-card')];
  filterButtons.forEach(button => button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.toggle('active', item === button));
    const filter = button.dataset.filter;
    eventCards.forEach(card => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !visible);
    });
  }));

  // Small reveal animations respect the user's reduced-motion preference.
  const revealTargets = document.querySelectorAll('.section-heading, .about-card, .event-card, .gallery-photo, .team-feature, .contact-card');
  revealTargets.forEach(el => el.classList.add('reveal'));
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(el => observer.observe(el));
  } else revealTargets.forEach(el => el.classList.add('visible'));

  // Photo gallery: filters plus a lightbox with previous/next.
  const lightbox = document.getElementById('lightbox');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxImg = document.getElementById('lightboxImg');
  const photos = [...document.querySelectorAll('.gallery-photo')];
  let current = 0;
  let lastFocus = null;

  document.querySelectorAll('[data-gfilter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-gfilter]').forEach(item => item.classList.toggle('active', item === button));
    const filter = button.dataset.gfilter;
    photos.forEach(photo => photo.classList.toggle('is-hidden', filter !== 'all' && photo.dataset.cat !== filter));
  }));

  const visiblePhotos = () => photos.filter(photo => !photo.classList.contains('is-hidden'));
  const showPhoto = photo => {
    lightboxImg.src = photo.dataset.src;
    lightboxImg.alt = photo.querySelector('img').alt;
    lightboxImg.hidden = false;
    lightboxTitle.textContent = photo.dataset.title;
    lightboxCaption.textContent = photo.dataset.caption;
    lightbox.classList.add('has-photo');
  };
  const step = dir => {
    const list = visiblePhotos();
    if (!list.length) return;
    current = (list.indexOf(photos[current]) + dir + list.length) % list.length;
    current = photos.indexOf(list[current]);
    showPhoto(photos[current]);
  };
  const closeLightbox = () => {
    lightbox.classList.remove('open', 'has-photo');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.hidden = true;
    lightboxImg.removeAttribute('src');
    if (lastFocus) lastFocus.focus();
  };
  photos.forEach((photo, index) => photo.addEventListener('click', () => {
    lastFocus = photo;
    current = index;
    showPhoto(photo);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.getElementById('lightboxClose').focus();
  }));
  document.getElementById('lightboxPrev').addEventListener('click', () => step(-1));
  document.getElementById('lightboxNext').addEventListener('click', () => step(1));
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', event => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') step(-1);
    if (event.key === 'ArrowRight') step(1);
  });

  // Frontend-only contact form: validate fields, then clearly explain the limitation.
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    showToast('Thanks for saying hello! Connect a backend to receive messages.');
    document.getElementById('formNote').textContent = 'Demo complete — this form does not send or store your message.';
    contactForm.reset();
  });

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(() => toast.classList.remove('show'), 4200);
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();