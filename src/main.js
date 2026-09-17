import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initBrochureFlipbook } from './flipbook.js';

gsap.registerPlugin(ScrollTrigger);

// Initialize Dual-Page Brochure Slideshow if present
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('brochure-flipbook')) {
      initBrochureFlipbook('brochure-flipbook');
    }
  });
} else {
  if (document.getElementById('brochure-flipbook')) {
    initBrochureFlipbook('brochure-flipbook');
  }
}

// Initialize smooth scrolling
const lenis = new Lenis({
  duration: 1.5,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Navbar scrolling effect
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle && navLinks) {
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Global Reveal Up animations (Replaces basic reveal)
const revealUpEls = document.querySelectorAll('.reveal-up');
revealUpEls.forEach((el) => {
  if (el.closest('.hero')) {
    // Normal fade-in on load for hero section elements (no scrollTrigger / scroll fading)
    gsap.fromTo(el, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
    );
  } else {
    gsap.fromTo(el, 
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }
});

// Staggered reveal for grids
const revealGrids = document.querySelectorAll('.reveal-grid');
revealGrids.forEach((grid) => {
  const items = grid.children;
  gsap.fromTo(items,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }
  );
});

// Hero Title Line Reveal (simulate split text)
const heroLines = document.querySelectorAll('.hero-title .line');
if (heroLines.length > 0) {
    gsap.fromTo(heroLines, 
        { yPercent: 100 },
        {
            yPercent: 0,
            duration: 1.5,
            stagger: 0.15,
            ease: "power4.out",
            delay: 0.2 // Wait for initial load
        }
    );
}

// Auto-hide Hero content after 2s of inactivity & reduce darkening for clear slideshow
const heroSection = document.querySelector('.hero');
if (heroSection) {
  let heroTimer;

  const resetHeroTimer = () => {
    heroSection.classList.remove('is-hidden');
    clearTimeout(heroTimer);
    heroTimer = setTimeout(() => {
      if (window.scrollY < 400) {
        heroSection.classList.add('is-hidden');
      }
    }, 2000);
  };

  // Start 2s timer on page load
  heroTimer = setTimeout(() => {
    if (window.scrollY < 400) {
      heroSection.classList.add('is-hidden');
    }
  }, 2000);

  // Show hero content on mouse movement, touch, or scroll
  window.addEventListener('mousemove', resetHeroTimer, { passive: true });
  window.addEventListener('touchstart', resetHeroTimer, { passive: true });
  window.addEventListener('scroll', resetHeroTimer, { passive: true });
}
