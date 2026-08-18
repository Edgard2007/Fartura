import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const links = [
  ['/', 'Início'], ['/dados', 'Dados do Campo'], ['/personas', 'Personas'],
  ['/mural', 'Mural'], ['/simulador', 'Simulador'], ['/contato', 'Fale Conosco'],
];

function LegalModal({ tipo, fechar }) {
  if (!tipo) return null;
  const privacidade = tipo === 'privacidade';
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" role="dialog" aria-modal="true">
    <div className="modal-legal" style={{ background: 'var(--palha-clara)' }}>
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-xl font-bold">{privacidade ? 'Política de Privacidade' : 'Termos de Uso'}</h2>
        <button className="botao botao--fantasma" onClick={fechar} type="button">Fechar</button>
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

export default function Layout({ title, subtitle, children, wide = false }) {
  const [legal, setLegal] = useState(null);
  return <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-8 ${wide ? 'max-w-7xl' : 'max-w-4xl'}`}>
    <header className="cabecalho-fartura mb-10">
      <svg className="cabecalho-fartura__curvas" viewBox="0 0 800 200" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-20 40 C150 10,300 90,480 50 S780 10,900 60" stroke="#F2E8D5" strokeWidth="1.5" fill="none"/>
        <path d="M-20 80 C150 50,300 130,480 90 S780 50,900 100" stroke="#F2E8D5" strokeWidth="1.5" fill="none"/>
        <path d="M-20 120 C150 90,300 170,480 130 S780 90,900 140" stroke="#F2E8D5" strokeWidth="1.5" fill="none"/>
        <path d="M-20 160 C150 130,300 210,480 170 S780 130,900 180" stroke="#F2E8D5" strokeWidth="1.5" fill="none"/>
      </svg>
      <span className="cabecalho-fartura__marca">ODS 2 · Segurança Alimentar</span>
      <h1 className="cabecalho-fartura__titulo">{title}</h1>
      {subtitle && <p className="cabecalho-fartura__subtitulo">{subtitle}</p>}
      <nav className="cabecalho-fartura__nav" aria-label="Navegação principal">
        {links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `aba-fartura${isActive ? ' aba-fartura--ativa' : ''}`}>{label}</NavLink>)}
      </nav>
    </header>
    {children}
    <footer className="rodape-fartura">
      <p>Projeto Fartura — relatório e protótipo interativo. Nenhum dado enviado pelos formulários deixa o seu navegador.</p>
      <p className="mt-1"><button type="button" className="rodape-fartura__link" onClick={() => setLegal('privacidade')}>Política de Privacidade</button><span className="mx-2">·</span><button type="button" className="rodape-fartura__link" onClick={() => setLegal('termos')}>Termos de Uso</button></p>
    </footer>
    <LegalModal tipo={legal} fechar={() => setLegal(null)} />
  </div>;
}
