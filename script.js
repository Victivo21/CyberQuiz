
  const perguntas = [
    { texto: "O que e cibersegurança?",
      opcoes: ["Criar site e aplicativos", "Proteger sistemas, redes e dados contra ameaças digitais", "Aumentar a velocidade da internet", "Programar jogos"], correta: 1 },
    { texto: "O que e Phishing?",
      opcoes: ["Um golpe que tenta enganar as pessoas para obter as informações", "Um método de resfriamento do computador", "Um tipo de memória RAM",  "Um protocolo de rede sem fio"], correta: 0 },
    { texto: "Qual destas práticas ajuda a proteger suas contas?",
      opcoes: ["Usar a mesma senha em todos os sites", "Compartilhar senhas com amigos", "Utilizar senhas curtas e previsíveis",  "Usar senhas longas e exclusivas para cada conta" 
], correta: 3 },
  ];
 
  // 2) ESTADO
  let atual = 0;
  let acertos = 0;
 
  // 3) ELEMENTOS DA PÁGINA
  const $ = (id) => document.getElementById(id);
  const telaInicio = $("inicio"), telaJogo = $("jogo"), telaFim = $("fim");
 
  // 4) FUNÇÕES
  function mostrar(tela) {
    [telaInicio, telaJogo, telaFim].forEach(t => t.classList.add("hidden"));
    tela.classList.remove("hidden");
  }
 
  function comecar() {
    atual = 0;
    acertos = 0;
    mostrar(telaJogo);
    mostrarPergunta();
  }
 
  function mostrarPergunta() {
    const p = perguntas[atual];
    $("contador").textContent = `Pergunta ${atual + 1} de ${perguntas.length}`;
    $("progresso").style.width = `${(atual / perguntas.length) * 100}%`;
    $("pergunta").textContent = p.texto;
    $("btnProxima").classList.add("hidden");
    $("btnProxima").textContent = atual === perguntas.length - 1 ? "Ver resultado" : "Próxima";
 
    const caixa = $("opcoes");
    caixa.innerHTML = "";
    p.opcoes.forEach((texto, i) => {
      const b = document.createElement("button");
      b.className = "opcao";
      b.textContent = texto;
      b.addEventListener("click", () => responder(i));
      caixa.appendChild(b);
    });
  }
 
  function responder(escolhida) {
    const p = perguntas[atual];
    const botoes = document.querySelectorAll(".opcao");
    botoes.forEach((b, i) => {
      b.disabled = true;
      if (i === p.correta) b.classList.add("certa");
    });
    if (escolhida === p.correta) {
      acertos++;
    } else {
      botoes[escolhida].classList.add("errada");
    }
    $("btnProxima").classList.remove("hidden");
  }
 
  function proxima() {
    atual++;
    if (atual < perguntas.length) {
      mostrarPergunta();
    } else {
      mostrarResultado();
    }
  }
 
  function mostrarResultado() {
    mostrar(telaFim);
    $("placar").textContent = `${acertos} / ${perguntas.length}`;
    const pct = acertos / perguntas.length;
    $("mensagem").textContent =
      pct === 1 ? "Perfeito! Você acertou tudo." :
      pct >= 0.6 ? "Muito bem! Você foi bem no quiz." :
      "Continue tentando. Você pode melhorar na próxima.";
  }
 
  // 5) EVENTOS
  $("btnComecar").addEventListener("click", comecar);
  $("btnProxima").addEventListener("click", proxima);
  $("btnReiniciar").addEventListener("click", comecar);