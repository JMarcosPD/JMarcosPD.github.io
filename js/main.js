(function () {
  "use strict";

  const navbar = document.querySelector(".portfolio-navbar");
  const navLinks = Array.from(document.querySelectorAll(".nav-link[href^='#']"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function updateNavbarShadow() {
    if (!navbar) {
      return;
    }

    navbar.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  function updateActiveLink() {
    let current = null;

    for (let index = 0; index < sections.length; index += 1) {
      if (window.scrollY + 120 >= sections[index].offsetTop) {
        current = sections[index];
      }
    }

    if (!current) {
      return;
    }

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current.id}`);
    });
  }

  function closeMobileMenu() {
    const menu = document.querySelector(".navbar-collapse.show");
    if (!menu || typeof bootstrap === "undefined") {
      return;
    }

    bootstrap.Collapse.getOrCreateInstance(menu).hide();
  }

  function prepareProfileFallback() {
    const photo = document.querySelector(".profile-photo");
    if (!photo) {
      return;
    }

    photo.addEventListener("error", () => {
      photo.classList.add("is-hidden");
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  prepareProfileFallback();
  updateNavbarShadow();
  updateActiveLink();

  window.addEventListener("scroll", () => {
    updateNavbarShadow();
    updateActiveLink();
  });
})();
