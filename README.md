# Projeto Fartura — Site do Relatório

Site estático (sem backend) que apresenta o conceito do app Fartura: tecnologia
para pequenos agricultores, no contexto do ODS 2 (Fome Zero).

## Estrutura de pastas

```
fartura_project/
├── index.html                     # Página única. Marcação de todas as seções e abas.
├── css/
│   └── style.css                  # Sistema visual completo: tokens, tipografia, componentes.
├── js/
│   ├── icones.js                  # Biblioteca de ícones SVG (substitui emojis) + injeção via [data-icone].
│   ├── script.js                  # Lógica do simulador de app e do formulário "Fale Conosco".
│   ├── mural-comunidade.bundle.js # Bundle compilado (não editar diretamente — veja src/mural).
│   ├── previsao-tempo.bundle.js   # Bundle compilado (não editar diretamente — veja src/previsao).
│   └── router-fartura.bundle.js   # Bundle compilado (não editar diretamente — veja src/router).
└── src/
    ├── mural/                     # Código-fonte React do "Mural da Comunidade".
    │   ├── index.jsx              # Ponto de montagem (mount) na div #mural-root.
    │   ├── MuralComunidade.jsx    # Componente principal (formulário + lista + filtros).
    │   ├── GraficoPrecos.jsx      # Gráfico de preço médio por cultura (usa o pacote npm "recharts").
    │   ├── useOfertas.js          # Hook de estado das ofertas (em memória, sem persistência).
    │   ├── sanitize.js            # Validação e sanitização de todos os campos do formulário.
    │   └── icones.js              # Ícones usados só dentro do componente React.
    ├── previsao/                  # Código-fonte React da "Previsão do Tempo" (tela Início do simulador).
    │   ├── index.jsx              # Ponto de montagem na div #previsao-root (remonta a cada navegação).
    │   ├── PrevisaoTempo.jsx      # Componente (usa o pacote npm "date-fns" para datas em pt-BR).
    │   └── dadosSimulados.js      # Gerador determinístico de previsão (sem API externa/chave exposta).
    └── router/                    # Código-fonte da navegação em react-router-dom (abas + simulador).
        ├── index.jsx              # Ponto de montagem dos dois roteadores (monta assim que o bundle carrega).
        ├── AbasRouterFartura.jsx  # Roteia as 5 abas do relatório (contexto/dados/personas/mural/contato).
        ├── SimuladorRouterFartura.jsx # Roteia as 5 telas do simulador (início/calendário/mercado/finanças/técnico).
        ├── rotas.js               # Lista única dos nomes de rota válidos de cada roteador.
        └── _shims/                # Módulos que redirecionam `import 'react'`/`'react-dom'` para os
                                    # globais do CDN, evitando duas cópias de React no bundle.
```

## Navegação (react-router-dom)

O site usa `react-router-dom` para controlar a navegação, mas **a rota nunca aparece
na URL do navegador**: cada roteador (abas do relatório e telas do simulador) usa
`MemoryRouter`, cujo histórico existe só na memória da aba — a barra de endereço
permanece sempre a mesma, e o botão "voltar" do navegador não interfere na navegação
interna do site.

- `src/router/AbasRouterFartura.jsx` decide qual aba (`content-contexto`,
  `content-dados` etc.) fica visível, com base na rota interna atual.
- `src/router/SimuladorRouterFartura.jsx` decide qual tela do mockup do celular é
  injetada em `#app-content`, no lugar da antiga função `navTo()`.
- Nenhum dos dois roteadores renderiza HTML próprio: eles só ligam/desligam classes
  e conteúdo no HTML estático que já existe em `index.html`/`js/script.js`, do mesmo
  jeito que o código antigo (`changeTab()`/`navTo()`) fazia — só que agora dirigido
  pelo ciclo de vida de `<Route>` em vez de `if/else` manual.
- Para navegar programaticamente (de dentro de `index.html`, de outro script, ou de
  dentro de uma tela do simulador), use `FarturaRouterAbas.irPara('nomeDaAba')` ou
  `FarturaRouterSimulador.irPara('nomeDaTela')` — essas duas pontes globais substituem
  `changeTab()`/`navTo()` em todo o projeto.

## Funcionalidades em React

| Funcionalidade | Onde aparece | Pacotes npm usados | Bundle gerado |
|---|---|---|---|
| Mural da Comunidade | Aba "Mural" | — (só React) | `js/mural-comunidade.bundle.js` |
| Gráfico de preço médio por cultura | Dentro do Mural | `recharts` | incluído no bundle do Mural |
| Previsão do Tempo (7 dias) | Tela "Início" do simulador | `date-fns` | `js/previsao-tempo.bundle.js` |
| Navegação (abas + simulador) | Site inteiro | `react-router-dom` | `js/router-fartura.bundle.js` |

O gráfico de preços deixa o bundle do Mural consideravelmente maior (~390kb
minificado, contra ~9kb sem ele) porque o `recharts` traz consigo `d3-shape`,
`d3-scale` e afins. Isso é uma troca consciente: o site descreve um app pensado
para redes intermitentes, então em um produto real esse gráfico seria a primeira
peça candidata a carregar sob demanda (import dinâmico) ou a ser substituída por
um SVG mais simples desenhado à mão, como os demais ícones do site.

## Onde mexer em cada coisa

- **Textos e conteúdo do relatório** (estatísticas, personas, tecnologia): `index.html`.
- **Cores, tipografia, espaçamento, cartões, animações**: `css/style.css`, seção `:root`
  no topo do arquivo concentra todos os tokens de cor (`--palha`, `--terra`, `--mandioca`,
  `--broto`, `--milho`, `--ceu-chuva`) e tipografia (`--fonte-titulo`, `--fonte-texto`,
  `--fonte-dado`). Trocar a paleta é editar só essas variáveis.
- **Ícones**: adicionar um novo ícone em `js/icones.js` (objeto `ICONES`) e usá-lo em
  qualquer lugar do HTML estático com `<span data-icone="nome-do-icone"></span>`.
- **Telas do simulador de app** (Início, Lavoura, Mercado, Finanças, Técnico): objeto
  `screens` em `js/script.js` (exposto como `window.FarturaTelas` para o roteador ler).
- **Quais abas/telas existem** (adicionar ou remover uma): edite a lista em
  `src/router/rotas.js` — é a única fonte da verdade para os dois roteadores — e
  recompile (veja abaixo).
- **Mural da Comunidade** (nova funcionalidade em React): pasta `src/mural/`. Depois de
  qualquer alteração, é preciso **recompilar** (veja abaixo) — o navegador carrega apenas
  o arquivo já compilado `js/mural-comunidade.bundle.js`.

## Como recompilar as funcionalidades React após editar o código-fonte

O projeto não usa um bundler no dia a dia — o React e o ReactDOM são carregados prontos
via CDN no `index.html`, e só os componentes próprios precisam ser compilados
(JSX → JS puro, e os pacotes npm empacotados junto), porque navegadores não entendem
JSX diretamente e não têm acesso ao `node_modules`.

```bash
# na raiz do projeto
npm install esbuild recharts date-fns react-router-dom --no-save

# Mural da Comunidade (inclui o gráfico com recharts)
npx esbuild src/mural/index.jsx \
  --bundle --minify --format=iife \
  --jsx-factory=React.createElement --jsx-fragment=React.Fragment \
  --define:process.env.NODE_ENV='"production"' \
  --outfile=js/mural-comunidade.bundle.js

# Previsão do Tempo (inclui date-fns)
npx esbuild src/previsao/index.jsx \
  --bundle --minify --format=iife \
  --jsx-factory=React.createElement --jsx-fragment=React.Fragment \
  --define:process.env.NODE_ENV='"production"' \
  --outfile=js/previsao-tempo.bundle.js

# Navegação (inclui react-router-dom)
npx esbuild src/router/index.jsx \
  --bundle --minify --format=iife \
  --jsx-factory=React.createElement --jsx-fragment=React.Fragment \
  --define:process.env.NODE_ENV='"production"' \
  --alias:react=./src/router/_shims/react.js \
  --alias:react-dom=./src/router/_shims/react-dom.js \
  --alias:react-dom/client=./src/router/_shims/react-dom-client.js \
  --outfile=js/router-fartura.bundle.js
```

Repare que `react` e `react-dom` **não** entram nesses comandos como dependência a
instalar: eles continuam vindo do CDN no `<head>` do `index.html` como globais
(`React`, `ReactDOM`), e por isso não aparecem nos `import` desses arquivos — só os
pacotes que não têm build UMD/CDN pronto (`recharts`, `date-fns`, `react-router-dom`
a partir da versão 6) precisam ser instalados e embutidos no bundle.

O bundle da navegação é o único que precisa dos três `--alias`: diferente de
`recharts`/`date-fns`, o `react-router-dom` importa `react` e `react-dom` internamente
(para os Hooks e o Context de rota funcionarem). Sem o `--alias`, o esbuild embutiria
uma segunda cópia de React dentro do bundle — e ter duas cópias de React na mesma
página quebra os Hooks ("Invalid hook call"). Os três arquivos em `src/router/_shims/`
resolvem isso redirecionando esses imports para o `window.React`/`window.ReactDOM`
que o CDN já carregou, então só existe uma cópia de React na página inteira.

Por que assim, e não Babel direto no navegador: transpilar JSX em tempo real no
navegador (via `<script type="text/babel">`) funciona, mas manda todo o compilador
Babel para o dispositivo do usuário e recompila a cada carregamento — ruim para um app
pensado para "redes intermitentes". Compilar uma vez, no seu computador, e servir o
resultado já pronto é a prática correta para produção.


## Rodando localmente

Como é um site 100% estático, basta servir a pasta com qualquer servidor HTTP simples:

```bash
npx serve .
# ou
python3 -m http.server 8080
```

Abrir `index.html` diretamente pelo navegador (`file://`) também funciona, mas alguns
navegadores restringem `fetch`/módulos locais — preferir um servidor sempre que possível.

## Privacidade e dados

- O formulário **Fale Conosco** e o **Mural da Comunidade** não enviam dados a nenhum
  servidor: este protótipo não tem backend. Os dados digitados existem apenas na memória
  da aba do navegador enquanto a página está aberta e desaparecem ao recarregar.
- Nenhum dado é gravado em `localStorage`, `cookies` ou enviado para terceiros.
- Números de telefone informados no Mural são exibidos publicamente já mascarados
  (`(DDD) ****-**XX`), nunca completos.
- Para transformar isso em um produto real com contas de usuário e persistência,
  seria necessário: backend próprio validando tudo de novo no servidor, tabelas com
  Row Level Security, autenticação de sessão com expiração, e logs estruturados sem
  dados pessoais — nenhuma dessas peças existe neste protótipo estático.

Ver também `POLITICA_DE_PRIVACIDADE.md` e `TERMOS_DE_USO.md`.
