import { Link } from "react-router-dom";
import plantasVideo from "../assets/plantas.mp4";
const videoSrc = PlantasVideo;

const navItems = [
  ["#manifesto", "Manifesto"],
  ["#solucao", "A solução"],
  ["#impacto", "Impacto"],
  ["/dados", "Explorar dados"],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Landing() {
  return (
    <div className="landing-page">
      <header className="landing-nav">
        <Link to="/" className="landing-brand" aria-label="Fartura — início">
          <span className="brand-mark">F</span>
          <span>
            Fartura<span className="brand-dot">.</span>
          </span>
        </Link>
        <nav className="landing-nav__links" aria-label="Navegação principal">
          {navItems.map(([href, label]) =>
            href.startsWith("#") ? (
              <a key={href} href={href}>
                {label}
              </a>
            ) : (
              <Link key={href} to={href}>
                {label}
              </Link>
            ),
          )}
        </nav>
        <Link to="/contato" className="landing-nav__cta">
          Fale com a gente <Arrow />
        </Link>
      </header>

      <main>
        <section className="landing-hero" aria-labelledby="hero-title">
          <video
            className="landing-hero__video"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2200&q=85"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className="landing-hero__veil" />
          <div className="landing-hero__content">
            <p className="eyebrow eyebrow--light">
              <span className="eyebrow-line" /> ODS 2 · Segurança alimentar
            </p>
            <h1 id="hero-title">
              Quem planta
              <br />
              <em>também alimenta</em>
              <br />o futuro.
            </h1>
            <p className="landing-hero__lead">
              O Fartura aproxima quem produz de quem precisa, usando tecnologia
              simples para fortalecer a agricultura familiar e fazer a comida
              chegar mais longe.
            </p>
            <div className="landing-hero__actions">
              <Link to="/mural" className="button button--gold">
                Conheça o mural <Arrow />
              </Link>
              <a href="#manifesto" className="hero-text-link">
                Entenda o movimento <span>↓</span>
              </a>
            </div>
          </div>
          <div className="landing-hero__meta">
            <span>01 / 04</span>
            <span className="hero-progress">
              <i />
            </span>
            <span>cultivar · conectar · repartir</span>
          </div>
          <div className="landing-hero__scroll">
            role para descobrir <span>↓</span>
          </div>
        </section>

        <section
          id="manifesto"
          className="landing-section landing-section--manifesto"
        >
          <div className="section-kicker">01 — O manifesto</div>
          <div className="manifesto-grid">
            <h2>
              Comida de verdade começa <em>na origem.</em>
            </h2>
            <div className="manifesto-copy">
              <p>
                A agricultura familiar produz a maior parte dos alimentos que
                chegam à mesa brasileira. Ainda assim, quem planta enfrenta
                distância, falta de informação e mercados difíceis de acessar.
              </p>
              <p>
                O Fartura nasce para virar essa lógica do avesso: colocar dados,
                voz e oportunidade nas mãos de quem cultiva.
              </p>
              <Link to="/dados" className="underlined-link">
                Ver os dados do campo <Arrow />
              </Link>
            </div>
          </div>
          <div className="manifesto-stamp">
            <strong>2.3</strong>
            <span>
              meta global
              <br />
              para 2030
            </span>
          </div>
        </section>

        <section id="solucao" className="landing-section landing-section--dark">
          <div className="section-kicker section-kicker--light">
            02 — O que fazemos
          </div>
          <div className="solution-head">
            <h2>
              Uma rede que
              <br />
              <em>começa no chão.</em>
            </h2>
            <p>
              Ferramentas pensadas para a vida real: simples, acessíveis e úteis
              mesmo quando a conexão falha.
            </p>
          </div>
          <div className="solution-cards">
            <article className="solution-card">
              <span>01</span>
              <div className="solution-icon">↗</div>
              <h3>Planejar melhor</h3>
              <p>
                Calendário de plantio, previsão do tempo e sinais do território
                para decisões mais seguras.
              </p>
              <Link to="/simulador">
                Conhecer o app <Arrow />
              </Link>
            </article>
            <article className="solution-card solution-card--accent">
              <span>02</span>
              <div className="solution-icon">◎</div>
              <h3>Vender mais perto</h3>
              <p>
                Um mural direto entre produtores, compradores e redes locais de
                abastecimento.
              </p>
              <Link to="/mural">
                Ir para o mural <Arrow />
              </Link>
            </article>
            <article className="solution-card">
              <span>03</span>
              <div className="solution-icon">⌁</div>
              <h3>Decidir em conjunto</h3>
              <p>
                Dados que saem dos relatórios e voltam para a comunidade em
                forma de ação.
              </p>
              <Link to="/personas">
                Ver as pessoas <Arrow />
              </Link>
            </article>
          </div>
        </section>

        <section id="impacto" className="landing-impact">
          <div className="impact-image">
            <img
              src="https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=1400&q=85"
              alt="Mãos colhendo alimentos em uma horta"
            />
            <span className="image-caption">
              a terra é tecnologia
              <br />
              há milhares de anos
            </span>
          </div>
          <div className="impact-copy">
            <div className="section-kicker">03 — O impacto</div>
            <h2>
              Quando a ponta
              <br />
              se conecta,
              <br />
              <em>todo mundo colhe.</em>
            </h2>
            <p>
              O Fartura é um protótipo vivo: um convite para enxergar a
              agricultura familiar como infraestrutura de futuro, renda e
              dignidade.
            </p>
            <div className="impact-stats">
              <div>
                <strong>733 mi</strong>
                <span>
                  pessoas enfrentam
                  <br />a fome no mundo*
                </span>
              </div>
              <div>
                <strong>70%</strong>
                <span>
                  dos alimentos vêm
                  <br />
                  da agricultura familiar*
                </span>
              </div>
            </div>
            <small>
              *Fontes: FAO e Censo Agropecuário IBGE. Consulte o relatório
              completo.
            </small>
          </div>
        </section>

        <section className="landing-cta">
          <p className="eyebrow">O próximo passo é coletivo</p>
          <h2>
            Tem um pedaço
            <br />
            <em>dessa colheita?</em>
          </h2>
          <Link to="/contato" className="button button--dark">
            Fale com a gente <Arrow />
          </Link>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-brand landing-brand--footer">
          <span className="brand-mark">F</span>
          <span>
            Fartura<span className="brand-dot">.</span>
          </span>
        </div>
        <p>
          Tecnologia contra a fome.
          <br />
          Agricultura familiar em rede.
        </p>
        <div className="footer-links">
          <Link to="/home">O projeto</Link>
          <Link to="/contato">Contato</Link>
          <a href="#manifesto">Manifesto</a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Projeto Fartura</span>
          <span>
            Feito com cuidado no Brasil <span className="footer-heart">✦</span>
          </span>
        </div>
      </footer>
    </div>
  );
}

export { Landing };
