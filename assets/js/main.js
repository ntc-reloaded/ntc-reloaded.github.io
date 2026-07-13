/* NTC-R 2026 — main.js */

(function () {
  'use strict';

  /* ── Mobile nav toggle ── */
  const toggle = document.querySelector('.nav__toggle');
  const menu   = document.querySelector('.nav__menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('is-open', !open);
    });

    // Close on link click (mobile)
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!e.target.closest('.site-header')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
      }
    });
  }

  /* ── Reveal on scroll ── */
  const reveals = document.querySelectorAll('.reveal');

  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -4% 0px' }
    );
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  /* ── Nav active link highlight on scroll ── */
  const sections = document.querySelectorAll('main [id]');
  const navLinks = document.querySelectorAll('.nav__menu a[href^="#"]');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinks.forEach(a => a.classList.remove('is-active'));
            const active = document.querySelector(
              `.nav__menu a[href="#${entry.target.id}"]`
            );
            if (active) active.classList.add('is-active');
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach(s => sectionObserver.observe(s));
  }
})();
