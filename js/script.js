const backToTopButton = document.querySelector(".back-to-top");
const contactForm = document.querySelector(".contact-form");
const revealItems = document.querySelectorAll(".reveal");
const navbarCollapse = document.querySelector(".navbar-collapse");

if (navbarCollapse && window.bootstrap) {
  const collapse = new bootstrap.Collapse(navbarCollapse, {
    toggle: false,
  });

  navbarCollapse.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      if (navbarCollapse.classList.contains("show")) {
        collapse.hide();
      }
    });
  });
}

if (backToTopButton) {
  const toggleBackToTop = function () {
    backToTopButton.classList.toggle("is-visible", window.scrollY > 320);
  };

  window.addEventListener("scroll", toggleBackToTop);
  toggleBackToTop();

  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput = contactForm.querySelector("#nome");
    const messageInput = contactForm.querySelector("#mensagem");
    const feedback = contactForm.querySelector(".form-feedback");
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    feedback.classList.remove("error", "success");

    if (!name || !message) {
      feedback.textContent = "Preencha seu nome e a mensagem antes de enviar.";
      feedback.classList.add("error");
      return;
    }

    const text = `Olá, meu nome é ${name}. ${message}`;
    const url = `https://wa.me/5543996357911?text=${encodeURIComponent(text)}`;

    feedback.textContent = "Abrindo WhatsApp com sua mensagem...";
    feedback.classList.add("success");
    window.open(url, "_blank", "noopener,noreferrer");
  });
}

if (revealItems.length > 0) {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
      },
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }
}
