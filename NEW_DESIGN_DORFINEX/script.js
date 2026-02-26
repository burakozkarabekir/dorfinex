function initParticleCanvas() {
    const canvas = document.getElementById('heroParticles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const colors = ['#1E6FD9', '#4A94ED', '#1456A8'];
    const isMobile = window.innerWidth <= 768;
    let mouse = { x: -9999, y: -9999 };
    let particles = [];
    let animId;

    function resize() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
    }

    function createParticles() {
        const rect = canvas.getBoundingClientRect();
        particles = [];
        const count = isMobile ? 68 : 270;
        const initSpeed = isMobile ? 2.52 : 3.6;
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * rect.width,
                y: Math.random() * rect.height,
                vx: (Math.random() - 0.5) * initSpeed,
                vy: (Math.random() - 0.5) * initSpeed,
                r: Math.random() * 2 + 0.8,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: Math.random() * 0.4 + 0.15
            });
        }
    }

    function draw() {
        const rect = canvas.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        ctx.clearRect(0, 0, w, h);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            // Constant drift — mobile %30 slower
            const drift = isMobile ? 0.168 : 0.24;
            p.vx += (Math.random() - 0.5) * drift;
            p.vy += (Math.random() - 0.5) * drift;

            // Mouse repulsion — stronger scatter
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150 && dist > 0) {
                const force = (150 - dist) / 150 * 1.8;
                p.vx += (dx / dist) * force;
                p.vy += (dy / dist) * force;
            }

            p.x += p.vx;
            p.y += p.vy;
            // Damping — minimal friction, particles stay fast
            p.vx *= 0.99;
            p.vy *= 0.99;

            // Edge wrapping
            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h;
            if (p.y > h) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();

            // Connection lines
            for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j];
                const cx = p.x - q.x;
                const cy = p.y - q.y;
                const cd = Math.sqrt(cx * cx + cy * cy);
                if (cd < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = p.color;
                    ctx.globalAlpha = (1 - cd / 120) * 0.15;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        ctx.globalAlpha = 1;
        animId = requestAnimationFrame(draw);
    }

    const hero = document.getElementById('hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        hero.addEventListener('mouseleave', () => {
            mouse.x = -9999;
            mouse.y = -9999;
        });
    }

    window.addEventListener('resize', () => { resize(); createParticles(); });
    resize();
    createParticles();
    draw();

    return () => { cancelAnimationFrame(animId); };
}

function init() {
    const hasGSAP = typeof gsap !== 'undefined';
    const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';
    const hasScrollToPlugin = typeof ScrollToPlugin !== 'undefined';

    if (hasGSAP && hasScrollTrigger) {
        if (hasScrollToPlugin) {
            gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        } else {
            gsap.registerPlugin(ScrollTrigger);
        }
    }

    // Loader animation with no-JS-lib fallback.
    const hideLoader = () => {
        const loader = document.getElementById('loader');
        if (!loader || loader.classList.contains('hidden')) return;

        if (hasGSAP) {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.5,
                delay: 0.14,
                onComplete: () => loader.classList.add('hidden')
            });
            return;
        }

        loader.classList.add('hidden');
    };

    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader, { once: true });
    }
    setTimeout(hideLoader, 3000);

    // Keep copyright year current without manual edits.
    const year = new Date().getFullYear();
    document.querySelectorAll('.js-current-year').forEach((el) => {
        el.textContent = String(year);
    });

    // Navigation: scrolled state
    const nav = document.getElementById('nav');
    if (nav) {
        const onScroll = () => {
            const currentScroll = window.pageYOffset;
            nav.classList.toggle('scrolled', currentScroll > 40);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // Navigation: active link (multi-page)
    const bodyPage = document.body?.dataset?.page;
    const pathPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const currentPage = bodyPage || pathPage.replace('.html', '');
    const isTurkish = document.documentElement.lang.toLowerCase().startsWith('tr');

    document.querySelectorAll('.nav-link[data-page]').forEach((link) => {
        const isActive = link.getAttribute('data-page') === currentPage;
        link.classList.toggle('active', isActive);
        if (isActive) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
    });

    // Mobile navigation toggle with basic a11y state.
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const translatablePages = new Set(['index.html', 'about.html', 'services.html', 'insights.html', 'faq.html', 'contact.html']);

    if (navLinks) {
        const inBlog = window.location.pathname.includes('/blog/');
        const rootPrefix = inBlog ? '../' : '';
        const currentFile = pathPage || 'index.html';
        const baseFile = currentFile.endsWith('-tr.html') ? currentFile.replace('-tr.html', '.html') : currentFile;
        const trFile = baseFile.replace('.html', '-tr.html');
        const hasTrVersion = translatablePages.has(baseFile);
        const switchTarget = currentFile.endsWith('-tr.html')
            ? `${rootPrefix}${baseFile}`
            : `${rootPrefix}${hasTrVersion ? trFile : 'insights-tr.html'}`;
        const switchLabel = currentFile.endsWith('-tr.html') ? 'EN' : 'TR';
        const switchAriaLabel = currentFile.endsWith('-tr.html') ? 'Switch language to English' : 'Dili Turkceye gecir';
        let langChip = navLinks.querySelector('.lang-chip');

        if (!langChip) {
            langChip = document.createElement('a');
            langChip.className = 'lang-chip';
            navLinks.appendChild(langChip);
        }

        if (langChip instanceof HTMLAnchorElement) {
            langChip.href = `${switchTarget}${window.location.hash || ''}`;
        } else {
            langChip.setAttribute('data-target', switchTarget);
        }
        langChip.textContent = switchLabel;
        langChip.setAttribute('aria-label', switchAriaLabel);
        langChip.setAttribute('title', switchAriaLabel);
    }

    if (navToggle && navLinks) {
        if (!navLinks.id) {
            navLinks.id = 'primary-navigation';
        }

        navToggle.setAttribute('aria-controls', navLinks.id);
        navToggle.setAttribute('aria-expanded', 'false');

        const setNavOpen = (isOpen) => {
            navLinks.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
            document.body.classList.toggle('nav-open', isOpen);
        };

        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.contains('active');
            setNavOpen(!isOpen);
        });

        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', () => setNavOpen(false));
        });
        navLinks.querySelectorAll('.lang-chip').forEach((langToggle) => {
            langToggle.addEventListener('click', () => setNavOpen(false));
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                setNavOpen(false);
            }
        });

        document.addEventListener('click', (event) => {
            const clickTarget = event.target;
            if (!(clickTarget instanceof Element)) return;
            if (nav.contains(clickTarget)) return;
            setNavOpen(false);
        });
    }

    // Smooth scroll for same-page anchors.
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function onAnchorClick(event) {
            const targetId = this.getAttribute('href');
            const target = targetId ? document.querySelector(targetId) : null;
            if (!target) return;

            event.preventDefault();
            if (hasGSAP && hasScrollToPlugin) {
                gsap.to(window, {
                    duration: 0.9,
                    scrollTo: { y: target, offsetY: 90 },
                    ease: 'power2.inOut'
                });
            } else {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // FAQ accordion
    document.querySelectorAll('.faq-item').forEach((item, index) => {
        const trigger = item.querySelector('.faq-trigger');
        const panel = item.querySelector('.faq-panel');
        if (!trigger || !panel) return;

        const panelId = panel.id || `faq-panel-${index + 1}`;
        const triggerId = trigger.id || `faq-trigger-${index + 1}`;

        panel.id = panelId;
        trigger.id = triggerId;
        trigger.setAttribute('aria-controls', panelId);
        trigger.setAttribute('aria-expanded', 'false');
        panel.setAttribute('role', 'region');
        panel.setAttribute('aria-labelledby', triggerId);
        panel.style.maxHeight = '0px';

        trigger.addEventListener('click', () => {
            const isOpen = item.classList.toggle('open');
            trigger.setAttribute('aria-expanded', String(isOpen));
            panel.style.maxHeight = isOpen ? `${panel.scrollHeight}px` : '0px';
        });
    });

    // Contact forms: validate and submit to endpoint (Formspree/other).
    document.querySelectorAll('form.js-contact-form').forEach((form) => {
        const submitButton = form.querySelector('button[type="submit"]');
        const status = form.querySelector('#formStatus') || form.querySelector('.form-status');

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = form.querySelector('[name="name"]');
            const email = form.querySelector('[name="email"]');
            const message = form.querySelector('[name="message"]');
            const endpoint = form.dataset.formEndpoint || form.getAttribute('action') || '';

            const emailOk = Boolean(email?.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
            const ok = Boolean(name?.value.trim() && emailOk && message?.value.trim());

            if (!ok) {
                if (status) {
                    status.textContent = isTurkish
                        ? 'Lutfen adinizi, gecerli bir e-posta adresini ve mesajinizi girin.'
                        : 'Please fill in your name, a valid email, and your message.';
                    status.classList.add('error');
                    status.classList.remove('success');
                }
                return;
            }

            if (!endpoint || endpoint === '#') {
                if (status) {
                    status.textContent = isTurkish
                        ? 'Form gonderim adresi henuz tanimli degil. Form action alanina endpoint ekleyin.'
                        : 'Form endpoint is not configured yet. Add your provider endpoint in the form action.';
                    status.classList.add('error');
                    status.classList.remove('success');
                }
                return;
            }

            if (submitButton) submitButton.disabled = true;
            if (status) {
                status.textContent = isTurkish ? 'Gonderiliyor...' : 'Sending...';
                status.classList.remove('error', 'success');
            }

            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { Accept: 'application/json' }
                });

                if (!response.ok) {
                    throw new Error(`Form submit failed with status ${response.status}`);
                }

                if (status) {
                    status.textContent = isTurkish
                        ? 'Tesekkurler. Mesajiniz gonderildi.'
                        : 'Thanks. Your message has been sent.';
                    status.classList.remove('error');
                    status.classList.add('success');
                }
                form.reset();
            } catch (error) {
                if (status) {
                    status.textContent = isTurkish
                        ? 'Mesaj su anda gonderilemedi. Lutfen birkac dakika sonra tekrar deneyin.'
                        : 'Message could not be sent right now. Please try again in a few minutes.';
                    status.classList.add('error');
                    status.classList.remove('success');
                }
                console.error(error);
            } finally {
                if (submitButton) submitButton.disabled = false;
            }
        });
    });

    if (!hasGSAP) {
        // Remove clip-path so content is visible without GSAP
        document.querySelectorAll('.hero-badge, .title-line, .hero-subtitle, .hero-actions .btn, .scroll-indicator').forEach(el => {
            el.style.clipPath = 'none';
        });
        initParticleCanvas();
        return;
    }

    // Hero / page header animations (only if present)
    const hasHero = document.querySelector('.hero');
    if (hasHero) {
        const heroTimeline = gsap.timeline({ delay: 1.0 });
        const reveal = { clipPath: 'inset(0% 0 0 0)', ease: 'power3.out' };
        heroTimeline
            .to('.hero-badge', { ...reveal, duration: 0.5 })
            .to('.title-line-1', { ...reveal, duration: 0.45 }, '-=0.2')
            .to('.title-line-2', { ...reveal, duration: 0.45 }, '-=0.15')
            .to('.title-line-3', { ...reveal, duration: 0.45 }, '-=0.15')
            .to('.hero-subtitle', { ...reveal, duration: 0.4 }, '-=0.15')
            .to('.hero-actions .btn', { ...reveal, duration: 0.35, stagger: 0.08 }, '-=0.1')
            .to('.scroll-indicator', { ...reveal, duration: 0.4 }, '-=0.15');
        initParticleCanvas();
    }

    const pageHero = document.querySelector('.page-hero');
    if (pageHero) {
        gsap.from(['.page-kicker', '.page-title', '.page-subtitle'], {
            opacity: 0,
            y: 14,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            delay: 0.9
        });
    }

    // Dot-matrix mouse parallax
    const dotMatrix = document.querySelector('.dot-matrix');
    if (dotMatrix) {
        document.addEventListener('mousemove', (event) => {
            const mx = (event.clientX / window.innerWidth - 0.5) * 5;
            const my = (event.clientY / window.innerHeight - 0.5) * 5;
            gsap.to(dotMatrix, { x: mx, y: my, duration: 1, ease: 'power1.out' });
        });
    }

    if (hasScrollTrigger) {
        // Scroll reveal animations (shared)
        gsap.utils.toArray('.reveal').forEach((el) => {
            gsap.from(el, {
                opacity: 0,
                y: 28,
                duration: 0.75,
                ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
            });
        });

        // Card animations (services/insights/value cards)
        gsap.utils.toArray('.card').forEach((card) => {
            gsap.from(card, {
                opacity: 0,
                y: 26,
                duration: 0.7,
                ease: 'power2.out',
                scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
            });
        });

        // Section header animation
        gsap.utils.toArray('.section-header').forEach((header) => {
            gsap.from(header.children, {
                opacity: 0,
                y: 18,
                duration: 0.7,
                stagger: 0.12,
                ease: 'power2.out',
                scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none none' }
            });
        });

        // CTA animation
        const ctaContent = document.querySelector('.cta-content');
        if (ctaContent) {
            gsap.from(ctaContent, {
                opacity: 0,
                y: 22,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: { trigger: ctaContent, start: 'top 85%', toggleActions: 'play none none none' }
            });
        }

        // Parallax effect on hero background
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground && document.querySelector('.hero')) {
            gsap.to(heroBackground, {
                y: '18%',
                ease: 'none',
                scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
            });
        }
    }

    // Lightweight hover for buttons.
    document.querySelectorAll('.btn').forEach((btn) => {
        btn.addEventListener('mouseenter', function onMouseEnter() {
            gsap.to(this, { y: -2, duration: 0.2, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', function onMouseLeave() {
            gsap.to(this, { y: 0, duration: 0.2, ease: 'power2.out' });
        });
    });

    // Accessibility: disable animations for users who prefer reduced motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.globalTimeline.clear();
        gsap.set('*', { clearProps: 'all' });
        ScrollTrigger.getAll().forEach(t => t.kill());
        // Remove clip-path initial states so content is visible
        document.querySelectorAll('.hero-badge, .title-line, .hero-subtitle, .hero-actions .btn, .scroll-indicator').forEach(el => {
            el.style.clipPath = 'none';
        });
    }
}

// ========== Compact services — scroll glow ==========
function initCompactScrollGlow() {
    const strip = document.querySelector('.services-compact');
    if (!strip) return;
    const cards = strip.querySelectorAll('.compact-card');
    if (!cards.length) return;

    function updateGlow() {
        const stripRect = strip.getBoundingClientRect();
        const center = stripRect.left + stripRect.width / 2;

        cards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const dist = Math.abs(center - cardCenter);
            const maxDist = stripRect.width / 2;

            if (dist < maxDist * 0.65) {
                card.classList.add('glow');
            } else {
                card.classList.remove('glow');
            }
        });
    }

    strip.addEventListener('scroll', updateGlow, { passive: true });
    window.addEventListener('resize', updateGlow, { passive: true });
    updateGlow();
}

// Start initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { init(); initCompactScrollGlow(); });
} else {
    init();
    initCompactScrollGlow();
}
