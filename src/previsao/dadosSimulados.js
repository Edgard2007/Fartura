// Gerador de previsão simulada. Determinístico (mesma semente => mesmos números),
// para o protótipo não depender de uma API de clima externa nem de uma chave de API
// exposta no navegador — se este virasse produto real, essa função seria trocada por
// uma chamada de backend, nunca por uma chamada direta do cliente a um provedor de
// clima com credenciais embutidas no bundle.

const CONDICOES = ['sol', 'parcialmente-nublado', 'chuva-leve'];

// Gerador pseudoaleatório simples e determinístico (sem dependência externa).
function pseudoAleatorio(semente) {
  const x = Math.sin(semente) * 10000;
  return x - Math.floor(x);
}

export function gerarPrevisao(dataBase, quantidadeDias) {
  return Array.from({ length: quantidadeDias }, (_, indice) => {
    const semente = dataBase.getDate() * 31 + indice * 7;
    const condicaoIndice = Math.floor(pseudoAleatorio(semente) * CONDICOES.length);
    const minima = 16 + Math.round(pseudoAleatorio(semente + 1) * 6);
    const maxima = minima + 6 + Math.round(pseudoAleatorio(semente + 2) * 5);
    const condicao = CONDICOES[condicaoIndice];
    return {
      offsetDias: indice,
      condicao,
      minima,
      maxima,
      favoravelColheita: condicao !== 'chuva-leve',
    };
  });
}
