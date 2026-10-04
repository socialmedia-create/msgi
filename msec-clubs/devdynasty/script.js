/**
 * DEV DYNASTY — 2026–27 OFFICIAL DIGITAL UNIVERSE
 * Pure Vanilla JavaScript: Interactive Ray Physics, Custom Cursor, Canvas Engines & Sandboxes
 */

document.addEventListener('DOMContentLoaded', () => {
  // Global State
  const state = {
    mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2, prevX: 0, prevY: 0, isDown: false },
    activeRay: null,
    isDraggingRay: false,
    draggedRay: null,
    dragTension: 0,
    sfxEnabled: true,
    audioCtx: null
  };

  // ==========================================================================
  // 1. PROCEDURAL WEB AUDIO SYNTHESIZER (NO EXTERNAL AUDIO FILES NEEDED)
  // ==========================================================================
  function initAudio() {
    if (!state.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        state.audioCtx = new AudioContext();
      }
    }
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
  }

  function playSound(type) {
    if (!state.sfxEnabled) return;
    try {
      initAudio();
      if (!state.audioCtx) return;
      const ctx = state.audioCtx;
      const now = ctx.currentTime;

      if (type === 'hover') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'pull') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220 + state.dragTension * 6, now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'release') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.25);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.06);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
      }
    } catch (e) {
      // Audio fallback silent
    }
  }

  // Toggle SFX
  const sfxBtn = document.getElementById('audio-fx-toggle');
  if (sfxBtn) {
    sfxBtn.addEventListener('click', () => {
      state.sfxEnabled = !state.sfxEnabled;
      sfxBtn.querySelector('.btn-label').textContent = state.sfxEnabled ? 'SFX: ON' : 'SFX: OFF';
      sfxBtn.style.opacity = state.sfxEnabled ? '1' : '0.6';
      playSound('click');
    });
  }

  // ==========================================================================
  // 2. CUSTOM CREATIVE CURSOR SYSTEM
  // ==========================================================================
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  const cursorGrab = document.getElementById('cursor-energy-grab');

  let ringX = window.innerWidth / 2;
  let ringY = window.innerHeight / 2;

  window.addEventListener('pointermove', (e) => {
    state.mouse.x = e.clientX;
    state.mouse.y = e.clientY;

    if (cursorDot) {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
    }
    if (cursorGrab) {
      cursorGrab.style.left = `${e.clientX}px`;
      cursorGrab.style.top = `${e.clientY}px`;
    }
  });

  window.addEventListener('pointerdown', () => {
    state.mouse.isDown = true;
    initAudio();
  });

  window.addEventListener('pointerup', () => {
    state.mouse.isDown = false;
  });

  // Smooth Ring Trailing
  function updateCursorRing() {
    ringX += (state.mouse.x - ringX) * 0.22;
    ringY += (state.mouse.y - ringY) * 0.22;
    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }
    requestAnimationFrame(updateCursorRing);
  }
  updateCursorRing();

  // Hover States for Interactive Elements
  document.querySelectorAll('button, a, .pillar-chip, .reactor-node, .bearer-card, .timeline-stop, .knowledge-node, .ray-node, .editorial-marker, .sat-1, .sat-2, .sat-3, .sat-4').forEach(el => {
    el.addEventListener('pointerenter', () => {
      document.body.classList.add('cursor-hover');
      playSound('hover');
    });
    el.addEventListener('pointerleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });

  // ==========================================================================
  // 3. AMBIENT VIDEO & DEV DYNASTY CODE TYPING ANIMATION ENGINE
  // ==========================================================================
  const ambCanvas = document.getElementById('ambient-canvas');
  const ambCtx = ambCanvas ? ambCanvas.getContext('2d') : null;

  // Video Element setup
  const bgVideo = document.getElementById('bg-video');
  if (bgVideo) {
    bgVideo.play().catch(() => {
      // Auto-play policy silent fallback
    });
  }

  // Typewriter Text Sequences
  const typingSequences = [
    { title: "DEV DYNASTY", sub: "WEB APP DEVELOPMENT AND ESPORTS CLUB", tag: "OFFICIAL 2026-27 DIGITAL UNIVERSE • MSEC" },
    { title: "DEV DYNASTY", sub: "WEB APP DEVELOPMENT AND ESPORTS CLUB", tag: "MEENAKSHI SUNDARARAJAN ENGINEERING COLLEGE" },
    { title: "DEV DYNASTY", sub: "WEB APP DEVELOPMENT AND ESPORTS CLUB", tag: "CODE • INNOVATE • LEAD • COMPETE" }
  ];

  let seqIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let currentText = "";
  let lastTypingTime = performance.now();
  let cursorBlink = true;
  let cursorTimer = 0;

  // Clean Club Stream Particles & Background Drift
  const codeStreamChars = ["DEV", "DYNASTY", "MSEC", "WEB APP", "ESPORTS", "CLUB", "2026-27"];
  const matrixDrops = [];

  function initTypingCanvas() {
    if (!ambCanvas) return;
    ambCanvas.width = window.innerWidth;
    ambCanvas.height = window.innerHeight;

    matrixDrops.length = 0;
    const columns = Math.floor(window.innerWidth / 32);
    for (let i = 0; i < columns; i++) {
      matrixDrops.push({
        x: i * 32 + 16,
        y: Math.random() * window.innerHeight,
        speed: Math.random() * 1.4 + 0.6,
        char: codeStreamChars[Math.floor(Math.random() * codeStreamChars.length)],
        opacity: Math.random() * 0.35 + 0.1
      });
    }
  }

  function renderTypingBackground(now) {
    if (!ambCtx || !ambCanvas) return;
    ambCtx.clearRect(0, 0, ambCanvas.width, ambCanvas.height);

    // A. Render Matrix Code Drops in Background
    for (let i = 0; i < matrixDrops.length; i++) {
      const drop = matrixDrops[i];
      drop.y += drop.speed;
      if (drop.y > ambCanvas.height) {
        drop.y = -20;
        drop.char = codeStreamChars[Math.floor(Math.random() * codeStreamChars.length)];
      }

      ambCtx.font = '12px "JetBrains Mono", monospace';
      ambCtx.fillStyle = `rgba(168, 85, 247, ${drop.opacity * 0.45})`;
      ambCtx.fillText(drop.char, drop.x, drop.y);
    }

    // B. Typing Logic Update
    const currentSeq = typingSequences[seqIndex];
    const fullText = currentSeq.title;

    if (now - lastTypingTime > (isDeleting ? 50 : 110)) {
      lastTypingTime = now;
      if (!isDeleting) {
        currentText = fullText.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === fullText.length) {
          isDeleting = false;
          lastTypingTime = now + 2400; // Hold full title
          isDeleting = true;
        }
      } else {
        currentText = fullText.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          seqIndex = (seqIndex + 1) % typingSequences.length;
        }
      }
    }

    // Cursor Blink timer
    if (now - cursorTimer > 420) {
      cursorTimer = now;
      cursorBlink = !cursorBlink;
    }

    // C. Draw Watermark DEV DYNASTY Typing Text in Background
    const centerX = ambCanvas.width / 2;
    const centerY = ambCanvas.height * 0.38;

    // Subtag Code Line
    ambCtx.save();
    ambCtx.font = '600 13px "JetBrains Mono", monospace';
    ambCtx.fillStyle = 'rgba(56, 189, 248, 0.65)';
    ambCtx.textAlign = 'center';
    ambCtx.shadowColor = 'rgba(56, 189, 248, 0.5)';
    ambCtx.shadowBlur = 8;
    ambCtx.fillText(currentSeq.tag, centerX, centerY - 65);
    ambCtx.restore();

    // Main Giant Typed Title: DEV DYNASTY
    ambCtx.save();
    const fontSize = Math.min(Math.max(ambCanvas.width * 0.07, 38), 105);
    ambCtx.font = `900 ${fontSize}px "Syne", sans-serif`;
    ambCtx.textAlign = 'center';
    ambCtx.textBaseline = 'middle';

    // Glowing Neon Stroke
    ambCtx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
    ambCtx.lineWidth = 3;
    ambCtx.strokeText(currentText, centerX, centerY);

    const titleGradient = ambCtx.createLinearGradient(centerX - 300, centerY, centerX + 300, centerY);
    titleGradient.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
    titleGradient.addColorStop(0.5, 'rgba(56, 189, 248, 0.32)');
    titleGradient.addColorStop(1, 'rgba(168, 85, 247, 0.28)');

    ambCtx.fillStyle = titleGradient;
    ambCtx.shadowColor = 'rgba(168, 85, 247, 0.6)';
    ambCtx.shadowBlur = 24;
    ambCtx.fillText(currentText, centerX, centerY);

    // Blinking Cyber Cursor █
    if (cursorBlink) {
      const textMetrics = ambCtx.measureText(currentText);
      const cursorX = centerX + textMetrics.width / 2 + 10;
      ambCtx.fillStyle = '#38bdf8';
      ambCtx.shadowColor = '#38bdf8';
      ambCtx.shadowBlur = 10;
      ambCtx.fillRect(cursorX, centerY - fontSize * 0.38, 8, fontSize * 0.76);
    }
    ambCtx.restore();

    // Sub-caption
    ambCtx.save();
    ambCtx.font = '600 13px "Plus Jakarta Sans", sans-serif';
    ambCtx.fillStyle = 'rgba(226, 232, 240, 0.5)';
    ambCtx.textAlign = 'center';
    ambCtx.letterSpacing = '3px';
    ambCtx.fillText(currentSeq.sub, centerX, centerY + fontSize * 0.5 + 22);
    ambCtx.restore();

    requestAnimationFrame(renderTypingBackground);
  }

  window.addEventListener('resize', initTypingCanvas);
  initTypingCanvas();
  requestAnimationFrame(renderTypingBackground);

    // ==========================================================================
  // 4. HERO SECTION : PROMINENT BRAND CORE & 3D TOUCH-INTERACTIVE PHYSICS
  // ==========================================================================
  const heroSection = document.getElementById('hero');
  const heroCanvas = document.getElementById('hero-ambient-canvas');
  const heroCtx = heroCanvas ? heroCanvas.getContext('2d') : null;
  const logoDisc = document.getElementById('hero-logo-disc');
  const exploreCta = document.getElementById('hero-explore-cta');
  const photoFrame = document.getElementById('hero-photo-frame');
  const floatingCards = document.querySelectorAll('.floating-glass-card');
  const photoStage = document.getElementById('photo-glass-stage');
  const floating3dObjects = document.querySelectorAll('.floating-3d-object');

  // Subtle Hero Micro-Particle Canvas
  let heroParticles = [];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resizeHeroCanvas() {
    if (!heroCanvas || !heroSection) return;
    heroCanvas.width = heroSection.offsetWidth;
    heroCanvas.height = heroSection.offsetHeight;
    initHeroParticles();
  }

  function initHeroParticles() {
    heroParticles = [];
    if (!heroCanvas) return;
    const count = Math.min(24, Math.floor(heroCanvas.width / 50));
    for (let i = 0; i < count; i++) {
      heroParticles.push({
        x: Math.random() * heroCanvas.width,
        y: Math.random() * heroCanvas.height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.5 + 0.6,
        alpha: Math.random() * 0.35 + 0.12
      });
    }
  }

  function renderHeroCanvas() {
    if (!heroCtx || !heroCanvas || prefersReducedMotion) return;
    heroCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

    const mouseX = state.mouse.x;
    const mouseY = state.mouse.y;
    const heroRect = heroSection.getBoundingClientRect();
    const relX = mouseX - heroRect.left;
    const relY = mouseY - heroRect.top;
    const isInsideHero = relY >= 0 && relY <= heroRect.height;

    for (let i = 0; i < heroParticles.length; i++) {
      const p = heroParticles[i];
      p.x += p.vx;
      p.y += p.vy;

      // Mouse gentle repulsion
      if (isInsideHero) {
        const dx = p.x - relX;
        const dy = p.y - relY;
        const dist = Math.hypot(dx, dy);
        if (dist < 80 && dist > 0) {
          const force = (1 - dist / 80) * 0.35;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }
      }

      if (p.x < 0) p.x = heroCanvas.width;
      if (p.x > heroCanvas.width) p.x = 0;
      if (p.y < 0) p.y = heroCanvas.height;
      if (p.y > heroCanvas.height) p.y = 0;

      heroCtx.beginPath();
      heroCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      heroCtx.fillStyle = `rgba(168, 85, 247, ${p.alpha})`;
      heroCtx.fill();
    }

    requestAnimationFrame(renderHeroCanvas);
  }

  window.addEventListener('resize', resizeHeroCanvas);
  resizeHeroCanvas();
  renderHeroCanvas();

  // --------------------------------------------------------------------------
  // 1. PROMINENT LOGO 3D DEPTH & SUBTLE CURSOR PARALLAX (5-8px Max)
  // --------------------------------------------------------------------------
  if (logoDisc && heroSection && !prefersReducedMotion) {
    window.addEventListener('pointermove', (e) => {
      const rect = logoDisc.getBoundingClientRect();
      const discCenterX = rect.left + rect.width / 2;
      const discCenterY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - discCenterX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - discCenterY) / (window.innerHeight / 2);

      const moveX = Math.max(-8, Math.min(8, deltaX * 8));
      const moveY = Math.max(-8, Math.min(8, deltaY * 8));
      const tiltX = -moveY * 0.8;
      const tiltY = moveX * 0.8;

      logoDisc.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    heroSection.addEventListener('pointerleave', () => {
      logoDisc.style.transform = 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)';
    });
  }

  // --------------------------------------------------------------------------
  // HERO EDITORIAL WATERMARK — Smooth 2px Inverse Parallax
  // --------------------------------------------------------------------------
  const heroWatermark = document.getElementById('hero-brand-watermark');
  if (heroWatermark && heroSection && !prefersReducedMotion) {
    // Only run on non-touch pointer devices
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    if (!isTouch) {
      let wmTargetX = 0;
      let wmTargetY = 0;
      let wmCurrentX = 0;
      let wmCurrentY = 0;
      const WM_LERP  = 0.04;   // Very slow easing — floats gently
      const WM_MAX   = 2;      // ±2px maximum movement

      // Track pointer relative to hero centre — inverse direction
      function onWatermarkPointerMove(e) {
        const rect = heroSection.getBoundingClientRect();
        if (e.clientY < rect.top || e.clientY > rect.bottom) return;
        const normX = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
        const normY = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
        // Inverse: watermark drifts opposite to cursor
        wmTargetX = -normX * WM_MAX;
        wmTargetY = -normY * WM_MAX;
      }

      function lerpWatermark() {
        wmCurrentX += (wmTargetX - wmCurrentX) * WM_LERP;
        wmCurrentY += (wmTargetY - wmCurrentY) * WM_LERP;

        // Apply transform — preserve the base translateY(-44%) from CSS
        heroWatermark.style.transform =
          `translateY(-44%) translate3d(${wmCurrentX.toFixed(3)}px, ${wmCurrentY.toFixed(3)}px, 0)`;

        requestAnimationFrame(lerpWatermark);
      }

      window.addEventListener('pointermove', onWatermarkPointerMove, { passive: true });

      // On hero leave, ease back to origin
      heroSection.addEventListener('pointerleave', () => {
        wmTargetX = 0;
        wmTargetY = 0;
      });

      lerpWatermark();
    }
  }



  // --------------------------------------------------------------------------
  // 2. MAGNETIC PRIMARY CTA BUTTON
  // --------------------------------------------------------------------------
  if (exploreCta && !prefersReducedMotion) {
    window.addEventListener('pointermove', (e) => {
      const rect = exploreCta.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

      if (dist < 90) {
        const pull = (1 - dist / 90) * 12;
        const moveX = ((e.clientX - btnCenterX) / dist) * pull;
        const moveY = ((e.clientY - btnCenterY) / dist) * pull;
        exploreCta.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.02)`;
      } else {
        exploreCta.style.transform = 'translate3d(0, 0, 0) scale(1)';
      }
    });

    exploreCta.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('vision');
      if (target) {
        playSound('click');
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. REFINED SECTION NAVIGATION DOCK LINKS
  // --------------------------------------------------------------------------
  document.querySelectorAll('.nav-dimension-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        playSound('click');
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. 3D GLASS TILT FOR COMMUNITY PHOTOGRAPH FRAME
  // --------------------------------------------------------------------------
  if (photoFrame && !prefersReducedMotion) {
    const stageOrFrame = photoStage || photoFrame;
    stageOrFrame.addEventListener('pointermove', (e) => {
      const rect = stageOrFrame.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Gentle physical glass tilt (3-5 degrees max)
      const tiltX = -y * 6;
      const tiltY = x * 6;
      photoFrame.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-2px)`;
    });

    stageOrFrame.addEventListener('pointerleave', () => {
      photoFrame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  }


  // ==========================================================================
  // 5. NAVIGATION & RADIAL MENU PORTAL
  // ==========================================================================
  const radialBtn = document.getElementById('radial-orbit-btn');
  const radialOverlay = document.getElementById('radial-portal-overlay');
  const radialClose = document.getElementById('radial-portal-close');

  if (radialBtn && radialOverlay) {
    radialBtn.addEventListener('click', () => {
      radialOverlay.classList.toggle('open');
      playSound('click');
    });
  }

  if (radialClose && radialOverlay) {
    radialClose.addEventListener('click', () => {
      radialOverlay.classList.remove('open');
    });
  }

  document.querySelectorAll('.radial-branch-btn, .nav-pill, .scroll-invitation').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          if (radialOverlay) radialOverlay.classList.remove('open');
          playSound('click');
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Brand Logo Click Scroll to Hero
  const brandBtn = document.getElementById('hud-brand-btn');
  if (brandBtn) {
    brandBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      playSound('click');
    });
  }

  // Return to Core Button
  const returnBtn = document.getElementById('return-to-core-btn');
  if (returnBtn) {
    returnBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      playSound('release');
    });
  }

  // Active Nav Tracking on Scroll
  const navPills = document.querySelectorAll('.nav-pill');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = 'hero';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });

    navPills.forEach(pill => {
      pill.classList.remove('active');
      if (pill.getAttribute('data-target') === current) {
        pill.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // 6. OBJECTIVE SECTION : DYNAMIC TRIAD REACTOR INTERACTION
  // ==========================================================================
  const catalystNodes = document.querySelectorAll('.catalyst-node');
  const outcomeNodes = document.querySelectorAll('.outcome-node');
  const reactorLogo = document.querySelector('.cylinder-logo');

  catalystNodes.forEach(node => {
    node.addEventListener('click', () => {
      playSound('click');
      catalystNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      
      // Pulse reactor core
      if (reactorLogo) {
        reactorLogo.style.transform = 'scale(1.2) rotate(15deg)';
        setTimeout(() => { reactorLogo.style.transform = 'scale(1) rotate(0deg)'; }, 400);
      }

      // Randomly highlight a matching outcome
      const randOutcome = outcomeNodes[Math.floor(Math.random() * outcomeNodes.length)];
      if (randOutcome) {
        randOutcome.style.borderColor = 'var(--cyan)';
        setTimeout(() => { randOutcome.style.borderColor = 'var(--glass-border)'; }, 1000);
      }
    });
  });

  // ==========================================================================
  // 7. OFFICE BEARERS : CONSTELLATION CANVAS & VIEW TOGGLE
  // ==========================================================================
  const viewCardsBtn = document.getElementById('view-cards-btn');
  const viewNetworkBtn = document.getElementById('view-network-btn');
  const bearersGridView = document.getElementById('bearers-grid-view');
  const bearersConstellationView = document.getElementById('bearers-constellation-view');
  const constCanvas = document.getElementById('constellation-canvas');
  const constCtx = constCanvas ? constCanvas.getContext('2d') : null;

  if (viewCardsBtn && viewNetworkBtn) {
    viewCardsBtn.addEventListener('click', () => {
      viewCardsBtn.classList.add('active');
      viewNetworkBtn.classList.remove('active');
      bearersGridView.classList.remove('hidden');
      bearersConstellationView.classList.add('hidden');
      playSound('click');
    });

    viewNetworkBtn.addEventListener('click', () => {
      viewNetworkBtn.classList.add('active');
      viewCardsBtn.classList.remove('active');
      bearersGridView.classList.add('hidden');
      bearersConstellationView.classList.remove('hidden');
      resizeConstellation();
      playSound('click');
    });
  }

  // Constellation Nodes
  const bearerNodes = [
    { name: 'Nithish Balaguru S', role: 'President', dept: 'Executive Core', xPct: 0.25, yPct: 0.28, color: '#0055ff' },
    { name: 'Aafiya Sheerin S', role: 'Vice President', dept: 'Executive Core', xPct: 0.75, yPct: 0.28, color: '#7000ff' },
    { name: 'Anandha Sabari R', role: 'Secretary', dept: 'Executive Core', xPct: 0.18, yPct: 0.65, color: '#00b4d8' },
    { name: 'Aswin G', role: 'Treasurer', dept: 'Executive Core', xPct: 0.40, yPct: 0.82, color: '#ff9e00' },
    { name: 'Shweta V', role: 'Joint Secretary', dept: 'Executive Core', xPct: 0.60, yPct: 0.82, color: '#7209b7' },
    { name: 'Ajay S', role: 'Joint Treasurer', dept: 'Executive Core', xPct: 0.82, yPct: 0.65, color: '#06d6a0' }
  ];

  function resizeConstellation() {
    if (!constCanvas || !bearersConstellationView) return;
    constCanvas.width = bearersConstellationView.offsetWidth;
    constCanvas.height = bearersConstellationView.offsetHeight;
  }
  window.addEventListener('resize', resizeConstellation);

  function renderConstellation() {
    if (!constCtx || !constCanvas || bearersConstellationView.classList.contains('hidden')) {
      requestAnimationFrame(renderConstellation);
      return;
    }
    constCtx.clearRect(0, 0, constCanvas.width, constCanvas.height);

    const cRect = constCanvas.getBoundingClientRect();
    const mX = state.mouse.x - cRect.left;
    const mY = state.mouse.y - cRect.top;

    const centerX = constCanvas.width / 2;
    const centerY = constCanvas.height / 2;

    // Draw Central Core Node
    constCtx.beginPath();
    constCtx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    constCtx.fillStyle = '#ffffff';
    constCtx.shadowColor = 'rgba(0, 140, 255, 0.4)';
    constCtx.shadowBlur = 20;
    constCtx.fill();
    constCtx.strokeStyle = 'var(--cyan)';
    constCtx.lineWidth = 2;
    constCtx.stroke();

    constCtx.fillStyle = '#0055ff';
    constCtx.font = 'bold 9px "JetBrains Mono"';
    constCtx.textAlign = 'center';
    constCtx.fillText('DEV DYNASTY', centerX, centerY - 2);
    constCtx.fillText('CORE', centerX, centerY + 10);

    // Draw Laser filaments to each leader node
    bearerNodes.forEach((node) => {
      let nx = constCanvas.width * node.xPct;
      let ny = constCanvas.height * node.yPct;

      // Magnetic pull to mouse
      const distToMouse = Math.hypot(mX - nx, mY - ny);
      if (distToMouse < 100) {
        nx += (mX - nx) * 0.2;
        ny += (mY - ny) * 0.2;
      }

      // Laser Line
      constCtx.beginPath();
      constCtx.moveTo(centerX, centerY);
      constCtx.lineTo(nx, ny);
      constCtx.strokeStyle = node.color;
      constCtx.lineWidth = distToMouse < 100 ? 3 : 1.5;
      constCtx.shadowColor = node.color;
      constCtx.shadowBlur = distToMouse < 100 ? 15 : 5;
      constCtx.stroke();

      // Node Circle
      constCtx.beginPath();
      constCtx.arc(nx, ny, 22, 0, Math.PI * 2);
      constCtx.fillStyle = '#ffffff';
      constCtx.fill();
      constCtx.strokeStyle = node.color;
      constCtx.lineWidth = 2;
      constCtx.stroke();

      // Text Labels
      constCtx.fillStyle = '#0d1829';
      constCtx.font = 'bold 11px "Syne"';
      constCtx.textAlign = 'center';
      constCtx.fillText(node.name, nx, ny + 36);

      constCtx.fillStyle = node.color;
      constCtx.font = 'bold 9px "JetBrains Mono"';
      constCtx.fillText(node.role, nx, ny + 48);

      constCtx.fillStyle = '#6b7e99';
      constCtx.font = '8px "JetBrains Mono"';
      constCtx.fillText(node.dept, nx, ny + 59);
    });

    requestAnimationFrame(renderConstellation);
  }
  renderConstellation();

  // ==========================================================================
  // 8. EVENTS SECTION : HORIZONTAL TIMELINE SWITCHER
  // ==========================================================================
  const timelineStops = document.querySelectorAll('.timeline-stop');
  const eventStages = document.querySelectorAll('.event-card-stage');
  const timelineGlowBar = document.getElementById('timeline-glow-bar');

  function setEventStage(idx) {
    if (idx < 0 || idx >= timelineStops.length) return;

    timelineStops.forEach((stop, i) => {
      stop.classList.toggle('active', i === idx);
    });

    eventStages.forEach((stage, i) => {
      const isActive = i === idx;
      stage.classList.toggle('active', isActive);
      const vid = stage.querySelector('video');
      if (vid) {
        if (isActive) {
          try {
            vid.muted = true;
            const playPromise = vid.play();
            if (playPromise !== undefined) playPromise.catch(() => {});
          } catch (e) {}
        } else {
          vid.pause();
        }
      }
    });

    if (timelineGlowBar) {
      const pct = (idx / (timelineStops.length - 1)) * 100;
      timelineGlowBar.style.width = `${pct}%`;
    }
  }

  timelineStops.forEach((stop, idx) => {
    stop.addEventListener('click', () => {
      setEventStage(idx);
      playSound('click');
    });
  });

  // Keyboard navigation for events timeline
  window.addEventListener('keydown', (e) => {
    const eventsSec = document.getElementById('events');
    if (!eventsSec) return;
    const rect = eventsSec.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!isVisible) return;

    const currentIdx = Array.from(timelineStops).findIndex(s => s.classList.contains('active'));
    if (e.key === 'ArrowRight' && currentIdx < timelineStops.length - 1) {
      setEventStage(currentIdx + 1);
      playSound('click');
    } else if (e.key === 'ArrowLeft' && currentIdx > 0) {
      setEventStage(currentIdx - 1);
      playSound('click');
    }
  });

  // 1. Code Debugger Sandbox
  const bugMarker = document.getElementById('bug-marker');
  const terminalFixBtn = document.getElementById('terminal-fix-trigger');
  const terminalStatus = document.getElementById('terminal-debug-status');

  function applyDebugPatch() {
    if (bugMarker) {
      bugMarker.textContent = 'i < candidates.length';
      bugMarker.style.background = 'rgba(39, 201, 63, 0.2)';
      bugMarker.style.color = '#27c93f';
      bugMarker.style.borderColor = '#27c93f';
    }
    if (terminalStatus) {
      terminalStatus.textContent = 'STATUS: 100% PATCHED — ALL TESTS PASSING!';
      terminalStatus.style.color = '#27c93f';
    }
    playSound('release');
  }

  if (bugMarker) bugMarker.addEventListener('click', applyDebugPatch);
  if (terminalFixBtn) terminalFixBtn.addEventListener('click', applyDebugPatch);

  // 2. Web Incognito Sandbox
  const mockViewport = document.getElementById('incognito-viewport');
  const invertBtn = document.getElementById('sabotage-invert-btn');
  const glitchBtn = document.getElementById('sabotage-glitch-btn');
  const resetBtn = document.getElementById('sabotage-reset-btn');

  if (invertBtn && mockViewport) {
    invertBtn.addEventListener('click', () => {
      mockViewport.style.filter = 'invert(1) hue-rotate(180deg)';
      playSound('click');
    });
  }

  if (glitchBtn && mockViewport) {
    glitchBtn.addEventListener('click', () => {
      mockViewport.style.transform = 'skewX(8deg) scaleY(0.95)';
      mockViewport.style.filter = 'contrast(200%)';
      playSound('click');
    });
  }

  if (resetBtn && mockViewport) {
    resetBtn.addEventListener('click', () => {
      mockViewport.style.filter = 'none';
      mockViewport.style.transform = 'none';
      playSound('release');
    });
  }

  // 3. Game Dev Engines Matrix
  // Clean static / interactive engine cards

  // 4. Workshop Topic Toggle
  const knowledgeNodes = document.querySelectorAll('.knowledge-node');
  knowledgeNodes.forEach(kn => {
    kn.addEventListener('click', () => {
      knowledgeNodes.forEach(k => k.classList.remove('active'));
      kn.classList.add('active');
      playSound('click');
    });
  });

  // 5. Vision Video Audio Toggle
  const visionVideo = document.getElementById('vision-video-player');
  const soundToggle = document.getElementById('vision-sound-toggle');
  const iconMuted = document.getElementById('sound-icon-muted');
  const iconUnmuted = document.getElementById('sound-icon-unmuted');
  if (visionVideo && soundToggle) {
    soundToggle.addEventListener('click', () => {
      visionVideo.muted = !visionVideo.muted;
      if (visionVideo.muted) {
        if (iconMuted) iconMuted.style.display = 'block';
        if (iconUnmuted) iconUnmuted.style.display = 'none';
        soundToggle.title = 'Unmute Audio';
      } else {
        if (iconMuted) iconMuted.style.display = 'none';
        if (iconUnmuted) iconUnmuted.style.display = 'block';
        soundToggle.title = 'Mute Audio';
        visionVideo.play().catch(() => {});
      }
      playSound('click');
    });
  }

  console.log('⚡ Dev Dynasty 2026–27 Digital Universe Initialized Successfully.');
});
