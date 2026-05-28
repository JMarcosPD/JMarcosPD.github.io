const botaoMenu = document.querySelector(".menu-botao");
const linksMenu = document.querySelector(".menu-links");
const botaoTopo = document.querySelector(".voltar-topo");
const formulario = document.querySelector(".formulario");
const itensAnimados = document.querySelectorAll(".reveal");

if (botaoMenu && linksMenu) {
  botaoMenu.addEventListener("click", function () {
    const menuAberto = linksMenu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", String(menuAberto));
    document.body.classList.toggle("menu-aberto", menuAberto);
  });

  linksMenu.addEventListener("click", function (evento) {
    if (evento.target.closest("a")) {
      linksMenu.classList.remove("aberto");
      botaoMenu.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-aberto");
    }
  });
}

if (botaoTopo) {
  const alternarBotaoTopo = function () {
    botaoTopo.classList.toggle("aparecer", window.scrollY > 250);
  };

  window.addEventListener("scroll", alternarBotaoTopo);
  alternarBotaoTopo();

  botaoTopo.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

if (formulario) {
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const mensagem = document.querySelector("#mensagem").value.trim();
    const aviso = document.querySelector(".form-aviso");

    aviso.classList.remove("erro", "sucesso");

    if (nome === "" || mensagem === "") {
      aviso.textContent = "Preencha seu nome e a mensagem antes de enviar.";
      aviso.classList.add("erro");
      return;
    }

    const texto = `Olá, meu nome é ${nome}. ${mensagem}`;
    const url = `https://wa.me/5543996357911?text=${encodeURIComponent(texto)}`;

    aviso.textContent = "Abrindo WhatsApp com sua mensagem...";
    aviso.classList.add("sucesso");
    window.open(url, "_blank", "noopener,noreferrer");
  });
}

if (itensAnimados.length > 0) {
  if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
            observador.unobserve(entrada.target);
          }
        });
      },
      {
        threshold: 0.14,
      },
    );

    itensAnimados.forEach(function (item) {
      observador.observe(item);
    });
  } else {
    itensAnimados.forEach(function (item) {
      item.classList.add("visivel");
    });
  }
}
