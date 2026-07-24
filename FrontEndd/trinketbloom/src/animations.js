import { animate, createScope, createTimeline, stagger, onScroll, splitText } from 'animejs';
import Lenis from 'lenis';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveals `targets` the first time `container` scrolls into view. Never repeats.
function revealOnScroll(container, targets, params) {
  if (!container || !targets || (typeof targets.length === 'number' && targets.length === 0)) return;
  animate(targets, {
    ...params,
    autoplay: onScroll({ target: container, repeat: false }),
  });
}

// ---------------------------------------------------------------------------
// Smooth (inertial) scrolling — powers the buttery feel behind every reveal.
// ---------------------------------------------------------------------------
export function initSmoothScroll() {
  if (prefersReducedMotion() || typeof window === 'undefined') return { destroy() {} };
  return new Lenis({
    duration: 1.1,
    easing: (t) => 1 - Math.pow(1 - t, 4),
    smoothWheel: true,
    autoRaf: true,
  });
}

// ---------------------------------------------------------------------------
// Animated preloader curtain — runs once on first mount.
// ---------------------------------------------------------------------------
export function runPreloaderIntro(root, onDone) {
  if (!root) {
    onDone();
    return { revert() {} };
  }

  if (prefersReducedMotion()) {
    onDone();
    return { revert() {} };
  }

  const word = root.querySelector('.preloader-word');
  const bar = root.querySelector('.preloader-bar-fill');
  let splitter = null;
  let targets = word;

  if (word) {
    splitter = splitText(word, { chars: true });
    targets = splitter.chars;
  }

  const timeline = createTimeline({ defaults: { ease: 'outExpo' } })
    .add(targets, { opacity: [0, 1], translateY: [16, 0], duration: 480, delay: stagger(22) })
    .add(bar, { width: ['0%', '100%'], duration: 850, ease: 'inOutQuad' }, '-=250')
    .add(
      root,
      {
        opacity: [1, 0],
        duration: 500,
        ease: 'inOutQuad',
        onComplete: () => onDone(),
      },
      '+=200'
    );

  return {
    revert() {
      timeline.pause();
      if (splitter) splitter.revert();
    },
  };
}

// ---------------------------------------------------------------------------
// Everything else: entrance timeline, parallax, scroll reveals, ambient loops.
// ---------------------------------------------------------------------------
export function initSiteAnimations(root) {
  if (!root) return { revert() {} };

  if (prefersReducedMotion()) {
    root.querySelectorAll('.anim-hidden').forEach((el) => {
      el.style.opacity = 1;
    });
    return { revert() {} };
  }

  return createScope({ root }).add(() => {
    const q = (sel) => root.querySelector(sel);
    const qa = (sel) => root.querySelectorAll(sel);

    // ---------- Hero + nav entrance ----------
    const heroTitle = q('.hero-title');
    let splitter = null;
    let titleTargets = heroTitle;

    if (heroTitle) {
      heroTitle.style.opacity = 1;
      splitter = splitText(heroTitle, { chars: true });
      titleTargets = splitter.chars;
      titleTargets.forEach((el) => {
        el.style.opacity = 0;
      });
    }

    createTimeline({ defaults: { ease: 'outExpo' } })
      .add('.site-nav', { translateY: [-70, 0], opacity: [0, 1], duration: 700 })
      .add(
        '.nav-link-item',
        { translateY: [-16, 0], opacity: [0, 1], duration: 500, delay: stagger(70) },
        '-=350'
      )
      .add(
        titleTargets,
        { opacity: [0, 1], translateY: [26, 0], duration: 600, delay: stagger(18) },
        '-=250'
      )
      .add('.hero-subtitle', { opacity: [0, 1], translateY: [18, 0], duration: 600 }, '-=250')
      .add(
        '.hero-cta',
        { opacity: [0, 1], scale: [0.55, 1], duration: 800, ease: 'outElastic(1, .6)' },
        '-=250'
      );

    // ---------- Hero background parallax ----------
    const heroSection = q('.hero-section');
    const heroBg = q('.hero-bg-image');
    if (heroSection && heroBg) {
      animate(heroBg, {
        translateY: [0, 110],
        ease: 'linear',
        autoplay: onScroll({ target: heroSection, sync: true }),
      });
    }

    // ---------- Hero ambient gradient blobs (continuous, not scroll-tied) ----------
    const blobs = qa('.hero-blob');
    blobs.forEach((blob, i) => {
      animate(blob, {
        translateX: [0, i % 2 === 0 ? 40 : -40],
        translateY: [0, i % 2 === 0 ? -30 : 30],
        scale: [1, 1.15],
        duration: 7000 + i * 1200,
        direction: 'alternate',
        loop: true,
        ease: 'inOutSine',
      });
    });

    // ---------- Scroll progress bar ----------
    const progressFill = q('.scroll-progress-fill');
    if (progressFill) {
      animate(progressFill, {
        scaleX: [0, 1],
        ease: 'linear',
        autoplay: onScroll({ target: root, sync: true }),
      });
    }

    // ---------- Marquee ribbon (continuous) ----------
    const marquee = q('.marquee-track');
    if (marquee) {
      animate(marquee, {
        translateX: ['0%', '-50%'],
        duration: 16000,
        loop: true,
        ease: 'linear',
      });
    }

    // ---------- Products section ----------
    const productsSection = q('#products');
    if (productsSection) {
      const heading = productsSection.querySelector('.section-heading');
      const underline = productsSection.querySelector('.heading-underline');
      revealOnScroll(productsSection, heading, { opacity: [0, 1], translateY: [30, 0], duration: 700 });
      revealOnScroll(productsSection, underline, { width: ['0%', '100%'], duration: 600, delay: 150 });

      revealOnScroll(productsSection, productsSection.querySelector('.products-controls'), {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        delay: 100,
      });

      const catButtons = productsSection.querySelectorAll('.category-btn');
      revealOnScroll(productsSection, catButtons, {
        opacity: [0, 1],
        scale: [0.7, 1],
        duration: 500,
        delay: stagger(60, { start: 150 }),
        ease: 'outBack',
      });

      const cards = productsSection.querySelectorAll('.product-card');
      revealOnScroll(productsSection.querySelector('.products-grid') || productsSection, cards, {
        opacity: [0, 1],
        translateY: [50, 0],
        scale: [0.94, 1],
        duration: 650,
        delay: stagger(60, { from: 'center' }),
        ease: 'outQuad',
      });
    }

    // ---------- About section ----------
    const aboutSection = q('#about');
    if (aboutSection) {
      const aboutText = aboutSection.querySelector('.about-text');
      const aboutImage = aboutSection.querySelector('.about-image');
      if (aboutText) {
        revealOnScroll(aboutSection, aboutText, { opacity: [0, 1], translateX: [-60, 0], duration: 750 });
      }
      if (aboutImage) {
        revealOnScroll(aboutSection, aboutImage, {
          opacity: [0, 1],
          translateX: [60, 0],
          duration: 750,
          delay: 120,
        });
      }

      const statItems = aboutSection.querySelectorAll('.stat-item');
      revealOnScroll(aboutSection, statItems, {
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 600,
        delay: stagger(120, { start: 200 }),
      });

      const statNumbers = aboutSection.querySelectorAll('.stat-number');
      statNumbers.forEach((el) => {
        const target = parseFloat(el.dataset.target || '0');
        const suffix = el.dataset.suffix || '';
        const counter = { val: 0 };
        animate(counter, {
          val: target,
          duration: 1400,
          ease: 'outExpo',
          autoplay: onScroll({ target: aboutSection, repeat: false }),
          onUpdate: () => {
            el.textContent = Math.round(counter.val) + suffix;
          },
        });
      });
    }

    // ---------- Contact section ----------
    const contactSection = q('#contact');
    if (contactSection) {
      const heading = contactSection.querySelector('.section-heading');
      const underline = contactSection.querySelector('.heading-underline');
      revealOnScroll(contactSection, heading, { opacity: [0, 1], translateY: [30, 0], duration: 700 });
      revealOnScroll(contactSection, underline, { width: ['0%', '100%'], duration: 600, delay: 150 });

      revealOnScroll(contactSection, contactSection.querySelector('.contact-card'), {
        opacity: [0, 1],
        scale: [0.96, 1],
        duration: 700,
        delay: 100,
      });

      const fields = contactSection.querySelectorAll('.contact-field');
      revealOnScroll(contactSection, fields, {
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 550,
        delay: stagger(90, { start: 250 }),
      });
    }

    // ---------- Footer ----------
    const footer = q('.site-footer');
    if (footer) {
      revealOnScroll(footer, footer, { opacity: [0, 1], translateY: [24, 0], duration: 600 });
    }

    // ---------- Navbar shrink-on-scroll ----------
    const nav = q('.site-nav');
    const handleNavScroll = () => {
      if (!nav) return;
      if (window.scrollY > 80) nav.classList.add('nav-scrolled');
      else nav.classList.remove('nav-scrolled');
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    return () => {
      if (splitter) splitter.revert();
      window.removeEventListener('scroll', handleNavScroll);
    };
  });
}

// ---------------------------------------------------------------------------
// Interactive micro-animations (hover / mousemove-driven)
// ---------------------------------------------------------------------------

// 3D tilt that follows the cursor across a card.
export function tiltCard(e) {
  if (prefersReducedMotion()) return;
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width;
  const py = (e.clientY - rect.top) / rect.height;
  const rotateY = (px - 0.5) * 14;
  const rotateX = (0.5 - py) * 14;
  animate(card, { rotateX, rotateY, translateY: -10, scale: 1.03, duration: 200, ease: 'outQuad' });
}

export function resetTiltCard(e) {
  if (prefersReducedMotion()) return;
  animate(e.currentTarget, {
    rotateX: 0,
    rotateY: 0,
    translateY: 0,
    scale: 1,
    duration: 450,
    ease: 'outElastic(1, .6)',
  });
}

// Magnetic buttons — nudge toward the cursor within their own bounds.
export function magnetMove(e) {
  if (prefersReducedMotion()) return;
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const relX = e.clientX - rect.left - rect.width / 2;
  const relY = e.clientY - rect.top - rect.height / 2;
  animate(el, {
    translateX: relX * 0.3,
    translateY: relY * 0.3,
    scale: 1.06,
    duration: 400,
    ease: 'outQuad',
  });
}

export function magnetLeave(e) {
  if (prefersReducedMotion()) return;
  animate(e.currentTarget, {
    translateX: 0,
    translateY: 0,
    scale: 1,
    duration: 500,
    ease: 'outElastic(1, .5)',
  });
}
