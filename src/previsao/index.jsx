// A tela "Início" do simulador é recriada inteira (innerHTML) a cada navegação
// — diferente do Mural, que fica escondido/mostrado sem ser destruído. Por isso
// este mount NÃO guarda estado de "já montado": ele desmonta a raiz anterior (se
// existir) e cria uma nova a cada chamada, evitando vazamento de memória de raízes
// React presas a nós de DOM que já foram substituídos.

import PrevisaoTempo from './PrevisaoTempo.jsx';

let raizAtual = null;

function montar(idElemento) {
  const elemento = document.getElementById(idElemento);
  if (!elemento) return;

  if (raizAtual) {
    try {
      raizAtual.unmount();
    } catch (erro) {
      // Nó antigo já removido do DOM: seguro ignorar e seguir com a nova montagem.
    }
  }

  raizAtual = ReactDOM.createRoot(elemento);
  raizAtual.render(React.createElement(PrevisaoTempo));
}

window.FarturaPrevisao = { montar };
