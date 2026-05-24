document.addEventListener("DOMContentLoaded", function() {
  const themeToggle = document.getElementById("theme-toggle");
  const mobileMenuBtn = document.getElementById("mobile-menu");
  const body = document.body;

  // Initialize theme
  const saved = localStorage.getItem("theme");
  if (saved === "dark") body.classList.add("theme-dark");
  else if (saved === "light") body.classList.remove("theme-dark");
  else {
    // follow OS preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      body.classList.add("theme-dark");
    }
  }

  themeToggle && themeToggle.addEventListener("click", () => {
    body.classList.toggle("theme-dark");
    const isDark = body.classList.contains("theme-dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
  });

  // Mobile menu
  mobileMenuBtn && mobileMenuBtn.addEventListener("click", () => {
    const expanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
    mobileMenuBtn.setAttribute("aria-expanded", String(!expanded));
    // simple toggle: add/remove a class to body to show mobile nav (implement CSS)
    body.classList.toggle("mobile-nav-open");
  });
});
