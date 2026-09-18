<p align = "center">
  <img src= "https://capsule-render.vercel.app/api?type=speech&height=300&color=33241a&text=Projeto%20Fartura&fontColor=efbb8b">
</p>

# Projeto Fartura - ODS 2

**Tecnologia contra a fome: agricultura familiar e inovação a serviço de quem planta.**

Site do relatório de um estudo de caso conceitual para um aplicativo voltado a
pequenos agricultores, endereçando a **Meta 2** dos Objetivos de Desenvolvimento
Sustentável da ONU (Fome Zero e Agricultura Sustentável). O repositório reúne o
relatório em si — dados, personas, contexto do problema — e um **simulador
navegável do aplicativo proposto**, com duas funcionalidades implementadas de
verdade em React: um mural de ofertas entre produtores e compradores, e uma
previsão do tempo de 7 dias.

Site estático, sem backend, sem framework de build — feito para carregar rápido
mesmo em conexões instáveis, o mesmo cenário de rede enfrentado pelo público que
o projeto propõe atender.

---

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Como executar localmente](#como-executar-localmente)
- [Decisões de arquitetura](#decisões-de-arquitetura)
- [Privacidade e dados](#privacidade-e-dados)
- [Documentação adicional](#documentação-adicional)
- [Autoria](#autoria)

---

## Sobre o projeto

Em 2022, 733 milhões de pessoas enfrentavam a fome no mundo (FAO); no Brasil,
21 milhões conviviam com insegurança alimentar grave (Rede PENSSAN). O Fartura
parte desse cenário para propor um aplicativo pensado para o pequeno produtor
rural — alguém que, com frequência, opera com conectividade limitada e baixa
familiaridade com interfaces digitais complexas.

O repositório funciona como **relatório navegável**: cada página aprofunda uma
parte do estudo, e duas delas saem do papel — o Mural da Comunidade e a
Previsão do Tempo são funcionalidades React reais, não apenas mockups estáticos.

| Página | Conteúdo |
|---|---|
| `index.html` | O problema, o cenário crítico e as metas 2.3/2.4 da ONU foco do projeto |
| `dados.html` | Peso da agricultura familiar no Censo Agropecuário do IBGE (2017), em gráfico |
| `personas.html` | Quem usaria o Fartura no dia a dia: o produtor e a extensionista rural |
| `mural.html` | **Mural da Comunidade** — produtores publicam colheita disponível para compradores locais |
| `simulador.html` | **Simulador do aplicativo** — telas tocáveis do app proposto, com previsão do tempo real de 7 dias |
| `contato.html` | Formulário para sugestões ou relatos de dificuldade de acesso ao app |

## Funcionalidades

- **Mural da Comunidade** — publicação e busca de ofertas de colheita, com
  validação e sanitização de todos os campos, e mascaramento automático de
  telefone (dado pessoal nunca exibido por completo).
- **Gráfico de preço médio por cultura** — agrega as ofertas do mural em tempo
  real e mostra a tendência de preço por produto.
- **Previsão do tempo de 7 dias** — geração determinística de previsão com
  destaque para os dias favoráveis à colheita, integrada à tela inicial do
  simulador do app.
- **Simulador do aplicativo** — cinco telas navegáveis (Início, Lavoura,
  Mercado, Finanças, Técnico) dentro de uma moldura de celular, incluindo
  simulação de comando de voz — recurso pensado para usuários com baixa
  alfabetização.
- **Modal de Política de Privacidade e Termos de Uso** — acessível em qualquer
  página, sem depender de requisição de arquivo (funciona até abrindo o site
  direto do disco).
- **Design system próprio** — paleta, tipografia e componentes autorais em
  `css/style.css`, sem depender de um template de terceiros.

## Tecnologias utilizadas

**Base**
- HTML5 semântico, multi-página (cada rota é um arquivo `.html` real)
- CSS3 com *design tokens* (custom properties) — sem framework de UI
- Tailwind CSS (via CDN, para utilitários de layout) combinado com CSS autoral
- JavaScript (ES6+) puro para header/footer compartilhados, ícones, formulário
  de contato e o modal legal

**Funcionalidades em React**
- [React](https://react.dev/) + [ReactDOM](https://react.dev/) (via CDN)
- [date-fns](https://date-fns.org/) — cálculo e formatação de datas em pt-BR
- [Recharts](https://recharts.org/) — gráfico de preço médio por cultura
- [esbuild](https://esbuild.github.io/) — compilação dos componentes (JSX → JS,
  bundling dos pacotes npm) para dois bundles de produção, sem transpilar no navegador

**Dados e visualização**
- [Chart.js](https://www.chartjs.org/) — gráfico do Censo Agropecuário do IBGE

## Estrutura do repositório

```
fartura_project/
├── index.html, dados.html, personas.html, mural.html, simulador.html, contato.html
├── css/style.css              # Design system: tokens, tipografia, componentes
├── js/                        # Scripts por página + bundles React compilados
├── src/
│   ├── mural/                 # Código-fonte React do Mural da Comunidade
│   └── previsao/               # Código-fonte React da Previsão do Tempo
├── docs/ARQUITETURA.md        # Guia técnico completo (build, convenções, onde mexer)
├── POLITICA_DE_PRIVACIDADE.md
└── TERMOS_DE_USO.md
```

Detalhamento completo de cada arquivo e convenção de código está em
[`docs/ARQUITETURA.md`](docs/ARQUITETURA.md).

## Como executar localmente

Site 100% estático — não precisa de instalação para navegar:

```bash
npx serve .
# ou
python3 -m http.server 8080
```

Abrir `index.html` direto no navegador (`file://`) também funciona.

Para alterar as funcionalidades em React é necessário recompilar os bundles —
o passo a passo com os comandos do `esbuild` está em
[`docs/ARQUITETURA.md`](docs/ARQUITETURA.md#como-recompilar-as-funcionalidades-react-após-editar-o-código-fonte).

## Decisões de arquitetura

- **Multi-página em vez de SPA**: cada seção do relatório é uma URL real,
  sem roteador em JS — melhor indexação e carregamento inicial mais leve.
- **React só onde há estado interativo de verdade** (mural e previsão do
  tempo); o restante do site é HTML/CSS/JS simples — evita mandar todo o
  ecossistema React para páginas que não precisam dele.
- **Bundles pré-compilados**: JSX é compilado uma vez pelo desenvolvedor
  (`esbuild`), não no navegador do usuário — decisão direta ligada à proposta
  do app de funcionar bem em redes intermitentes.
- **Header e footer centralizados** em `js/chrome.js`: uma lista única de
  páginas alimenta o menu de navegação de todas as rotas.

## Privacidade e dados

Este é um protótipo sem backend: nada digitado no Mural da Comunidade ou no
Fale Conosco é enviado a um servidor ou gravado em `localStorage`/cookies —
os dados existem só na memória da aba enquanto ela está aberta. Telefones
informados no Mural são exibidos publicamente já mascarados. Detalhes de como
isso evoluiria em um produto real (backend, RLS, autenticação, logs sem dado
pessoal) estão descritos em [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md#privacidade-e-dados).

Ver também [Política de Privacidade](POLITICA_DE_PRIVACIDADE.md) e
[Termos de Uso](TERMOS_DE_USO.md).

## Documentação adicional

- [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md) — estrutura de pastas comentada,
  como recompilar os componentes React, e onde editar cada parte do site.

## Autoria

Projeto acadêmico conceitual desenvolvido para um estudo de caso sobre a
Meta 2 dos Objetivos de Desenvolvimento Sustentável da ONU, desenvolvido pelos alunos
Edgard Fernandes da Costa, Lucca Miranda e Otávio Miguel.

Para produção:
```bash
npm run build
npm run preview
```
