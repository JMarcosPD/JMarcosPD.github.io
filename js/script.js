const botaoMenu = document.querySelector(".menu-botao");
const linksMenu = document.querySelector(".menu-links");
const botaoTopo = document.querySelector(".voltar-topo");
const formulario = document.querySelector(".formulario");

if (botaoMenu && linksMenu) {
  botaoMenu.addEventListener("click", function () {
    const menuAberto = linksMenu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", menuAberto);
  });
}

if (botaoTopo) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 250) {
      botaoTopo.classList.add("aparecer");
    } else {
      botaoTopo.classList.remove("aparecer");
    }
  });

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
    const email = document.querySelector("#email").value.trim();
    const mensagem = document.querySelector("#mensagem").value.trim();
    const aviso = document.querySelector(".form-aviso");

    aviso.classList.remove("erro", "sucesso");

    if (nome === "" || email === "" || mensagem === "") {
      aviso.textContent = "Preencha todos os campos antes de validar.";
      aviso.classList.add("erro");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      aviso.textContent = "Digite um email válido.";
      aviso.classList.add("erro");
      return;
    }

    aviso.textContent =
      "Mensagem validada com sucesso. Formulário apenas demonstrativo.";
    aviso.classList.add("sucesso");
    formulario.reset();
  });
}
