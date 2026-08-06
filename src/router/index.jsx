// Ponto de montagem dos roteadores do site.
// React e ReactDOM chegam como globais via CDN (mesmo esquema do Mural e da
// Previsão do Tempo); react-router-dom, por não ter build UMD estável a
// partir da versão 6, é empacotado no bundle pelo esbuild — por isso ele
// entra como import normal e não como global.
//
// Diferente dos outros dois módulos React do projeto, este mount roda
// imediatamente ao carregar o bundle (e não sob demanda a partir de um
// onclick), porque os roteadores são quem decide o estado inicial das abas e
// do simulador — precisam estar de pé antes do primeiro clique do usuário.
// Este script é carregado depois de js/script.js no index.html: as funções e
// dados globais dos quais os roteadores dependem (window.FarturaTelas,
// window.renderIBGEChart, window.updateFinanceData) já existem quando este
// código roda.
import AbasRouterFartura from './AbasRouterFartura.jsx';
import SimuladorRouterFartura from './SimuladorRouterFartura.jsx';

function montarRoteador(idElemento, Componente) {
  const elemento = document.getElementById(idElemento);
  if (!elemento) return;
  ReactDOM.createRoot(elemento).render(React.createElement(Componente));
}

montarRoteador('abas-router-root', AbasRouterFartura);
montarRoteador('simulador-router-root', SimuladorRouterFartura);
