// Ponto de montagem do Mural da Comunidade.
// React e ReactDOM chegam como globais via CDN (carregados no <head> do index.html)
// antes deste bundle, então não há import de 'react'/'react-dom' aqui — evita duplicar
// a biblioteca dentro do bundle e mantém o arquivo final pequeno.

import MuralComunidade from './MuralComunidade.jsx';

let raizMontada = null;

function montar(idElemento) {
  const elemento = document.getElementById(idElemento);
  if (!elemento || raizMontada) return;
  raizMontada = ReactDOM.createRoot(elemento);
  raizMontada.render(React.createElement(MuralComunidade));
}

window.FarturaMural = { montar };
