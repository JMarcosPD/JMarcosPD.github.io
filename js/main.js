(function () {
  "use strict";

  /* --------------------------------------------------
     AOS
  -------------------------------------------------- */
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false
  });

  /* --------------------------------------------------
     Typed.js
  -------------------------------------------------- */
  const typedEl = document.querySelector(".typed");
  if (typedEl) {
    new Typed(".typed", {
      strings: typedEl.getAttribute("data-typed-items").split(","),
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /* --------------------------------------------------
     PureCounter
  -------------------------------------------------- */
  new PureCounter();

  /* --------------------------------------------------
     Skill bars — animate on scroll into view
  -------------------------------------------------- */
  const skillsSection = document.querySelector(".skills");
  if (skillsSection) {
    const observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        document.querySelectorAll(".skills .progress-bar").forEach(function (bar) {
          bar.style.width = bar.getAttribute("aria-valuenow") + "%";
        });
        observer.unobserve(skillsSection);
      }
    }, { threshold: 0.25 });
    observer.observe(skillsSection);
  }

  /* --------------------------------------------------
     Portfolio filter
  -------------------------------------------------- */
  const filters = document.querySelectorAll("#portfolio-flters li");
  const items   = document.querySelectorAll(".portfolio-item");

  filters.forEach(function (filter) {
    filter.addEventListener("click", function () {
      filters.forEach(function (el) { el.classList.remove("filter-active"); });
      this.classList.add("filter-active");

      const val = this.getAttribute("data-filter");

      items.forEach(function (item) {
        if (val === "*" || item.classList.contains(val.slice(1))) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });

  /* --------------------------------------------------
     Scrollspy
  -------------------------------------------------- */
  function setActive(link) {
    document.querySelectorAll(".nav-menu .nav-link").forEach(function (l) { l.classList.remove("active"); });
    if (link) link.classList.add("active");
  }

  function scrollspy() {
    const y       = window.scrollY;
    const heroLink = document.querySelector(".nav-menu a[href='#hero']");

    if (y < 80) {
      setActive(heroLink);
      return;
    }

    // When near the bottom of the page, always activate the last section
    const atBottom = y + window.innerHeight >= document.documentElement.scrollHeight - 60;
    if (atBottom) {
      const sections = document.querySelectorAll("#main section[id]");
      const lastSection = sections[sections.length - 1];
      if (lastSection) {
        const lastLink = document.querySelector(".nav-menu a[href='#" + lastSection.id + "']");
        setActive(lastLink);
        return;
      }
    }

    document.querySelectorAll("#main section[id]").forEach(function (section) {
      const top    = section.offsetTop - 100;
      const bottom = top + section.offsetHeight;
      const link   = document.querySelector(".nav-menu a[href='#" + section.id + "']");
      if (!link) return;
      if (y >= top && y < bottom) setActive(link);
    });
  }

  window.addEventListener("scroll", scrollspy, { passive: true });
  scrollspy();

  /* --------------------------------------------------
     Smooth scroll (links with .scrollto)
  -------------------------------------------------- */
  document.querySelectorAll(".scrollto").forEach(function (link) {
    link.addEventListener("click", function (e) {
      const hash = this.getAttribute("href");
      if (!hash || !hash.startsWith("#")) return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();

      // Activate nav link immediately on click
      const navLink = document.querySelector(".nav-menu a[href='" + hash + "']");
      if (navLink) setActive(navLink);

      const top = hash === "#hero" ? 0 : target.offsetTop - 20;
      window.scrollTo({ top: top, behavior: "smooth" });

      closeMobileNav();
    });
  });

  /* --------------------------------------------------
     Mobile sidebar toggle
  -------------------------------------------------- */
  function closeMobileNav() {
    const header = document.querySelector("#header");
    const overlay = document.querySelector("#sidebarOverlay");
    const toggle = document.querySelector(".mobile-nav-toggle");
    if (header) header.classList.remove("navbar-mobile");
    if (overlay) overlay.classList.remove("active");
    if (toggle) {
      toggle.classList.remove("bi-x");
      toggle.classList.add("bi-list");
    }
  }

  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  if (mobileToggle) {
    mobileToggle.addEventListener("click", function () {
      const header  = document.querySelector("#header");
      const overlay = document.querySelector("#sidebarOverlay");
      const isOpen  = header.classList.toggle("navbar-mobile");
      overlay.classList.toggle("active", isOpen);
      this.classList.toggle("bi-list", !isOpen);
      this.classList.toggle("bi-x", isOpen);
    });
  }

  const overlay = document.querySelector("#sidebarOverlay");
  if (overlay) {
    overlay.addEventListener("click", closeMobileNav);
  }

  /* --------------------------------------------------
     Back to top
  -------------------------------------------------- */
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      backToTop.classList.toggle("active", window.scrollY > 100);
    }, { passive: true });

    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* --------------------------------------------------
     Profile image fallback
  -------------------------------------------------- */
  document.querySelectorAll(".profile img, .about-photo").forEach(function (img) {
    img.addEventListener("error", function () {
      this.style.display = "none";
    });
  });

})();
