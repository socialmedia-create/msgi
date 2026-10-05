// ==========================================================================
// MICROSOFT AI CLUB - INTERACTIVE SCRIPTS & NEURAL CANVAS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initCustomCursor();
    initTiltCards();
    initPreloader();
    initNeuralCanvas();
    initNavbarScroll();
    initSmoothAnchorScroll();
    initMobileNav();
    initFilters();
    initScrollReveal();
    initFormHandler();
    initFigmaToolbar();
    initLightbox();
    initTeamRoster();
    initParallax();
});

// --------------------------------------------------------------------------
// 0. Theme Engine (Light / Dark Mode Toggle with Storage)
// --------------------------------------------------------------------------
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;

    // Read stored preference, fallback to system preference, or default to light
    const savedTheme = localStorage.getItem('msc_theme');
    let currentTheme = savedTheme || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    let isThemeTransitioning = false;

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('msc_theme', theme);

        if (toggleBtn) {
            const icon = toggleBtn.querySelector('.theme-icon');
            if (icon) {
                // Moon for light mode (click to go dark), Sun for dark mode (click to go light)
                icon.textContent = theme === 'dark' ? '☼' : '☾';
            }
            toggleBtn.setAttribute('title', theme === 'dark' ? 'Switch to Soothing Light Theme' : 'Switch to Cyber Obsidian Dark Theme');
        }

        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }

    applyTheme(currentTheme);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (isThemeTransitioning) return;
            const activeTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            transitionTheme(activeTheme);
        });
    }

    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('msc_theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    function createSpreadFallback(x, y, radius, targetTheme) {
        const ripple = document.createElement('div');
        ripple.className = 'theme-spread-fallback';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.width = `${radius * 2}px`;
        ripple.style.height = `${radius * 2}px`;
        ripple.setAttribute('data-target-theme', targetTheme);
        document.body.appendChild(ripple);

        const anim = ripple.animate([
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 }
        ], {
            duration: 1100,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
        });

        const cleanup = () => {
            if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
        };
        anim.addEventListener('finish', cleanup);
        anim.addEventListener('cancel', cleanup);
        setTimeout(cleanup, 1150);
    }

    function transitionTheme(theme) {
        const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            applyTheme(theme);
            return;
        }

        isThemeTransitioning = true;
        toggleBtn?.classList.remove('is-transitioning');
        void toggleBtn?.offsetWidth;
        toggleBtn?.classList.add('is-transitioning');
        window.setTimeout(() => {
            toggleBtn?.classList.remove('is-transitioning');
            isThemeTransitioning = false;
        }, 1100);

        const rect = toggleBtn ? toggleBtn.getBoundingClientRect() : {
            left: window.innerWidth / 2,
            top: window.innerHeight / 2,
            width: 0,
            height: 0
        };
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        const endRadius = Math.hypot(
            Math.max(x, vw - x),
            Math.max(y, vh - y)
        );

        root.style.setProperty('--theme-spread-x', `${x}px`);
        root.style.setProperty('--theme-spread-y', `${y}px`);
        root.style.setProperty('--theme-spread-radius', `${endRadius}px`);

        if (document.startViewTransition) {
            const transition = document.startViewTransition(() => {
                applyTheme(theme);
            });

            transition.ready.then(() => {
                try {
                    document.documentElement.animate(
                        {
                            clipPath: [
                                `circle(0px at ${x}px ${y}px)`,
                                `circle(${endRadius}px at ${x}px ${y}px)`
                            ]
                        },
                        {
                            duration: 1100,
                            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                            pseudoElement: '::view-transition-new(root)'
                        }
                    );
                } catch (e) {
                    // Supported by CSS animation ::view-transition-new(root)
                }
            }).catch(() => {
                applyTheme(theme);
            });

            transition.finished.finally(() => {
                isThemeTransitioning = false;
            });
            return;
        }

        // Smooth circular spread fallback for browsers without native View Transitions API
        createSpreadFallback(x, y, endRadius, theme);
        applyTheme(theme);
        setTimeout(() => {
            isThemeTransitioning = false;
        }, 1100);
    }
}

// --------------------------------------------------------------------------
// 0.1 Modern Interactive Custom Cursor
// --------------------------------------------------------------------------
function initCustomCursor() {
    const dot = document.getElementById('cursor-dot');
    if (!dot) return;

    if (window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches) return;

    let isVisible = false;
    let isPressed = false;
    let currentX = -100;
    let currentY = -100;

    function updateCursorTransform() {
        const scale = isPressed ? 'scale(0.92)' : 'scale(1)';
        dot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-38%, 0) ${scale}`;
    }

    window.addEventListener('mousemove', (e) => {
        currentX = e.clientX;
        currentY = e.clientY;
        if (!isVisible) {
            dot.style.opacity = '1';
            isVisible = true;
        }
        updateCursorTransform();
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        isVisible = false;
    });

    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        isVisible = true;
    });

    window.addEventListener('mousedown', () => {
        isPressed = true;
        updateCursorTransform();
    });

    window.addEventListener('mouseup', () => {
        isPressed = false;
        updateCursorTransform();
    });
}

// --------------------------------------------------------------------------
// 0.2 Glassmorphism 3D Tilting Cards (Smooth 60 FPS Physics & Glare)
// --------------------------------------------------------------------------
function initTiltCards() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cards = document.querySelectorAll(
        '.objective-card, .event-card, .vm-card, .stat-card, .pillar-card, .contact-form-card, .contact-info-card, .gallery-card, .team-feature'
    );

    cards.forEach(card => {
        card.classList.add('tilt-card');

        let glare = card.querySelector('.tilt-glare');
        if (!glare) {
            glare = document.createElement('div');
            glare.className = 'tilt-glare';
            card.appendChild(glare);
        }

        let bounds = card.getBoundingClientRect();
        let targetRotateX = 0;
        let targetRotateY = 0;
        let currentRotateX = 0;
        let currentRotateY = 0;
        let isHovered = false;
        let animId = null;

        function updateCardPhysics() {
            if (!isHovered) {
                targetRotateX = 0;
                targetRotateY = 0;
            }

            currentRotateX += (targetRotateX - currentRotateX) * 0.14;
            currentRotateY += (targetRotateY - currentRotateY) * 0.14;

            const scale = isHovered ? 1.025 : 1;
            card.style.transform = `perspective(1000px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;

            if (isHovered || Math.abs(currentRotateX) > 0.05 || Math.abs(currentRotateY) > 0.05) {
                animId = requestAnimationFrame(updateCardPhysics);
            } else {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                animId = null;
            }
        }

        card.addEventListener('pointerenter', () => {
            isHovered = true;
            bounds = card.getBoundingClientRect();
            glare.style.opacity = '1';
            if (!animId) animId = requestAnimationFrame(updateCardPhysics);
        });

        card.addEventListener('pointermove', (e) => {
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;

            const maxTilt = 7;
            const xPct = (x / bounds.width) - 0.5;
            const yPct = (y / bounds.height) - 0.5;

            targetRotateX = -yPct * maxTilt * 2;
            targetRotateY = xPct * maxTilt * 2;

            glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.2) 0%, transparent 65%)`;

            if (!animId) animId = requestAnimationFrame(updateCardPhysics);
        });

        card.addEventListener('pointerleave', () => {
            isHovered = false;
            glare.style.opacity = '0';
        });
    });
}

// --------------------------------------------------------------------------
// 1. Premium Entrance / Preloader Animation
// --------------------------------------------------------------------------
function initPreloader() {
    const preloader = document.getElementById('site-preloader');
    const progressBar = document.getElementById('preloader-bar');
    const statusText = document.getElementById('preloader-status');
    const counterText = document.getElementById('preloader-counter');
    if (!preloader || !progressBar) return;

    let progress = 0;
    const startTime = performance.now();
    const duration = 1250; // Total entrance animation duration in ms

    const statusMessages = [
        { at: 0, text: 'INITIALIZING NEURAL CORE...' },
        { at: 35, text: 'SYNCHRONIZING MICROSOFT SERVICES...' },
        { at: 70, text: 'CALIBRATING FRONTIER MODELS...' },
        { at: 92, text: 'SYSTEMS ONLINE • READY' }
    ];

    function updateProgress(currentTime) {
        const elapsed = currentTime - startTime;
        progress = Math.min((elapsed / duration) * 100, 100);

        progressBar.style.width = `${progress}%`;
        if (counterText) {
            counterText.textContent = `${Math.round(progress)}%`;
        }

        if (statusText) {
            for (let i = statusMessages.length - 1; i >= 0; i--) {
                if (progress >= statusMessages[i].at) {
                    statusText.textContent = statusMessages[i].text;
                    break;
                }
            }
        }

        if (progress < 100) {
            requestAnimationFrame(updateProgress);
        } else {
            setTimeout(() => {
                preloader.classList.add('preloader-hidden');
                document.body.classList.add('loaded');

                setTimeout(() => {
                    preloader.style.display = 'none';
                    // Trigger scroll if URL has hash (e.g. #vision)
                    handleInitialHash();
                }, 900);
            }, 250);
        }
    }

    requestAnimationFrame(updateProgress);
}

// --------------------------------------------------------------------------
// 2. Guaranteed Smooth Scrolling for Anchor Links (Fixes in-page jumps)
// --------------------------------------------------------------------------
let isClickScrolling = false;
let clickScrollTimer = null;

// High-performance 120fps easeOutQuint scroll engine
function smoothScrollTo(targetY, duration = 480) {
    const startY = window.pageYOffset || document.documentElement.scrollTop;
    const diff = targetY - startY;
    if (Math.abs(diff) < 2) return;

    let startTime = null;
    isClickScrolling = true;

    function easeOutQuint(t) {
        return 1 - Math.pow(1 - t, 5);
    }

    function scrollStep(timestamp) {
        if (!isClickScrolling) return; // User flicked wheel/touch, allow manual scroll
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeOutQuint(progress);

        window.scrollTo(0, startY + (diff * ease));

        if (progress < 1) {
            requestAnimationFrame(scrollStep);
        } else {
            isClickScrolling = false;
        }
    }

    requestAnimationFrame(scrollStep);
}

// Seamless interruption if user manually scrolls via mousewheel or touch
window.addEventListener('wheel', () => { isClickScrolling = false; }, { passive: true });
window.addEventListener('touchmove', () => { isClickScrolling = false; }, { passive: true });

function initSmoothAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const siteHeader = document.getElementById('site-header');
            const headerHeight = siteHeader ? siteHeader.getBoundingClientRect().height : 48;

            if (targetId === '#home') {
                e.preventDefault();
                smoothScrollTo(0, 450);
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

                const slider = document.getElementById('nav-pill-slider');
                if (slider) slider.style.opacity = '0';

                try {
                    if (window.location.protocol !== 'file:') {
                        history.pushState(null, null, '#home');
                    }
                } catch (_) {}
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                // Extra breathing room (18px) so the rounded top corners and shadow of the island are fully framed below floating navbar
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = Math.max(0, elementPosition - headerHeight - 18);

                // Update active state on nav links immediately
                document.querySelectorAll('.nav-link').forEach(l => {
                    if (l.getAttribute('href') === targetId) {
                        l.classList.add('active');
                    } else {
                        l.classList.remove('active');
                    }
                });

                // Immediately glide slider pill toward clicked target
                const targetLink = document.querySelector(`.nav-link[href="${targetId}"]`);
                if (targetLink && typeof window.updateNavPillGlobal === 'function') {
                    window.updateNavPillGlobal(targetLink);
                }

                smoothScrollTo(offsetPosition, 480);

                try {
                    if (window.location.protocol !== 'file:') {
                        history.pushState(null, null, targetId);
                    }
                } catch (_) {}
            }
        });
    });
}

function handleInitialHash() {
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            const siteHeader = document.getElementById('site-header');
            const headerHeight = siteHeader ? siteHeader.getBoundingClientRect().height : 48;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = Math.max(0, elementPosition - headerHeight - 18);

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Activate corresponding nav link
            document.querySelectorAll('.nav-link').forEach(l => {
                if (l.getAttribute('href') === window.location.hash) {
                    l.classList.add('active');
                } else {
                    l.classList.remove('active');
                }
            });
        }
    }
}

// --------------------------------------------------------------------------
// 3. Floating Bioluminescent Orbs with Realistic Elastic Collision Physics
// --------------------------------------------------------------------------
function initNeuralCanvas() {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;

    let particles = [];
    // Relaxed, balanced count for serene spacing and clean aesthetic
    const particleCount = Math.min(Math.max(Math.floor((width * height) / 48000), 16), 28);

    let mouse = { x: null, y: null, radius: 180, active: false };

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
        mouse.active = false;
        mouse.x = null;
        mouse.y = null;
    });

    class Orb {
        constructor() {
            // Variety of sizes: soft embers, medium glowing orbs, subtle ambient bokeh
            const roll = Math.random();
            if (roll < 0.60) {
                this.radius = Math.random() * 2 + 3;   // Soft ember (r: 3 - 5)
            } else if (roll < 0.88) {
                this.radius = Math.random() * 3 + 5.5; // Medium orb (r: 5.5 - 8.5)
            } else {
                this.radius = Math.random() * 5 + 9.5; // Ambient bokeh orb (r: 9.5 - 14.5)
            }

            this.mass = this.radius * this.radius;

            this.x = Math.random() * (width - this.radius * 2) + this.radius;
            this.y = Math.random() * (height - this.radius * 2) + this.radius;

            // Ultra-soothing, graceful drift (0.12 - 0.28 px/frame)
            const speed = (Math.random() * 0.16 + 0.10) / Math.sqrt(this.radius * 0.45);
            const angle = Math.random() * Math.PI * 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;

            // Slow, serene breathing cycle
            this.phase = Math.random() * Math.PI * 2;
            this.fadeSpeed = Math.random() * 0.005 + 0.003;
            this.baseAlpha = Math.random() * 0.22 + 0.32;
            this.alphaRange = Math.random() * 0.12 + 0.08;
            this.flash = 0;

            this.updateColorPalette();
        }

        updateColorPalette() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            
            // Soft glowing pastel tones matching Microsoft AI Club logo and identity
            const lightPalettes = [
                { base: '2, 132, 199',   core: 'rgba(2, 132, 199, ' },   // Azure Sky
                { base: '217, 119, 6',   core: 'rgba(217, 119, 6, ' },   // Circuit Gold
                { base: '117, 81, 216',  core: 'rgba(117, 81, 216, ' },  // Pastel Purple
                { base: '16, 185, 129',  core: 'rgba(16, 185, 129, ' },  // Emerald
                { base: '234, 88, 12',   core: 'rgba(234, 88, 12, ' }    // Coral Peach
            ];

            const darkPalettes = [
                { base: '56, 189, 248',  core: 'rgba(224, 242, 254, ' }, // Cyber Azure / Cyan
                { base: '245, 158, 11',  core: 'rgba(254, 243, 199, ' }, // Neon Circuit Gold
                { base: '168, 85, 247',  core: 'rgba(243, 232, 255, ' }, // Violet Aura
                { base: '52, 211, 153',  core: 'rgba(209, 250, 229, ' }, // Emerald Glow
                { base: '244, 63, 94',   core: 'rgba(255, 228, 230, ' }  // Radiant Rose
            ];

            const palettes = isDark ? darkPalettes : lightPalettes;
            const chosen = palettes[Math.floor(Math.random() * palettes.length)];
            this.colorRgb = chosen.base;
            this.corePrefix = chosen.core;
        }

        update() {
            // 1. Move
            this.x += this.vx;
            this.y += this.vy;

            // 2. Extremely subtle, silky ambient drift
            this.vx += (Math.random() - 0.5) * 0.003;
            this.vy += (Math.random() - 0.5) * 0.003;

            // 3. Gentle velocity damping & soothing max speed clamp
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            const maxSpeed = 0.52; // Very calm, slow cap
            if (speed > maxSpeed) {
                this.vx = (this.vx / speed) * maxSpeed;
                this.vy = (this.vy / speed) * maxSpeed;
            }

            // 4. Soft Cushioned Boundary / Wall Collisions (restitution = 0.78)
            const restitution = 0.78;
            if (this.x - this.radius < 0) {
                this.x = this.radius;
                this.vx = -this.vx * restitution;
                this.flash = Math.min(this.flash + 0.15, 0.4);
            } else if (this.x + this.radius > width) {
                this.x = width - this.radius;
                this.vx = -this.vx * restitution;
                this.flash = Math.min(this.flash + 0.15, 0.4);
            }

            if (this.y - this.radius < 0) {
                this.y = this.radius;
                this.vy = -this.vy * restitution;
                this.flash = Math.min(this.flash + 0.15, 0.4);
            } else if (this.y + this.radius > height) {
                this.y = height - this.radius;
                this.vy = -this.vy * restitution;
                this.flash = Math.min(this.flash + 0.15, 0.4);
            }

            // 5. Gentle, Water-like Mouse Parting
            if (mouse.active && mouse.x !== null && mouse.y !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius && dist > 0.01) {
                    const force = ((mouse.radius - dist) / mouse.radius) * 0.06;
                    const nx = dx / dist;
                    const ny = dy / dist;
                    this.vx += nx * force * 0.5;
                    this.vy += ny * force * 0.5;
                    this.flash = Math.min(this.flash + 0.1, 0.3);
                }
            }

            // 6. Slow Breathing Alpha Cycle
            this.phase += this.fadeSpeed;
            this.flash *= 0.94; // Smooth decay
        }

        draw() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const breathingAlpha = this.baseAlpha + Math.sin(this.phase) * this.alphaRange;
            const currentAlpha = Math.max(0.10, Math.min(0.85, breathingAlpha + this.flash * 0.25));

            // Radius scales softly on subtle impact
            const renderRadius = this.radius * (1 + this.flash * 0.12);
            const auraRadius = renderRadius * (isDark ? 4.0 : 3.5);

            // Layer 1: Soft Ambient Aura Radial Gradient
            const auraGrad = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, auraRadius
            );
            const auraAlpha = isDark ? currentAlpha * 0.30 : currentAlpha * 0.18;
            auraGrad.addColorStop(0, `rgba(${this.colorRgb}, ${auraAlpha})`);
            auraGrad.addColorStop(0.45, `rgba(${this.colorRgb}, ${auraAlpha * 0.38})`);
            auraGrad.addColorStop(1, `rgba(${this.colorRgb}, 0)`);

            ctx.beginPath();
            ctx.arc(this.x, this.y, auraRadius, 0, Math.PI * 2);
            ctx.fillStyle = auraGrad;
            ctx.fill();

            // Layer 2: Glowing Middle Halo
            ctx.beginPath();
            ctx.arc(this.x, this.y, renderRadius * 1.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.colorRgb}, ${currentAlpha * 0.38})`;
            ctx.shadowBlur = isDark ? 12 : 6;
            ctx.shadowColor = `rgba(${this.colorRgb}, 0.65)`;
            ctx.fill();

            // Layer 3: Solid Inner Core
            ctx.beginPath();
            ctx.arc(this.x, this.y, renderRadius, 0, Math.PI * 2);
            ctx.fillStyle = `${this.corePrefix}${currentAlpha})`;
            ctx.fill();

            ctx.shadowBlur = 0;
        }
    }

    // Resolve gentle, cushioned elastic collisions between pairs of orbs
    function resolveCollisions() {
        const restitution = 0.82; // Soft, cushioned elasticity

        for (let i = 0; i < particles.length; i++) {
            const p1 = particles[i];
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];

                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const minDist = p1.radius + p2.radius;

                if (dist < minDist && dist > 0.001) {
                    const nx = dx / dist;
                    const ny = dy / dist;

                    const rvx = p1.vx - p2.vx;
                    const rvy = p1.vy - p2.vy;
                    const velAlongNormal = rvx * nx + rvy * ny;

                    if (velAlongNormal > 0) {
                        const impulse = (-(1 + restitution) * velAlongNormal) / ((1 / p1.mass) + (1 / p2.mass));

                        p1.vx += (impulse / p1.mass) * nx;
                        p1.vy += (impulse / p1.mass) * ny;
                        p2.vx -= (impulse / p2.mass) * nx;
                        p2.vy -= (impulse / p2.mass) * ny;

                        // Subtle, gentle shimmer on contact
                        p1.flash = Math.min(p1.flash + 0.15, 0.4);
                        p2.flash = Math.min(p2.flash + 0.15, 0.4);
                    }

                    // Positional correction
                    const percent = 0.8;
                    const slop = 0.01;
                    const penetration = Math.max(0, minDist - dist - slop);
                    const correction = (penetration / ((1 / p1.mass) + (1 / p2.mass))) * percent;

                    p1.x -= (correction / p1.mass) * nx;
                    p1.y -= (correction / p1.mass) * ny;
                    p2.x += (correction / p2.mass) * nx;
                    p2.y += (correction / p2.mass) * ny;
                }
            }
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Orb());
    }

    window.addEventListener('themeChanged', () => {
        particles.forEach(p => p.updateColorPalette());
    });

    let isCanvasVisible = true;
    let canvasAnimId = null;

    function animate() {
        if (!isCanvasVisible) {
            canvasAnimId = null;
            return;
        }
        ctx.clearRect(0, 0, width, height);

        // Update physics & handle elastic collisions
        particles.forEach(p => p.update());
        resolveCollisions();

        // Render multi-layer glowing orbs (NO NODE LINES)
        particles.forEach(p => p.draw());

        canvasAnimId = requestAnimationFrame(animate);
    }

    if ('IntersectionObserver' in window) {
        const heroSection = document.getElementById('home') || canvas;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isCanvasVisible = entry.isIntersecting;
                if (isCanvasVisible && !canvasAnimId) {
                    animate();
                }
            });
        }, { threshold: 0.05 });
        observer.observe(heroSection);
    } else {
        animate();
    }
}

// --------------------------------------------------------------------------
// 4. Sticky Navbar Glass Scroll Effect & Real-Time Section ScrollSpy
// --------------------------------------------------------------------------
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const siteHeader = document.getElementById('site-header');
    const navContainer = document.querySelector('.nav-links');
    const navLinks = Array.from(document.querySelectorAll('.nav-links .nav-link'));
    if (!navbar || !navContainer) return;

    // Ordered list of section IDs corresponding to nav links
    const sectionIds = ['about', 'objectives', 'events', 'gallery', 'team', 'contact'];
    const sectionElements = sectionIds
        .map(id => document.getElementById(id))
        .filter(el => el !== null);

    let activeNavId = null;
    let isHeaderScrolled = false;
    let sectionCache = [];
    const pillPosCache = new Map();

    function cachePositions() {
        // Cache section offsets for zero-reflow ScrollSpy
        sectionCache = sectionElements.map(el => {
            let offsetTop = 0;
            let curr = el;
            while (curr) {
                offsetTop += curr.offsetTop || 0;
                curr = curr.offsetParent;
            }
            return {
                id: '#' + el.id,
                top: offsetTop,
                height: el.offsetHeight || 0
            };
        });

        // Pre-cache desktop nav pill coordinates relative to .nav-links
        pillPosCache.clear();
        if (window.innerWidth > 900) {
            const parentRect = navContainer.getBoundingClientRect();
            navLinks.forEach(link => {
                const rect = link.getBoundingClientRect();
                pillPosCache.set(link, {
                    left: Math.round(rect.left - parentRect.left),
                    width: Math.round(rect.width)
                });
            });
        }
    }

    cachePositions();

    function updateNavPill(targetEl) {
        const slider = document.getElementById('nav-pill-slider');
        if (!slider || !navContainer || window.innerWidth <= 900) {
            if (slider) slider.style.opacity = '0';
            return;
        }

        const el = targetEl || document.querySelector('.nav-links .nav-link.active');
        if (el) {
            let pos = pillPosCache.get(el);
            if (!pos) {
                const elRect = el.getBoundingClientRect();
                const parentRect = navContainer.getBoundingClientRect();
                pos = {
                    left: Math.round(elRect.left - parentRect.left),
                    width: Math.round(elRect.width)
                };
                pillPosCache.set(el, pos);
            }
            slider.style.opacity = '1';
            slider.style.transform = `translate3d(${pos.left}px, -50%, 0)`;
            slider.style.width = `${pos.width}px`;
        } else {
            slider.style.opacity = '0';
        }
    }

    // Expose globally so anchor click events glide the pill immediately at 120fps!
    window.updateNavPillGlobal = updateNavPill;

    function updateScrollState() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        // Ensure header firmly pins to top: 0 once scrolled past ribbon
        if (siteHeader) {
            const ribbon = document.getElementById('announcement-ribbon');
            const ribbonHeight = ribbon ? ribbon.offsetHeight : 32;
            if (scrollY >= ribbonHeight) {
                siteHeader.style.position = 'fixed';
                siteHeader.style.top = '0';
                siteHeader.style.left = '0';
                siteHeader.style.right = '0';
                siteHeader.style.zIndex = '1000';
                document.body.style.paddingTop = siteHeader.offsetHeight + 'px';
            } else {
                siteHeader.style.position = '';
                siteHeader.style.top = '';
                siteHeader.style.left = '';
                siteHeader.style.right = '';
                siteHeader.style.zIndex = '';
                document.body.style.paddingTop = '';
            }
        }

        // 1. Scrolled glass style on navbar (Zero-jank hysteresis)
        if (scrollY > 35 && !isHeaderScrolled) {
            isHeaderScrolled = true;
            navbar.classList.add('scrolled');
            if (siteHeader) siteHeader.classList.add('scrolled');
        } else if (scrollY < 12 && isHeaderScrolled) {
            isHeaderScrolled = false;
            navbar.classList.remove('scrolled');
            if (siteHeader) siteHeader.classList.remove('scrolled');
        }

        // If user just clicked a nav link, smoothScrollTo handles the smooth glide
        if (isClickScrolling) return;

        // 2. Ultra-Fast Zero-Reflow ScrollSpy Tracking
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const triggerPos = scrollY + 140;

        // Near top of page (Hero section)
        if (scrollY < 180) {
            if (activeNavId !== null) {
                activeNavId = null;
                navLinks.forEach(l => l.classList.remove('active'));
                updateNavPill();
            }
            return;
        }

        // Near bottom of page (Highlight contact)
        if (scrollY + windowHeight >= documentHeight - 60) {
            if (activeNavId !== '#contact') {
                activeNavId = '#contact';
                navLinks.forEach(l => {
                    if (l.getAttribute('href') === '#contact') {
                        l.classList.add('active');
                    } else {
                        l.classList.remove('active');
                    }
                });
                updateNavPill();
            }
            return;
        }

        // Fast arithmetic comparison using cached section offsets (ZERO layout recalculations!)
        let newActiveId = null;
        for (let i = sectionCache.length - 1; i >= 0; i--) {
            if (triggerPos >= sectionCache[i].top) {
                newActiveId = sectionCache[i].id;
                break;
            }
        }

        // ONLY touch the DOM if active section actually changed!
        if (newActiveId !== activeNavId) {
            activeNavId = newActiveId;
            navLinks.forEach(l => {
                if (newActiveId && l.getAttribute('href') === newActiveId) {
                    l.classList.add('active');
                } else {
                    l.classList.remove('active');
                }
            });
            updateNavPill();
        }
    }

    // Fluid gliding hover transitions:
    // Moving across links glides smoothly without jitter or unwanted intermediate resets.
    // Leaving the entire nav container smoothly returns the pill to the active section.
    navLinks.forEach(link => {
        link.addEventListener('pointerenter', () => {
            updateNavPill(link);
        });
    });

    navContainer.addEventListener('pointerleave', () => {
        updateNavPill(); // returns smoothly to currently active section link
    });

    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            cachePositions();
            updateScrollState();
            updateNavPill();
        }, 80);
    });

    // Re-cache once images and fonts finish rendering
    window.addEventListener('load', () => {
        cachePositions();
        updateScrollState();
        updateNavPill();
    });

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScrollState();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Initial evaluation on load
    updateScrollState();
    updateNavPill();
}

// --------------------------------------------------------------------------
// 5. Mobile Navigation Toggle (120fps Hardware-Accelerated Drawer)
// --------------------------------------------------------------------------
function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggleBtn || !navLinks) return;

    toggleBtn.setAttribute('aria-expanded', 'false');

    function toggleMenu(forceState) {
        const isOpen = typeof forceState === 'boolean' ? forceState : !navLinks.classList.contains('mobile-open');
        navLinks.classList.toggle('mobile-open', isOpen);
        toggleBtn.classList.toggle('is-active', isOpen);
        toggleBtn.setAttribute('aria-expanded', String(isOpen));

        const icon = toggleBtn.querySelector('i');
        if (icon) {
            icon.className = isOpen ? 'fas fa-xmark' : 'fas fa-bars';
        }
    }

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                toggleMenu(false);
            }
        });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('mobile-open') && !navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('mobile-open')) {
            toggleMenu(false);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            toggleMenu(false);
        }
    });
}

// --------------------------------------------------------------------------
// 5.5. Team hierarchy scroll modal
// --------------------------------------------------------------------------
function initTeamRoster() {
    const modal = document.getElementById('team-roster-modal');
    const openBtn = document.getElementById('open-team-roster');
    const track = document.getElementById('team-roster-track');
    const dialog = modal?.querySelector('.team-roster-dialog');
    if (!modal || !openBtn || !track) return;

    const closeBtn = modal.querySelector('.team-roster-close');
    const profiles = Array.from(track.querySelectorAll('.roster-profile'));
    const sparkCanvas = document.getElementById('roster-spark-canvas');
    let ctx = sparkCanvas ? sparkCanvas.getContext('2d') : null;
    let sparks = [];
    let isRosterTicking = false;
    let sparkAnimId = null;
    let lastScrollTop = 0;
    let lastFocused = null;

    // Spark Canvas Setup
    function resizeCanvas() {
        if (!sparkCanvas || !sparkCanvas.parentElement) return;
        const rect = sparkCanvas.parentElement.getBoundingClientRect();
        const pixelRatio = window.devicePixelRatio || 1;
        sparkCanvas.width = rect.width * pixelRatio;
        sparkCanvas.height = rect.height * pixelRatio;
        if (ctx) {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(pixelRatio, pixelRatio);
        }
    }

    function addSparks(count = 3, isFinale = false) {
        if (!sparkCanvas) return;
        const rect = sparkCanvas.getBoundingClientRect();
        const colors = isFinale
            ? ['#F59E0B', '#FDE047', '#38BDF8', '#60A5FA', '#FFFFFF']
            : ['#38BDF8', '#0078D4', '#F59E0B', '#FDE047'];

        for (let i = 0; i < count; i++) {
            sparks.push({
                x: isFinale ? Math.random() * rect.width : (Math.random() > 0.5 ? rect.width * 0.15 : rect.width * 0.85) + (Math.random() - 0.5) * 60,
                y: isFinale ? rect.height * 0.75 + (Math.random() - 0.5) * 40 : rect.height * 0.5 + (Math.random() - 0.5) * 120,
                vx: (Math.random() - 0.5) * (isFinale ? 5 : 2.5),
                vy: (Math.random() - 0.5) * (isFinale ? 5 : 2.5) - (isFinale ? 2 : 0.8),
                size: Math.random() * (isFinale ? 3.5 : 2.2) + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1,
                decay: Math.random() * 0.035 + 0.02
            });
        }

        if (!sparkAnimId) {
            sparkAnimId = requestAnimationFrame(renderSparks);
        }
    }

    function renderSparks() {
        if (!ctx || !sparkCanvas) return;
        const rect = sparkCanvas.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);

        for (let i = sparks.length - 1; i >= 0; i--) {
            const s = sparks[i];
            s.x += s.vx;
            s.y += s.vy;
            s.alpha -= s.decay;

            if (s.alpha <= 0) {
                sparks.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.globalAlpha = Math.max(0, s.alpha);
            ctx.shadowBlur = s.size * 3;
            ctx.shadowColor = s.color;
            ctx.fillStyle = s.color;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        if (sparks.length > 0) {
            sparkAnimId = requestAnimationFrame(renderSparks);
        } else {
            sparkAnimId = null;
        }
    }

    function getStepSize() {
        if (profiles.length === 0) return 240;
        return profiles[0].offsetHeight + 14;
    }

    function updateRosterMotion() {
        const step = getStepSize();
        const scrollRange = Math.max(track.scrollHeight - track.clientHeight, 1);
        const scrollRatio = Math.min(1, Math.max(0, track.scrollTop / scrollRange));
        track.style.setProperty('--roster-progress', `${Math.max(6, scrollRatio * 100)}%`);
        const scrollDelta = Math.abs(track.scrollTop - lastScrollTop);
        lastScrollTop = track.scrollTop;

        // Spark dynamic effect on active scroll
        if (scrollDelta > 3) {
            addSparks(Math.min(4, Math.ceil(scrollDelta / 12)));
        }

        // Active card tracking: exactly 2 cards visible per view
        const topIndex = Math.max(0, Math.min(profiles.length - 2, Math.round(track.scrollTop / step)));

        // Update view badge: e.g. "01 - 02 / 09"
        const viewBadge = document.getElementById('roster-view-badge');
        if (viewBadge) {
            const firstNum = String(topIndex + 1).padStart(2, '0');
            const secondNum = String(Math.min(topIndex + 2, profiles.length)).padStart(2, '0');
            viewBadge.textContent = `${firstNum} - ${secondNum} / 09`;
        }

        // Highlight the pair of cards currently in view
        profiles.forEach((profile, i) => {
            const inView = (i === topIndex || i === topIndex + 1);
            profile.classList.toggle('is-current', inView);
        });

        const prevBtn = document.getElementById('roster-prev-btn');
        const nextBtn = document.getElementById('roster-next-btn');
        if (prevBtn) prevBtn.style.opacity = topIndex === 0 ? '0.4' : '1';
        if (nextBtn) nextBtn.style.opacity = topIndex >= profiles.length - 2 ? '0.4' : '1';

        // End celebration and gradient glow
        const isAtEnd = scrollRatio >= 0.92 || topIndex >= profiles.length - 2;
        if (dialog) {
            dialog.classList.toggle('reached-end', isAtEnd);
        }
        if (profiles.length > 0) {
            const lastProfile = profiles[profiles.length - 1];
            if (isAtEnd && !lastProfile.classList.contains('is-finale')) {
                lastProfile.classList.add('is-finale');
                addSparks(18, true);
            } else if (!isAtEnd && lastProfile.classList.contains('is-finale')) {
                lastProfile.classList.remove('is-finale');
            }
        }
    }

    function swapCard(direction) {
        const step = getStepSize();
        const currentTop = Math.round(track.scrollTop / step);
        const targetTop = Math.max(0, Math.min(profiles.length - 2, currentTop + direction));
        track.scrollTo({
            top: targetTop * step,
            behavior: 'smooth'
        });
        addSparks(4);
    }

    // Hover highlighting on cards
    profiles.forEach((profile, index) => {
        profile.addEventListener('mouseenter', () => {
            profiles.forEach((p, i) => p.classList.toggle('is-current', i === index));
        });
    });

    function onRosterScroll() {
        if (!isRosterTicking) {
            window.requestAnimationFrame(() => {
                updateRosterMotion();
                isRosterTicking = false;
            });
            isRosterTicking = true;
        }
    }

    function closeRoster() {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
        if (dialog) dialog.classList.remove('reached-end');
        sparks = [];
        if (lastFocused) lastFocused.focus();
        modal.setAttribute('aria-hidden', 'true');
    }

    openBtn.addEventListener('click', () => {
        lastFocused = document.activeElement;
        track.scrollTop = 0;
        profiles.forEach((p, i) => p.classList.toggle('is-current', i === 0 || i === 1));
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        window.requestAnimationFrame(() => {
            resizeCanvas();
            updateRosterMotion();
            closeBtn?.focus();
        });
    });

    window.addEventListener('resize', resizeCanvas, { passive: true });

    modal.querySelectorAll('[data-roster-close]').forEach(element => {
        element.addEventListener('click', closeRoster);
    });

    closeBtn?.addEventListener('click', closeRoster);
    track.addEventListener('scroll', onRosterScroll, { passive: true });

    // Smooth card swap on mouse wheel
    let isWheelThrottled = false;
    track.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) < 10) return;
        e.preventDefault();
        if (isWheelThrottled) return;
        isWheelThrottled = true;
        const dir = e.deltaY > 0 ? 1 : -1;
        swapCard(dir);
        setTimeout(() => { isWheelThrottled = false; }, 300);
    }, { passive: false });

    // Prev / Next button swap controls
    const prevBtn = document.getElementById('roster-prev-btn');
    const nextBtn = document.getElementById('roster-next-btn');
    prevBtn?.addEventListener('click', () => swapCard(-1));
    nextBtn?.addEventListener('click', () => swapCard(1));

    document.addEventListener('keydown', event => {
        if (!modal.classList.contains('is-open')) return;
        if (event.key === 'Escape') closeRoster();
        if (event.key === 'ArrowDown' || event.key === 'PageDown') {
            event.preventDefault();
            swapCard(1);
        }
        if (event.key === 'ArrowUp' || event.key === 'PageUp') {
            event.preventDefault();
            swapCard(-1);
        }
    });
}

// --------------------------------------------------------------------------
// 6. Interactive Category Filters (Digital Design Club / Raycast Style)
// --------------------------------------------------------------------------
function initFilters() {
    // Events filter
    const eventChips = document.querySelectorAll('.event-filter-chip');
    const eventCards = document.querySelectorAll('.event-card');

    eventChips.forEach(chip => {
        chip.addEventListener('click', () => {
            eventChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const category = chip.getAttribute('data-filter');

            eventCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category) {
                    card.style.display = '';
                    setTimeout(() => card.style.opacity = '1', 30);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 200);
                }
            });
        });
    });

    // Gallery filter
    const galleryChips = document.querySelectorAll('.gallery-filter-chip');
    const galleryCards = document.querySelectorAll('.gallery-card');
    const galleryGrid = document.querySelector('.gallery-masonry-grid');

    galleryChips.forEach(chip => {
        chip.addEventListener('click', () => {
            galleryChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const category = chip.getAttribute('data-filter');
            if (galleryGrid) {
                galleryGrid.classList.toggle('is-filtered', category !== 'all');
                galleryGrid.classList.remove(
                    'filter-inauguration',
                    'filter-build-without-building',
                    'filter-problem-hunt'
                );
                if (category && category !== 'all') {
                    galleryGrid.classList.add(`filter-${category}`);
                }
            }

            galleryCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category) {
                    card.style.display = '';
                    setTimeout(() => card.style.opacity = '1', 30);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 200);
                }
            });
        });
    });

    // Quick jump from event card to specific gallery category
    document.querySelectorAll('[data-open-event-gallery]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetCat = btn.getAttribute('data-open-event-gallery');
            const gallerySec = document.getElementById('gallery');
            if (gallerySec) {
                gallerySec.scrollIntoView({ behavior: 'smooth' });
                const targetChip = document.querySelector(`.gallery-filter-chip[data-filter="${targetCat}"]`);
                if (targetChip) {
                    setTimeout(() => targetChip.click(), 300);
                }
            }
        });
    });
}

// --------------------------------------------------------------------------
// 6.5. High-Impact Photo Lightbox Modal
// --------------------------------------------------------------------------
function initLightbox() {
    const lightbox = document.getElementById('club-photo-lightbox');
    if (!lightbox) return;

    const imgEl = document.getElementById('lightbox-img');
    const captionEl = document.getElementById('lightbox-caption');
    const categoryEl = document.getElementById('lightbox-category');
    const counterEl = document.getElementById('lightbox-counter');
    const closeBtn = lightbox.querySelector('.lightbox-close-btn');
    const prevBtn = lightbox.querySelector('.lightbox-prev-btn');
    const nextBtn = lightbox.querySelector('.lightbox-next-btn');
    const backdrop = lightbox.querySelector('.lightbox-backdrop');

    // Collect all elements with data-lightbox
    const triggerElements = Array.from(document.querySelectorAll('[data-lightbox]'));
    if (!triggerElements.length) return;

    // Deduplicate by image src to build playlist
    const photos = [];
    const seen = new Set();
    triggerElements.forEach(el => {
        const src = el.getAttribute('data-lightbox');
        if (!seen.has(src)) {
            seen.add(src);
            const caption = el.getAttribute('data-caption') || el.getAttribute('alt') || 'Club Photo';
            const category = src.includes('inauguration') ? 'Inauguration' : (src.includes('problem-hunt') ? 'Problem Hunt' : 'Build Without Building');
            photos.push({ src, caption, category });
        }
    });

    let currentIndex = 0;

    function showPhoto(index) {
        if (index < 0) index = photos.length - 1;
        if (index >= photos.length) index = 0;
        currentIndex = index;

        const photo = photos[currentIndex];
        imgEl.style.opacity = '0';
        setTimeout(() => {
            imgEl.src = photo.src;
            imgEl.alt = photo.caption;
            captionEl.textContent = photo.caption;
            categoryEl.textContent = photo.category.toUpperCase();
            counterEl.textContent = `${currentIndex + 1} / ${photos.length}`;
            imgEl.style.opacity = '1';
        }, 100);
    }

    function openLightbox(src) {
        const found = photos.findIndex(p => p.src === src);
        showPhoto(found !== -1 ? found : 0);
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    triggerElements.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const src = el.getAttribute('data-lightbox');
            if (src) openLightbox(src);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => showPhoto(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => showPhoto(currentIndex + 1));

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('is-open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPhoto(currentIndex - 1);
        if (e.key === 'ArrowRight') showPhoto(currentIndex + 1);
    });
}

// --------------------------------------------------------------------------
// 7. Scroll Reveal Observer (Intersection Observer)
// --------------------------------------------------------------------------
function initScrollReveal() {
    const targets = document.querySelectorAll(
        '.section-header, .about-grid, .vm-card, .objective-card, .event-card, .gallery-card, .contact-grid'
    );

    targets.forEach(el => el.classList.add('reveal-on-scroll'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    targets.forEach(el => observer.observe(el));
}

// --------------------------------------------------------------------------
// 8. Interactive Form Submission
// --------------------------------------------------------------------------
function initFormHandler() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Application...';

        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Application Received! Welcome!';
            submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
            submitBtn.style.color = '#FFFFFF';

            setTimeout(() => {
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
            }, 3500);
        }, 1000);
    });
}

// --------------------------------------------------------------------------
// 9. Interactive Figma Designer Toolbar & HUD Toast Feedback
// --------------------------------------------------------------------------
function initFigmaToolbar() {
    const toolbar = document.getElementById('figma-toolbar');
    if (!toolbar) return;

    const toolButtons = toolbar.querySelectorAll('.figma-tool-item:not(.figma-tool-zoom)');
    const zoomBtn = toolbar.querySelector('.figma-tool-zoom');

    toolButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            toolButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const tool = btn.getAttribute('data-tool');
            document.body.setAttribute('data-figma-tool', tool);

            const title = btn.getAttribute('title') || 'Tool Selected';
            showFigmaToast(`✦ Figma Active: ${title}`);
        });
    });

    if (zoomBtn) {
        zoomBtn.addEventListener('click', () => {
            showFigmaToast('✦ Canvas Zoom: 100% (Retina Vector 60 FPS Engine)');
        });
    }

    function showFigmaToast(message) {
        let toast = document.getElementById('figma-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'figma-toast';
            toast.className = 'figma-toast';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<span class="toast-dot"></span> <span>${message}</span>`;
        toast.classList.add('toast-show');

        clearTimeout(toast.timer);
        toast.timer = setTimeout(() => {
            toast.classList.remove('toast-show');
        }, 2200);
    }
}

// --------------------------------------------------------------------------
// 10. Subtle Hero Parallax
// --------------------------------------------------------------------------
function initParallax() {
    const hero = document.getElementById('home');
    const canvas = document.getElementById('neural-canvas');
    if (!hero || !canvas) return;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset || document.documentElement.scrollTop;
                if (scrolled < hero.offsetHeight) {
                    canvas.style.transform = `translate3d(0, ${scrolled * 0.22}px, 0)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

