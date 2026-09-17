import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Icon from "../components/Icon";

const highlights = [
  ["/mural", "Mural da Comunidade", "Conecte quem planta a quem compra, com mais previsibilidade e menos desperdício.", "loja"],
  ["/simulador", "Simulador do app", "Explore uma experiência pensada para funcionar mesmo com internet instável.", "celular"],
  ["/dados", "Dados do campo", "Entenda por que a agricultura familiar é central para um sistema alimentar mais justo.", "tendencia"],
];

export default function Home() {
  return (
    <Layout wide landing>
      <div className="landing-shell">
        <nav className="landing-nav" aria-label="Navegação principal">
          <Link to="/" className="landing-brand" aria-label="Fartura, início">
            <span className="landing-brand__mark">F</span>
            <span>Fartura</span>
          </Link>
          <div className="landing-nav__links">
            <a href="#manifesto">O projeto</a>
            <a href="#recursos">Recursos</a>
            <Link to="/contato">Fale conosco</Link>
          </div>
          <Link to="/simulador" className="landing-nav__cta">Conheça o app <span>↗</span></Link>
        </nav>

        <main>
          <section className="hero-fartura" aria-labelledby="hero-title">
            <video className="hero-fartura__video" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=1800&q=85">
              <source src="/fartura-hero.mp4" type="video/mp4" />
            </video>
            <div className="hero-fartura__veil" />
            <div className="hero-fartura__content">
              <div className="hero-fartura__eyebrow"><span className="pulse-dot" /> Tecnologia a serviço de quem planta</div>
              <h1 id="hero-title">Onde o campo<br /><em>encontra futuro.</em></h1>
              <p className="hero-fartura__lead">O Fartura aproxima pequenos produtores, conhecimento e mercado para fazer a agricultura familiar prosperar.</p>
              <div className="hero-fartura__actions">
                <Link to="/simulador" className="botao botao--principal">Explorar o projeto <span>↗</span></Link>
                <a href="#manifesto" className="hero-fartura__play"><span className="play-icon">↓</span> Descobrir nossa visão</a>
              </div>
            </div>
            <div className="hero-fartura__meta"><span>01 / 04</span><span className="hero-fartura__line" /><span>Colheita · Conexão · Fartura</span></div>
            <div className="hero-fartura__scroll">role para explorar <span>↓</span></div>
          </section>

          <section className="manifesto-fartura" id="manifesto">
            <div className="section-kicker">01 — Nosso ponto de partida</div>
            <div className="manifesto-fartura__grid">
              <h2>Comida de verdade começa <em>na raiz.</em></h2>
              <div>
                <p className="section-intro">O Brasil que alimenta o Brasil é feito de pequenas propriedades, saberes locais e trabalho todos os dias. Mas quem produz ainda encontra barreiras para acessar informação, crédito e compradores.</p>
                <p className="section-intro section-intro--muted">O Fartura nasce para reduzir essas distâncias — com tecnologia simples, acessível e construída a partir da realidade do campo.</p>
                <Link to="/dados" className="text-link">Conheça os dados que nos movem <span>→</span></Link>
              </div>
            </div>
            <div className="manifesto-fartura__stats">
              <div><strong>2.3</strong><span>ODS foco: produtividade e renda</span></div>
              <div><strong>2.4</strong><span>ODS foco: resiliência climática</span></div>
              <div><strong>100%</strong><span>feito para a realidade local</span></div>
            </div>
          </section>

          <section className="resources-fartura" id="recursos">
            <div className="resources-fartura__header"><div><div className="section-kicker">02 — O que construímos</div><h2>Uma rede que cresce<br /><em>junto.</em></h2></div><p>Mais do que um aplicativo, um ponto de encontro entre pessoas, dados e possibilidades.</p></div>
            <div className="resource-grid">
              {highlights.map(([to, title, desc, icon], index) => (
                <Link to={to} className="resource-card" key={to}>
                  <div className="resource-card__top"><span className="resource-card__index">0{index + 1}</span><span className="resource-card__icon"><Icon name={icon} /></span></div>
                  <div><h3>{title}</h3><p>{desc}</p></div>
                  <span className="resource-card__arrow">↗</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="closing-fartura">
            <div className="closing-fartura__copy"><div className="section-kicker">03 — Um convite</div><h2>O futuro é mais fértil<br />quando é <em>compartilhado.</em></h2><p>Entre no relatório, conheça as pessoas por trás do projeto e experimente o protótipo do Fartura.</p><Link to="/personas" className="botao botao--principal">Conhecer as personas <span>↗</span></Link></div>
            <div className="closing-fartura__stamp"><span>F</span><small>Projeto<br />Fartura<br />2026</small></div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
