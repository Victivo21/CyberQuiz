# CyberQuiz

Trabalho final em grupo da disciplina de **Desenvolvimento Front-End**: um site de quiz com perguntas sobre tecnologia.

**Site publicado:** COLOQUE-AQUI-O-LINK-DO-SITE (HTTPS)

## Tema

Cibersegurança

## Integrantes e papéis

| Integrante | Papel |
|---|---|
| Bruno Tadeu | PREENCHER (ex.: HTML / estrutura) |
| Felipe Avelino | PREENCHER (ex.: CSS / design) |
| Victor dos Santos | PREENCHER (ex.: JavaScript / lógica) |
| Vinicius Conceição | PREENCHER (ex.: perguntas, README e testes) |

## Descrição

O CyberQuiz testa conhecimentos de cibersegurança com perguntas de múltipla escolha. Após cada resposta, o jogador vê se acertou, lê uma explicação e pode abrir links de fontes para saber mais.

## Regras do jogo

1. O jogador informa o nome antes de começar.
2. Uma pergunta é exibida por vez, com 4 alternativas.
3. Resposta certa: **+1 ponto**. Resposta errada: **-1 ponto**. A pontuação pode ficar negativa.
4. Ao responder, o quiz mostra a explicação e as fontes (links) da pergunta.
5. No final, é exibida a pontuação e o **ranking** da sessão (guardado em `sessionStorage`, ou seja, vale enquanto a aba estiver aberta).
6. É possível jogar de novo sem recarregar a página.

## Como executar

**Online:** acesse o link do site publicado acima.

**Localmente:**

1. Clone o repositório: `git clone URL-DO-REPOSITORIO`
2. Abra a pasta do projeto.
3. Rode um servidor local, por exemplo:
   - VS Code: extensão **Live Server** > "Open with Live Server"; ou
   - Terminal: `python -m http.server 8000` e acesse `http://localhost:8000`.

> Abrir o `index.html` direto (`file://`) também funciona: se o `fetch` do `perguntas.json` for bloqueado, o quiz usa uma cópia das perguntas embutida no HTML.

## Estrutura do projeto

```
index.html
perguntas.json
css/estilo.css
script/script.js
README.md
```

## Perguntas

As perguntas ficam em `perguntas.json` (19 perguntas), cada uma com texto, 4 alternativas, índice da resposta correta, explicação e fontes (links).

## Acessibilidade: o que verificamos

PREENCHER depois de testar. Sugestão de itens (marque apenas o que o grupo realmente conferiu):

- [ ] **Contraste:** texto verde claro sobre fundo preto, conferido em ferramenta de contraste (informar a razão obtida).
- [ ] **Foco visível:** todos os botões, o campo de nome e os links mostram contorno ao navegar com Tab.
- [ ] **Navegação por teclado:** o quiz inteiro (nome, respostas, próxima, jogar de novo) funciona só com teclado; Enter inicia a partida pelo campo de nome.
- [ ] **Cor não é a única pista:** acerto e erro também são indicados por texto/ícone (✔ / ✘) e estilo de borda (sólida / tracejada).
- [ ] **`alt` e elementos decorativos:** não há imagens de conteúdo; a animação de fundo é decorativa (`aria-hidden`).
- [ ] **Movimento reduzido:** com `prefers-reduced-motion`, a animação de fundo e o cursor piscando são desativados.
- [ ] **Responsividade:** testado em celular e desktop, sem rolagem horizontal.
- [ ] **Leitores de tela:** o feedback da resposta usa `aria-live`.