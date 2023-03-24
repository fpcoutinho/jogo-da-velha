const placarX = document.querySelector(".placar-jogador-x");
const placarO = document.querySelector(".placar-jogador-o");
const bannerX = document.querySelector(".jogador-x");
const bannerO = document.querySelector(".jogador-o");
const tabuleiro = document.querySelectorAll(".casa");
const reiniciar = document.querySelector(".btn.reiniciar");
const fechar = document.querySelector(".btn.fechar");
const modalNovoJogo = document.querySelector(".mensagem");

tabuleiro.forEach((casa) => {
  casa.addEventListener("click", () => {
    casa.classList.add("marcado", "x");
    checkVencedor();
  });
});

fechar.addEventListener("click", () => {
  toggleMensagem();
});

function checkVencedor() {
  let combs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  combs.forEach((comb) => {
    if (
      (tabuleiro[comb[0]].classList.contains("x") &&
        tabuleiro[comb[1]].classList.contains("x") &&
        tabuleiro[comb[2]].classList.contains("x")) ||
      (tabuleiro[comb[0]].classList.contains("o") &&
        tabuleiro[comb[1]].classList.contains("o") &&
        tabuleiro[comb[2]].classList.contains("o"))
    ) {
      toggleMensagem();
      limparTabuleiro();
    }
  });
}

function toggleMensagem() {
  if (modalNovoJogo.classList.contains("active")) {
    modalNovoJogo.classList.remove("active");
    modalNovoJogo.classList.add("hidden");
  } else {
    modalNovoJogo.classList.remove("hidden");
    modalNovoJogo.classList.add("active");
  }
}

function limparTabuleiro() {
  tabuleiro.forEach((casa) => {
    casa.classList.remove("marcado", "x", "o");
  });
}
