import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

// Hero Parallax on Image
const heroImg = document.getElementById('hero-img');
if (heroImg) {
    gsap.to(heroImg, {
        yPercent: 30, // Parallax distance
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
}

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
