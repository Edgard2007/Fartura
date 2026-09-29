import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const links = [
  ['/', 'Início'], ['/dados', 'Dados do Campo'], ['/personas', 'Personas'],
  ['/mural', 'Mural'], ['/simulador', 'Simulador'], ['/contato', 'Fale Conosco'],
];

function LegalModal({ tipo, fechar }) {
  if (!tipo) return null;
  const privacidade = tipo === 'privacidade';
  return <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title">
    <div className="modal-legal" style={{ background: 'var(--palha-clara)' }}>
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 id="legal-modal-title" className="text-xl font-bold">{privacidade ? 'Política de Privacidade' : 'Termos de Uso'}</h2>
        <button className="modal-legal__close" onClick={fechar} type="button" aria-label="Fechar janela">Fechar</button>
      </div>
      <p className="modal-legal__meta">Última atualização: 05 de agosto de 2026.</p>
      {privacidade ? <>
        <h3>1. Natureza do site</h3><p>Este é um site estático, sem servidor próprio de aplicação e sem banco de dados. Tudo o que aparece na tela é gerado no navegador. Não existe conta de usuário ou área logada.</p>
        <h3>2. Dados inseridos</h3><p>O site possui os formulários Fale Conosco e Mural da Comunidade. Os dados inseridos ficam somente na memória da sessão e não são enviados para um servidor.</p>
        <h3>3. Armazenamento</h3><p>O protótipo não usa localStorage, sessionStorage ou cookies próprios para armazenar as informações dos formulários.</p>
      </> : <>
        <h3>1. O que é este site</h3><p>O site apresenta, em formato de relatório interativo, o conceito do Projeto Fartura, tecnologia aplicada à agricultura familiar, ODS 2 e um simulador de aplicativo.</p>
        <h3>2. Natureza demonstrativa</h3><p>O simulador e o Mural da Comunidade são protótipos. Os dados estatísticos e telas do aplicativo servem para contextualização e demonstração.</p>
        <h3>3. Uso aceitável</h3><p>As informações inseridas nos formulários devem ser verdadeiras, respeitosas e adequadas ao propósito demonstrativo do projeto.</p>
      </>}
      <button className="botao botao--principal mt-5" onClick={fechar} type="button">Entendi</button>
    </div>
  </div>;
}

export function SiteFooter() {
  const [legal, setLegal] = useState(null);

  return <>
    <footer className="site-footer">
      <div className="site-footer__main">
        <div>
          <div className="site-header__brand site-header__brand--footer"><span className="brand-mark">F</span><span>Fartura<span className="brand-dot">.</span></span></div>
          <p>Tecnologia contra a fome.<br />Agricultura familiar em rede.</p>
        </div>
        <div><span className="site-footer__label">Navegação</span>{links.slice(0, 4).map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}</div>
        <div><span className="site-footer__label">Transparência</span><button type="button" onClick={() => setLegal('privacidade')}>Política de Privacidade</button><button type="button" onClick={() => setLegal('termos')}>Termos de Uso</button></div>
      </div>
      <div className="site-footer__bottom"><span>© 2026 Projeto Fartura</span><span>Feito com cuidado no Brasil</span></div>
    </footer>
    <LegalModal tipo={legal} fechar={() => setLegal(null)} />
  </>;
}

export default function Layout({ title, subtitle, children, wide = false }) {
  return <div className="app-shell">
    <header className="site-header">
      <NavLink to="/" className="site-header__brand" aria-label="Fartura, início">
        <span className="brand-mark">F</span>
        <span>Fartura<span className="brand-dot">.</span></span>
      </NavLink>
      <nav className="site-header__nav" aria-label="Navegação principal">
        {links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `site-header__link${isActive ? ' site-header__link--active' : ''}`}>{label}</NavLink>)}
      </nav>
      <NavLink to="/contato" className="site-header__cta">Fale com a gente</NavLink>
    </header>
    <section className="internal-hero">
      <video className="internal-hero__media" autoPlay muted loop playsInline poster="/F.png">
        <source src="/plantas.mp4" type="video/mp4" />
      </video>
      <div className="internal-hero__veil" />
      <div className="internal-hero__content">
        <p className="eyebrow eyebrow--light"><span className="eyebrow-line" /> ODS 2 · Segurança alimentar</p>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
    <main className={`internal-content mx-auto px-4 sm:px-6 lg:px-8 ${wide ? 'max-w-7xl' : 'max-w-5xl'}`}>
      {children}
    </main>
    <SiteFooter />
  </div>;
}
