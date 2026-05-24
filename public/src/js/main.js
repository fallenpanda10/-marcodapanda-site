// src/js/main.js
// Site interactions: nav toggle, aria-current sync, form validation, small accessibility helpers

(function () {
  'use strict';

  // Utility: safe query
  function $q(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $qa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  // Run on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    initNavToggle();
    syncAriaCurrent();
    initFormValidation();
    injectCurrentYear();
    enableSkipLinkFocus();
  });

  // Mobile nav toggle: updates aria-expanded and data-open
  function initNavToggle() {
    var navToggle = document.getElementById('nav-toggle');
    var mobileNav = document.getElementById('mobile-nav');
    if (!navToggle || !mobileNav) return;

    navToggle.addEventListener('click', function () {
      var open = mobileNav.getAttribute('data-open') === 'true';
      mobileNav.setAttribute('data-open', (!open).toString());
      mobileNav.setAttribute('aria-hidden', open ? 'true' : 'false');
      navToggle.setAttribute('aria-expanded', (!open).toString());
      // Move focus into mobile nav when opening for keyboard users
      if (!open) {
        var firstLink = mobileNav.querySelector('a');
        if (firstLink) firstLink.focus();
      } else {
        navToggle.focus();
      }
    });

    // Close mobile nav on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.getAttribute('data-open') === 'true') {
        mobileNav.setAttribute('data-open', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // Keep aria-current in sync between desktop and mobile navs
  function syncAriaCurrent() {
    var desktopCurrent = document.querySelector('.site-nav a[aria-current="page"]');
    if (!desktopCurrent) return;
    var href = desktopCurrent.getAttribute('href');
    // Clear any existing markers in mobile nav
    $qa('#mobile-nav a[aria-current="page"]').forEach(function (el) { el.removeAttribute('aria-current'); });
    var mobileMatch = document.querySelector('#mobile-nav a[href="' + href + '"]');
    if (mobileMatch) mobileMatch.setAttribute('aria-current', 'page');
  }

  // Simple client-side validation for the tech-help form
  function initFormValidation() {
    var techForm = document.getElementById('tech-help-form');
    if (!techForm) return;

    techForm.addEventListener('submit', function (e) {
      var email = document.getElementById('email');
      var message = document.getElementById('message');
      var valid = true;

      // Clear previous errors
      clearFieldError('email');
      clearFieldError('message');

      // Email basic check
      if (!email || !/^\S+@\S+\.\S+$/.test(email.value.trim())) {
        showFieldError('email', 'Please enter a valid email address');
        valid = false;
      }

      // Message required (short)
      if (!message || message.value.trim().length < 10) {
        showFieldError('message', 'Please provide a short summary (at least 10 characters)');
        valid = false;
      }

      if (!valid) {
        e.preventDefault();
        // Move focus to the first visible error for keyboard users
        var firstError = document.querySelector('.error-text:not([hidden])');
        if (firstError) firstError.focus();
      }
    });
  }

  // Show and clear field error helpers
  function showFieldError(inputId, message) {
    var input = document.getElementById(inputId);
    var errorEl = document.getElementById(inputId + '-error');
    if (!input || !errorEl) return;
    input.classList.add('input-error');
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', inputId + '-error');
    errorEl.hidden = false;
    errorEl.textContent = message;
    // Make the error focusable so screen readers announce it when focused programmatically
    errorEl.setAttribute('tabindex', '-1');
  }

  function clearFieldError(inputId) {
    var input = document.getElementById(inputId);
    var errorEl = document.getElementById(inputId + '-error');
    if (!input || !errorEl) return;
    input.classList.remove('input-error');
    input.removeAttribute('aria-invalid');
    // restore help association if present
    var helpId = inputId + '-help';
    if (document.getElementById(helpId)) {
      input.setAttribute('aria-describedby', helpId);
    } else {
      input.removeAttribute('aria-describedby');
    }
    errorEl.hidden = true;
    errorEl.textContent = '';
    errorEl.removeAttribute('tabindex');
  }

  // Inject current year into footer
  function injectCurrentYear() {
    var el = document.getElementById('year');
    if (!el) return;
    var y = new Date().getFullYear();
    el.textContent = y;
  }

  // Improve skip-link focus behavior on some browsers
  function enableSkipLinkFocus() {
    var skip = document.querySelector('.skip-link');
    if (!skip) return;
    skip.addEventListener('click', function (e) {
      // Ensure the target exists and is focusable
      var targetId = this.getAttribute('href') && this.getAttribute('href').slice(1);
      var target = targetId ? document.getElementById(targetId) : null;
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus();
        // Remove tabindex after focus to keep DOM clean
        target.addEventListener('blur', function () { target.removeAttribute('tabindex'); }, { once: true });
      }
    });
  }

  // Expose helpers for debugging (optional)
  window.__siteHelpers = {
    showFieldError: showFieldError,
    clearFieldError: clearFieldError,
    syncAriaCurrent: syncAriaCurrent
  };

})();
