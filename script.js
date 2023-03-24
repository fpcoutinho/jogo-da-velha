const tabuleiro = document.querySelectorAll(".casa");

//enf game modal
const modalNovoJogo = document.querySelector(".mensagem");
const mensagemVencedor = document.querySelector(".mensagem-texto");

//placares
const placarX = document.querySelector(".placar-jogador-x");
const placarO = document.querySelector(".placar-jogador-o");

//botões
const reiniciar = document.querySelector(".btn.reiniciar");
const jogarNovamente = document.querySelector(".btn.jogar");
const fechar = document.querySelector(".btn.fechar");

let playerAtivo = "x";

tabuleiro.forEach((casa) => {
  casa.addEventListener("click", () => {
    if (casa.classList.contains("marcado")) return;
    casa.classList.add("marcado", playerAtivo);
    mudarJogador();
    checkVencedor();
    checkEmpate();
  });
  casa.addEventListener(
    "mouseenter",
    function (event) {
      if (!casa.classList.contains("marcado")) {
        if (playerAtivo === "x") {
          event.target.style.backgroundImage = "url(recursos/x.png)";
        } else {
          event.target.style.backgroundImage = "url(recursos/o.png)";
        }
      }
    },
    false
  );
  casa.addEventListener(
    "mouseleave",
    function (event) {
      event.target.style.backgroundImage = "";
    },
    false
  );
});

reiniciar.addEventListener("click", () => {
  placarO.innerHTML = 0;
  placarX.innerHTML = 0;
  limparTabuleiro();
});

fechar.addEventListener("click", () => {
  sair();
});

jogarNovamente.addEventListener("click", () => {
  jogarDeNovo();
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
      tabuleiro[comb[0]].classList.contains("x") &&
      tabuleiro[comb[1]].classList.contains("x") &&
      tabuleiro[comb[2]].classList.contains("x")
    ) {
      mensagemVencedor.innerHTML = "Jogador X venceu!";
      placarX.innerHTML = parseInt(placarX.innerHTML) + 1;
      abrirModal();
      limparTabuleiro();
    } else if (
      tabuleiro[comb[0]].classList.contains("o") &&
      tabuleiro[comb[1]].classList.contains("o") &&
      tabuleiro[comb[2]].classList.contains("o")
    ) {
      mensagemVencedor.innerHTML = "Jogador O venceu!";
      placarO.innerHTML = parseInt(placarO.innerHTML) + 1;
      abrirModal();
      limparTabuleiro();
    }
  });
}

function mudarJogador() {
  playerAtivo === "x" ? (playerAtivo = "o") : (playerAtivo = "x");
}

//checar se todas as casa do tabuleiro estao marcadas e retornar true
function checkEmpate() {
  let marcadas = 0;
  tabuleiro.forEach((casa) => {
    if (casa.classList.contains("marcado")) {
      marcadas++;
    }
  });
  if (marcadas === 9) {
    mensagemVencedor.innerHTML = "Deu Velha!";
    abrirModal();
    limparTabuleiro();
  }
}

function abrirModal() {
  modalNovoJogo.classList.remove("hidden");
  modalNovoJogo.classList.add("active");
}

function jogarDeNovo() {
  modalNovoJogo.classList.remove("active");
  modalNovoJogo.classList.add("hidden");
}

function sair() {
  placarO.innerHTML = 0;
  placarX.innerHTML = 0;
  jogarDeNovo();
}

function limparTabuleiro() {
  tabuleiro.forEach((casa) => {
    casa.classList.remove("marcado", "x", "o");
  });
}
