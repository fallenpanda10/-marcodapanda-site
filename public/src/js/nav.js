// src/js/nav.js
(function () {
  'use strict';

  var toggle = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  var siteNav = document.getElementById('site-nav');
  var focusableSelectors = 'a[href], button:not([disabled]), textarea, input, select';
  var previouslyFocused = null;

  if (!toggle || !mobileNav) return;

  var firstLink = mobileNav.querySelector('a');

  function openMenu() {
    previouslyFocused = document.activeElement;
    toggle.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('data-open', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
    firstLink && firstLink.focus();
  }

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('data-open', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
    else toggle.focus();
  }

  toggle.addEventListener('click', function () {
    var expanded = toggle.getAttribute('aria-expanded') === 'true';
    if (expanded) closeMenu(); else openMenu();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav.getAttribute('data-open') === 'true') {
      closeMenu();
    }

    if (mobileNav.getAttribute('data-open') === 'true' && e.key === 'Tab') {
      var focusables = mobileNav.querySelectorAll(focusableSelectors);
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  document.addEventListener('click', function (e) {
    if (mobileNav.getAttribute('data-open') !== 'true') return;
    var target = e.target;
    if (!mobileNav.contains(target) && !toggle.contains(target)) closeMenu();
  });

  // Sync aria-current from desktop nav to mobile nav
  (function syncAriaCurrent() {
    if (!siteNav) return;
    var desktopLinks = siteNav.querySelectorAll('a[aria-current="page"]');
    if (!desktopLinks.length) return;
    var mobileLinks = mobileNav.querySelectorAll('a');
    desktopLinks.forEach(function (dlink) {
      var href = dlink.getAttribute('href');
      mobileLinks.forEach(function (mlink) {
        if (mlink.getAttribute('href') === href) mlink.setAttribute('aria-current', 'page');
      });
    });
  })();

  // Set footer year if present
  (function setYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  })();
})();
