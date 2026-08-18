import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Icon from '../components/Icon';

const cards = [
  ['/dados','tendencia','Dados do Campo','O peso da agricultura familiar no Censo Agropecuário do IBGE.'],
  ['/personas','usuarios','Personas','Quem usaria o Fartura no dia a dia: o produtor e a extensionista.'],
  ['/mural','loja','Mural da Comunidade','Produtores publicam colheita disponível para compradores locais.'],
  ['/simulador','celular','Simulador de Aplicativo','Toque nas telas do app pensado para o produtor rural.'],
  ['/contato','correio','Fale Conosco','Envie sugestões ou relate dificuldades de acesso ao app.'],
];

export default function Home() {
 return <Layout title="Projeto Fartura" subtitle="Tecnologia contra a fome: agricultura familiar e inovação a serviço de quem planta." wide>
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
   <section className="lg:col-span-7 flex flex-col gap-6">
    <div className="cartao-fartura">
      <h2 className="text-2xl font-bold mb-2">O Problema</h2>
      <p className="text-[color:var(--texto-suave)] mb-6 text-sm leading-relaxed">Este relatório reúne as principais descobertas conceituais sobre o Projeto Fartura e o cenário de insegurança alimentar que torna a agricultura familiar estratégica para o Brasil.</p>
      <div className="caixa-alerta mb-4"><h3 className="text-lg font-bold flex items-center gap-2"><Icon name="alerta"/> Cenário Crítico</h3><p className="mt-2 text-sm">Em 2022, <strong>733 milhões</strong> de pessoas enfrentavam a fome no mundo (FAO). No Brasil, <strong>21 milhões</strong> sofrem com insegurança alimentar grave (PENSSAN).</p></div>
      <h3 className="text-lg font-bold mt-6 mb-2">Metas Foco (2.3 e 2.4)</h3>
      <ul className="space-y-3 text-[color:var(--texto-suave)] text-sm">
       <li className="flex items-start gap-2"><Icon name="tendencia" className="mt-0.5"/><span><strong className="text-[color:var(--texto-principal)]">Produtividade:</strong> Dobrar a renda de pequenos produtores, garantindo acesso a crédito, tecnologia e mercados.</span></li>
       <li className="flex items-start gap-2"><Icon name="broto" className="mt-0.5"/><span><strong className="text-[color:var(--texto-principal)]">Sustentabilidade:</strong> Práticas agrícolas resilientes às mudanças climáticas (secas, pragas).</span></li>
      </ul>
    </div>
    <div className="cartao-fartura cartao-fartura--escuro">
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><Icon name="engrenagem"/> Tecnologia e Usabilidade</h2>
      <p className="text-sm mb-4" style={{color:'var(--texto-sobre-terra-suave)'}}>O aplicativo do Projeto Fartura foi projetado para rodar offline e em redes intermitentes, empoderando o agricultor rural nas decisões de manejo e comercialização.</p>
      <ul className="text-sm space-y-2 font-semibold"><li className="flex items-center gap-2"><Icon name="calendario"/> Calendário de Plantação Simplificado</li><li className="flex items-center gap-2"><Icon name="apertoMao"/> Canal Direto com Atacadistas Locais</li><li className="flex items-center gap-2"><Icon name="ondaVoz"/> Auxílio de Voz para baixa alfabetização</li></ul>
    </div>
   </section>
   <section className="lg:col-span-5"><div className="cartao-fartura"><h2 className="text-lg font-bold mb-1">Explore o relatório</h2><p className="text-xs text-[color:var(--texto-suave)] mb-4">Cada página aprofunda uma parte do projeto.</p><nav className="grade-navegacao" aria-label="Seções do relatório">{cards.map(([to,icon,title,desc]) => <Link key={to} to={to} className="cartao-navegacao"><span className="cartao-navegacao__icone"><Icon name={icon}/></span><h3 className="cartao-navegacao__titulo">{title}</h3><p className="cartao-navegacao__descricao">{desc}</p><span className="cartao-navegacao__seta"><Icon name="seta"/></span></Link>)}</nav></div></section>
  </div>
 </Layout>
}
