// EDI CLUB - Main Application Script
// Powers interactive modals, filters, dynamic cards, theme switching, and animations.

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  renderAboutSection();
  renderVisionMission();
  renderWhatWeDo();
  renderActivities();
  renderCelebrations();
  renderJourney();
  renderStats();
  renderTeam();
  renderGallery();
  renderWhyJoin();
  initModals();
  initContactForm();
  initScrollAnimations();
});

// -------------------------------------------------------------
// 1. Theme Management (Default: Light, Toggleable: Dark)
// -------------------------------------------------------------
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check localStorage or default to 'light' (as specifically requested)
  const savedTheme = localStorage.getItem('edi_theme') || 'light';
  
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    updateThemeIcon('dark');
  } else {
    document.documentElement.classList.remove('dark');
    updateThemeIcon('light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      const current = isDark ? 'dark' : 'light';
      localStorage.setItem('edi_theme', current);
      updateThemeIcon(current);
    });
  }
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('theme-icon');
  if (!themeIcon) return;
  
  if (theme === 'dark') {
    // Show sun icon when in dark mode (to switch to light)
    themeIcon.innerHTML = `
      <svg class="w-5 h-5 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
      </svg>
    `;
    themeIcon.setAttribute('title', 'Switch to Light Theme');
  } else {
    // Show moon icon when in light mode (to switch to dark)
    themeIcon.innerHTML = `
      <svg class="w-5 h-5 text-slate-700 transition-transform duration-300 hover:-rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
      </svg>
    `;
    themeIcon.setAttribute('title', 'Switch to Dark Gold Theme');
  }
}

// -------------------------------------------------------------
// 2. Navigation Bar Logic
// -------------------------------------------------------------
function initNavbar() {
  const navbar = document.getElementById('main-navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll effect (backdrop blur & border shadow)
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('shadow-md', 'backdrop-blur-md');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.remove('shadow-md');
    }
  });

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on clicking any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

// -------------------------------------------------------------
// 3. About EDI Club Pillars
// -------------------------------------------------------------
function renderAboutSection() {
  const container = document.getElementById('about-pillars-container');
  if (!container) return;

  const iconMap = {
    'lightbulb': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>`,
    'trending-up': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>`,
    'users': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>`,
    'target': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0-6a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"/>`
  };

  container.innerHTML = EDI_DATA.aboutPillars.map(pillar => `
    <div class="edi-card p-6 border-t-4 border-t-amber-500 hover:border-amber-500 transition-all duration-300 group">
      <div class="w-12 h-12 rounded-xl gold-badge flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          ${iconMap[pillar.icon] || ''}
        </svg>
      </div>
      <h3 class="text-lg font-bold tracking-wide text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
        ${pillar.title}
      </h3>
      <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        ${pillar.desc}
      </p>
    </div>
  `).join('');
}

// -------------------------------------------------------------
// 4. Vision & Mission Presentation (Stick strictly to text)
// -------------------------------------------------------------
function renderVisionMission() {
  const visionPillarsContainer = document.getElementById('vision-pillars-container');
  const missionPointsContainer = document.getElementById('mission-points-container');
  const missionCalloutsContainer = document.getElementById('mission-callouts-container');

  if (visionPillarsContainer) {
    visionPillarsContainer.innerHTML = EDI_DATA.vision.pillars.map(p => `
      <div class="edi-card p-5 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-400 group">
        <div class="flex items-center space-x-3 mb-3">
          <span class="font-mono-tech text-xs font-bold px-2.5 py-1 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            ${p.number}
          </span>
          <h4 class="font-bold text-sm tracking-wider text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            ${p.title}
          </h4>
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          ${p.description}
        </p>
      </div>
    `).join('');
  }

  if (missionPointsContainer) {
    missionPointsContainer.innerHTML = EDI_DATA.mission.points.map(pt => `
      <div class="flex items-start space-x-4 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:border-amber-500 transition-all duration-300 group">
        <div class="w-10 h-10 rounded-lg gold-badge flex-shrink-0 flex items-center justify-center font-bold text-amber-700 dark:text-amber-400 group-hover:scale-105 transition-transform">
          ${pt.number}
        </div>
        <div>
          <div class="flex items-center space-x-2 mb-1.5">
            <h4 class="font-bold text-sm tracking-wide text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              ${pt.title}
            </h4>
          </div>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            ${pt.description}
          </p>
        </div>
      </div>
    `).join('');
  }

  if (missionCalloutsContainer) {
    missionCalloutsContainer.innerHTML = EDI_DATA.mission.callouts.map(c => `
      <div class="p-4 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20 text-center hover:border-amber-400 transition-colors">
        <span class="block font-bold text-xs tracking-wider text-amber-700 dark:text-amber-300 mb-1">
          ${c.label}
        </span>
        <span class="text-xs text-slate-600 dark:text-slate-300">
          ${c.desc}
        </span>
      </div>
    `).join('');
  }
}

// -------------------------------------------------------------
// 5. What We Do Section
// -------------------------------------------------------------
function renderWhatWeDo() {
  const container = document.getElementById('what-we-do-container');
  if (!container) return;

  const icons = {
    compass: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1.5-6.5l4-4-1.5 6.5-6.5 1.5 4-4z"/>`,
    cpu: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>`,
    'user-check': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8zm11 3l-3 3-1.5-1.5"/>`,
    terminal: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>`,
    'shield-check': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>`,
    presentation: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/>`
  };

  container.innerHTML = EDI_DATA.whatWeDo.map(item => `
    <div class="edi-card p-6 border border-slate-200 dark:border-slate-800 hover:border-amber-400 group transition-all duration-300">
      <div class="w-12 h-12 rounded-xl gold-badge flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          ${icons[item.icon] || ''}
        </svg>
      </div>
      <h3 class="font-bold text-base tracking-wider text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
        ${item.title}
      </h3>
      <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        ${item.desc}
      </p>
    </div>
  `).join('');
}

// -------------------------------------------------------------
// 6. Activities & Initiatives (Exact 8 Activities from Prompt)
// -------------------------------------------------------------
let currentActivityCategory = 'All';

function renderActivities() {
  const container = document.getElementById('activities-grid');
  const filterContainer = document.getElementById('activities-filter');
  if (!container) return;

  const categories = ['All', 'Workshop', 'Expert Session', 'Bootcamp', 'Strategy', 'Hackathon', 'Showcase'];

  if (filterContainer && filterContainer.children.length === 0) {
    filterContainer.innerHTML = categories.map(cat => `
      <button 
        class="activity-filter-btn px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-200 ${
          cat === currentActivityCategory 
            ? 'bg-amber-600 text-white border-amber-600 shadow-sm' 
            : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400'
        }"
        data-category="${cat}"
      >
        ${cat}
      </button>
    `).join('');

    filterContainer.querySelectorAll('.activity-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentActivityCategory = btn.getAttribute('data-category');
        filterContainer.querySelectorAll('.activity-filter-btn').forEach(b => {
          b.className = 'activity-filter-btn px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-200 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400';
        });
        btn.className = 'activity-filter-btn px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-200 bg-amber-600 text-white border-amber-600 shadow-sm';
        renderActivities();
      });
    });
  }

  const filtered = currentActivityCategory === 'All' 
    ? EDI_DATA.activities 
    : EDI_DATA.activities.filter(a => a.category === currentActivityCategory || (currentActivityCategory === 'Workshop' && a.category === 'Legal & IP'));

  container.innerHTML = filtered.map(act => `
    <div class="edi-card p-6 flex flex-col justify-between border border-slate-200 dark:border-slate-800 hover:border-amber-400 transition-all duration-300 group">
      <div>
        <div class="flex items-center justify-between gap-2 mb-4">
          <span class="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            ${act.badge}
          </span>
          <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">
            ${act.category}
          </span>
        </div>

        <h3 class="text-base font-bold text-slate-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
          ${act.title}
        </h3>

        <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
          ${act.shortDesc}
        </p>

        <div class="space-y-1.5 mb-5 border-t border-slate-100 dark:border-slate-800 pt-3">
          <div class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Key Highlights:</div>
          <ul class="text-xs text-slate-600 dark:text-slate-300 space-y-1">
            ${act.keyOutcomes.map(out => `
              <li class="flex items-center space-x-2">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></span>
                <span>${out}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>

      <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span class="text-[11px] text-amber-700 dark:text-amber-400 font-medium flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          Upcoming
        </span>
        <button 
          onclick="openEventModal('${act.id}')"
          class="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-white transition-all flex items-center gap-1"
        >
          View Details
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('');
}

// -------------------------------------------------------------
// 7. Celebration Activities
// -------------------------------------------------------------
function renderCelebrations() {
  const container = document.getElementById('celebrations-container');
  if (!container) return;

  container.innerHTML = EDI_DATA.celebrations.map(cel => `
    <div class="edi-card-gold-accent p-6 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            ${cel.badge}
          </span>
          <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
            ${cel.dateDisplay}
          </span>
        </div>
        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1.5">
          ${cel.title}
        </h3>
        <p class="text-xs font-medium text-amber-800 dark:text-amber-400 mb-3 italic">
          "${cel.tagline}"
        </p>
        <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          ${cel.desc}
        </p>
        <div class="space-y-1 border-t border-slate-100 dark:border-slate-800 pt-3">
          <div class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Planned Segments:</div>
          <div class="flex flex-wrap gap-1.5 pt-1">
            ${cel.highlights.map(h => `
              <span class="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                ${h}
              </span>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// -------------------------------------------------------------
// 8. Idea Journey: From Idea to Impact (6 steps)
// -------------------------------------------------------------
function renderJourney() {
  const container = document.getElementById('journey-container');
  if (!container) return;

  container.innerHTML = EDI_DATA.journeySteps.map(step => `
    <div class="relative z-10 flex flex-col items-center text-center p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-400 dark:hover:border-amber-400 transition-all group">
      <div class="w-12 h-12 rounded-full gold-badge flex items-center justify-center font-mono-tech font-bold text-base mb-3 group-hover:scale-110 transition-transform">
        ${step.number}
      </div>
      <h4 class="font-bold text-sm tracking-wider text-slate-900 dark:text-white mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
        ${step.title}
      </h4>
      <div class="text-[11px] font-medium text-amber-700 dark:text-amber-400 mb-2">
        ${step.subtitle}
      </div>
      <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
        ${step.desc}
      </p>
    </div>
  `).join('');
}

// -------------------------------------------------------------
// 9. Impact Statistics (Animated Counters)
// -------------------------------------------------------------
function renderStats() {
  const container = document.getElementById('stats-container');
  if (!container) return;

  container.innerHTML = EDI_DATA.stats.map(s => `
    <div class="edi-card p-6 text-center border-t-2 border-t-amber-500">
      <div class="font-mono-tech text-3xl sm:text-4xl font-extrabold text-amber-600 dark:text-amber-400 mb-2">
        ${s.value}
      </div>
      <div class="text-sm font-bold text-slate-900 dark:text-white mb-1 tracking-wide">
        ${s.label}
      </div>
      <div class="text-xs text-slate-500 dark:text-slate-400">
        ${s.subtext}
      </div>
    </div>
  `).join('');
}

// -------------------------------------------------------------
// 10. Team Section with Category Filter
// -------------------------------------------------------------
let currentTeamCategory = 'All';

function renderTeam() {
  const container = document.getElementById('team-grid');
  const filterContainer = document.getElementById('team-filter');
  if (!container) return;

  if (filterContainer && filterContainer.children.length === 0) {
    filterContainer.innerHTML = EDI_DATA.teamCategories.map(cat => `
      <button 
        class="team-filter-btn px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 ${
          cat === currentTeamCategory 
            ? 'bg-amber-600 text-white border-amber-600 shadow-sm' 
            : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400'
        }"
        data-category="${cat}"
      >
        ${cat}
      </button>
    `).join('');

    filterContainer.querySelectorAll('.team-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentTeamCategory = btn.getAttribute('data-category');
        filterContainer.querySelectorAll('.team-filter-btn').forEach(b => {
          b.className = 'team-filter-btn px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400';
        });
        btn.className = 'team-filter-btn px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 bg-amber-600 text-white border-amber-600 shadow-sm';
        renderTeam();
      });
    });
  }

  const filtered = currentTeamCategory === 'All'
    ? EDI_DATA.team
    : EDI_DATA.team.filter(m => m.category === currentTeamCategory);

  container.innerHTML = filtered.map(member => `
    <div class="edi-card p-6 border border-slate-200 dark:border-slate-800 hover:border-amber-400 transition-all duration-300 group text-center">
      <div class="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-200 dark:from-amber-700 dark:to-amber-400 p-0.5 mb-4 shadow-sm group-hover:scale-105 transition-transform">
        <div class="w-full h-full rounded-[14px] bg-white dark:bg-slate-900 flex items-center justify-center font-bold text-xl text-amber-700 dark:text-amber-300 font-heading">
          ${member.initials}
        </div>
      </div>

      <span class="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 mb-2">
        ${member.tag}
      </span>

      <h3 class="text-base font-bold text-slate-900 dark:text-white mb-0.5">
        ${member.name}
      </h3>

      <div class="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">
        ${member.role}
      </div>

      <div class="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
        ${member.department}
      </div>

      <p class="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
        ${member.bio}
      </p>
    </div>
  `).join('');
}

// -------------------------------------------------------------
// 11. Gallery with Category Filter
// -------------------------------------------------------------
let currentGalleryCategory = 'All';

function renderGallery() {
  const container = document.getElementById('gallery-grid');
  const filterContainer = document.getElementById('gallery-filter');
  if (!container) return;

  if (filterContainer && filterContainer.children.length === 0) {
    filterContainer.innerHTML = EDI_DATA.galleryCategories.map(cat => `
      <button 
        class="gallery-filter-btn px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 ${
          cat === currentGalleryCategory 
            ? 'bg-amber-600 text-white border-amber-600 shadow-sm' 
            : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400'
        }"
        data-category="${cat}"
      >
        ${cat}
      </button>
    `).join('');

    filterContainer.querySelectorAll('.gallery-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentGalleryCategory = btn.getAttribute('data-category');
        filterContainer.querySelectorAll('.gallery-filter-btn').forEach(b => {
          b.className = 'gallery-filter-btn px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400';
        });
        btn.className = 'gallery-filter-btn px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 bg-amber-600 text-white border-amber-600 shadow-sm';
        renderGallery();
      });
    });
  }

  const filtered = currentGalleryCategory === 'All'
    ? EDI_DATA.gallery
    : EDI_DATA.gallery.filter(g => g.category === currentGalleryCategory);

  container.innerHTML = filtered.map(item => `
    <div class="edi-card overflow-hidden group cursor-pointer border border-slate-200 dark:border-slate-800 hover:border-amber-400 transition-all duration-300" onclick="openImageLightbox('${item.image}', '${item.title.replace(/'/g, "\\'")}', '${item.subtitle.replace(/'/g, "\\'")}')">
      <div class="relative h-60 overflow-hidden bg-slate-950">
        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>
        <div class="absolute top-3 left-3 z-10">
          <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/40">
            ${item.tag}
          </span>
        </div>
        <div class="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
        </div>
        <div class="absolute bottom-3 left-3 right-3 z-10 text-white">
          <h4 class="font-bold text-sm leading-snug group-hover:text-amber-300 transition-colors mb-1 line-clamp-1">
            ${item.title}
          </h4>
          <p class="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
            ${item.subtitle}
          </p>
        </div>
      </div>
    </div>
  `).join('');
}

// -------------------------------------------------------------
// 12. Why Join EDI Club (5 Pillars)
// -------------------------------------------------------------
function renderWhyJoin() {
  const container = document.getElementById('why-join-container');
  if (!container) return;

  const icons = {
    'book-open': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>`,
    'wrench': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/>`,
    'network': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>`,
    'shield-alert': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>`,
    'sparkles': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>`
  };

  container.innerHTML = EDI_DATA.whyJoin.map((w, index) => `
    <div class="edi-card p-6 border border-slate-200 dark:border-slate-800 hover:border-amber-400 group transition-all">
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-10 h-10 rounded-xl gold-badge flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            ${icons[w.icon] || ''}
          </svg>
        </div>
        <h3 class="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
          ${w.title}
        </h3>
      </div>
      <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        ${w.desc}
      </p>
    </div>
  `).join('');
}

// -------------------------------------------------------------
// 13. Event Modal & Details
// -------------------------------------------------------------
function initModals() {
  const modal = document.getElementById('event-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeEventModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeEventModal);
  }

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeEventModal();
      closeJoinModal();
      closePosterModal();
    }
  });

  // Join Journey modal
  const joinModal = document.getElementById('join-modal');
  const closeJoinBtn = document.getElementById('close-join-modal');
  if (closeJoinBtn) {
    closeJoinBtn.addEventListener('click', closeJoinModal);
  }
}

function openEventModal(eventId) {
  const act = EDI_DATA.activities.find(a => a.id === eventId);
  if (!act) return;

  const modal = document.getElementById('event-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalBadge = document.getElementById('modal-badge');
  const modalDesc = document.getElementById('modal-description');
  const modalPurpose = document.getElementById('modal-purpose');
  const modalActivities = document.getElementById('modal-activities');
  const modalOutcomes = document.getElementById('modal-outcomes');
  const modalTarget = document.getElementById('modal-target');
  const modalDate = document.getElementById('modal-date');

  modalTitle.textContent = act.title;
  modalCategory.textContent = act.category;
  modalBadge.textContent = act.badge;
  modalDesc.textContent = act.shortDesc;
  modalPurpose.textContent = act.purpose;
  modalTarget.textContent = act.targetParticipants;
  modalDate.textContent = act.dateStatus;

  modalActivities.innerHTML = act.keyActivities.map(a => `
    <li class="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
      <span class="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></span>
      <span>${a}</span>
    </li>
  `).join('');

  modalOutcomes.innerHTML = act.keyOutcomes.map(o => `
    <li class="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
      <span class="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></span>
      <span>${o}</span>
    </li>
  `).join('');

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

function closeEventModal() {
  const modal = document.getElementById('event-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

function openJoinModal() {
  const modal = document.getElementById('join-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }
}

function closeJoinModal() {
  const modal = document.getElementById('join-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

function openImageLightbox(src, titleText, subtitleText) {
  const modal = document.getElementById('poster-modal');
  const img = document.getElementById('poster-modal-img');
  const title = document.getElementById('poster-modal-title');
  const caption = document.getElementById('poster-modal-caption');
  
  if (!modal || !img) return;

  img.src = src;
  img.alt = titleText || 'EDI Club Event Image';
  if (title) title.textContent = titleText || 'EDI Club Gallery';
  if (caption) caption.textContent = subtitleText || 'Meenakshi Sundararajan Engineering College';

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

function openPosterModal(type) {
  if (type === 'vision') {
    openImageLightbox('images/vision_poster.jpg', 'Official Vision Artwork', 'EDI Club Strategic Vision Poster');
  } else {
    openImageLightbox('images/mission_poster.jpg', 'Official Mission Artwork', 'EDI Club Official Mission & Action Pillars Poster');
  }
}

function closePosterModal() {
  const modal = document.getElementById('poster-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

// -------------------------------------------------------------
// 14. Contact Form Handling (Frontend Only Notice)
// -------------------------------------------------------------
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('contact-name');
    const name = nameInput ? nameInput.value : 'Innovator';

    // Show celebratory response
    showToast(`Thank you, ${name}! Your message interface is ready. Backend integration can be added later.`);
    form.reset();
  });
}

// -------------------------------------------------------------
// 15. Toast Notification System
// -------------------------------------------------------------
function showToast(message) {
  const toast = document.getElementById('notification-toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.remove('opacity-0', 'translate-y-5', 'pointer-events-none');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-5', 'pointer-events-none');
  }, 4500);
}

// -------------------------------------------------------------
// 16. Scroll Animations & Reveal
// -------------------------------------------------------------
function initScrollAnimations() {
  // Reveal on scroll elements if supported
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersectEvent) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    }, { threshold: 0.1 });
  }
}

// Make functions accessible globally for HTML inline onclick handlers
window.openEventModal = openEventModal;
window.closeEventModal = closeEventModal;
window.openJoinModal = openJoinModal;
window.closeJoinModal = closeJoinModal;
window.openPosterModal = openPosterModal;
window.closePosterModal = closePosterModal;
window.openImageLightbox = openImageLightbox;
window.showToast = showToast;
