// 1) DADOS (carregados do JSON)
let perguntas = [];

// 2) ESTADO
let atual = 0;
let pontos = 0;
let nome = "";

// 3) ELEMENTOS DA PÁGINA
const $ = (id) => document.getElementById(id);
const telaInicio = $("inicio"), telaJogo = $("jogo"), telaFim = $("fim");

// 4) FUNÇÕES
async function carregarPerguntas() {
  try {
    const resp = await fetch("perguntas.json");
    if (!resp.ok) throw new Error("Erro ao carregar perguntas");
    perguntas = await resp.json();
  } catch (erro) {
    console.warn("fetch falhou, usando cópia embutida no HTML:", erro);
    try {
      const backup = document.getElementById("perguntas-backup").textContent;
      perguntas = JSON.parse(backup);
    } catch (erro2) {
      console.error(erro2);
      $("erroCarregar").textContent = "Não foi possível carregar as perguntas.";
      $("erroCarregar").classList.remove("hidden");
    }
  }
}

function mostrar(tela) {
  [telaInicio, telaJogo, telaFim].forEach(t => t.classList.add("hidden"));
  tela.classList.remove("hidden");
}

function comecar() {
  const valor = $("nomeJogador").value.trim();
  if (!valor) {
    $("erroNome").classList.remove("hidden");
    $("nomeJogador").focus();
    return;
  }
  if (perguntas.length === 0) {
    $("erroCarregar").textContent = "As perguntas ainda não foram carregadas. Tente novamente.";
    $("erroCarregar").classList.remove("hidden");
    return;
  }
  nome = valor;
  $("erroNome").classList.add("hidden");
  $("erroCarregar").classList.add("hidden");
  atual = 0;
  pontos = 0;
  mostrar(telaJogo);
  mostrarPergunta();
}

function mostrarPergunta() {
  const p = perguntas[atual];
  $("contador").textContent = `Pergunta ${atual + 1} de ${perguntas.length}`;
  $("progresso").style.width = `${(atual / perguntas.length) * 100}%`;
  $("pergunta").textContent = p.texto;
  $("feedback").classList.add("hidden");
  $("btnProxima").classList.add("hidden");
  $("btnProxima").textContent = atual === perguntas.length - 1 ? "Ver resultado" : "Próxima";

  const caixa = $("opcoes");
  caixa.innerHTML = "";
  p.opcoes.forEach((texto, i) => {
    const b = document.createElement("button");
    b.className = "opcao";
    b.textContent = texto;
    b.dataset.texto = texto;
    b.addEventListener("click", () => responder(i));
    caixa.appendChild(b);
  });

  $("pergunta").focus(); // leva o foco para a nova pergunta
}

function responder(escolhida) {
  const p = perguntas[atual];
  const botoes = document.querySelectorAll(".opcao");
  const acertou = escolhida === p.correta;

  botoes.forEach((b, i) => {
    b.disabled = true;
    if (i === p.correta) {
      b.classList.add("certa");
      b.textContent = "✔ Correta: " + b.dataset.texto;
    }
  });

  if (acertou) {
    pontos++;
  } else {
    pontos--;
    botoes[escolhida].classList.add("errada");
    botoes[escolhida].textContent = "✘ Sua resposta: " + botoes[escolhida].dataset.texto;
  }

  $("statusResposta").textContent = acertou ? "✔ Resposta correta!" : "✘ Resposta incorreta.";
  $("explicacao").textContent = p.explicacao;

  // links das fontes (definidos no JSON)
  const lista = $("listaFontes");
  lista.innerHTML = "";
  const fontes = p.fontes || [];
  fontes.forEach(f => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = f.url;
    a.textContent = f.nome;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    li.appendChild(a);
    lista.appendChild(li);
  });
  $("fonteWrap").classList.toggle("hidden", fontes.length === 0);
  $("feedback").classList.remove("hidden");

  $("btnProxima").classList.remove("hidden");
  $("btnProxima").focus(); // foco no botão seguinte para quem usa teclado
}

function proxima() {
  atual++;
  if (atual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

// ----- Ranking (sessionStorage) -----
function lerRanking() {
  try {
    return JSON.parse(sessionStorage.getItem("ranking") || "[]");
  } catch {
    return [];
  }
}

function salvarNoRanking() {
  const lista = lerRanking();
  lista.push({ nome, pontos });
  lista.sort((a, b) => b.pontos - a.pontos);
  sessionStorage.setItem("ranking", JSON.stringify(lista));
}

function mostrarRanking() {
  const ol = $("ranking");
  ol.innerHTML = "";
  lerRanking().forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nome}: ${item.pontos} pts`;
    ol.appendChild(li);
  });
}

function mostrarResultado() {
  $("progresso").style.width = "100%";
  mostrar(telaFim);
  $("placar").textContent = `${pontos} pts`;

  const pct = pontos / perguntas.length;
  $("mensagem").textContent =
    pct === 1 ? `Perfeito, ${nome}! Você acertou tudo.` :
    pct >= 0.6 ? `Muito bem, ${nome}! Você foi bem no quiz.` :
    `Continue tentando, ${nome}. Você pode melhorar na próxima.`;

  salvarNoRanking();
  mostrarRanking();
  $("tituloFim").focus();
}

function reiniciar() {
  mostrar(telaInicio);   // volta ao início sem recarregar a página
  $("nomeJogador").focus();
}

// ----- Efeito "chuva digital" (decorativo) -----
function iniciarChuva() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = $("chuva");
  const ctx = canvas.getContext("2d");
  const letras = "アイウエオカキクケコサシスセソ0123456789ABCDEF";
  const tam = 16;
  let gotas = [];

  function ajustar() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gotas = new Array(Math.floor(canvas.width / tam)).fill(1);
  }
  ajustar();
  window.addEventListener("resize", ajustar);

  setInterval(() => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";   // rastro que vai sumindo
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff41";
    ctx.font = tam + "px monospace";

    gotas.forEach((y, i) => {
      const c = letras[Math.floor(Math.random() * letras.length)];
      ctx.fillText(c, i * tam, y * tam);
      if (y * tam > canvas.height && Math.random() > 0.975) gotas[i] = 0;
      gotas[i]++;
    });
  }, 50);
}

// 5) EVENTOS
$("btnComecar").addEventListener("click", comecar);
$("btnProxima").addEventListener("click", proxima);
$("btnReiniciar").addEventListener("click", reiniciar);
$("nomeJogador").addEventListener("keydown", (e) => {
  if (e.key === "Enter") comecar();
});

// 6) INÍCIO
iniciarChuva();
carregarPerguntas();