// Hook de estado do Mural da Comunidade.
// Decisão de privacidade: os dados vivem apenas na memória da sessão do navegador
// (React state). Não há localStorage, cookie ou envio a terceiros — ao recarregar
// a página, o mural volta ao estado semente. Isso é intencional: este protótipo
// não possui backend, então nenhuma persistência real ou falsa é simulada.
// Em produção, addOferta() seria trocado por uma chamada a uma API própria, com
// o servidor aplicando as mesmas validações, RLS na tabela e rate limit por usuário.

import { useState, useCallback } from 'react';

const OFERTAS_SEMENTE = [
  {
    id: 'seed-1',
    cultura: 'Alface Lisa',
    quantidade: 30,
    unidade: 'caixas',
    preco: 45,
    local: 'Zona Rural — Bairro Esperança',
    contatoMascarado: '(31) ****-**12',
    publicadoEm: Date.now() - 1000 * 60 * 60 * 2,
  },
  {
    id: 'seed-2',
    cultura: 'Milho Híbrido',
    quantidade: 8,
    unidade: 'toneladas',
    preco: 1250,
    local: 'Assentamento Boa Vista',
    contatoMascarado: '(31) ****-**47',
    publicadoEm: Date.now() - 1000 * 60 * 60 * 20,
  },
  {
    id: 'seed-3',
    cultura: 'Mandioca',
    quantidade: 15,
    unidade: 'sacas',
    preco: 60,
    local: 'Comunidade Rio Verde',
    contatoMascarado: '',
    publicadoEm: Date.now() - 1000 * 60 * 60 * 30,
  },
];

// Controle simples de frequência de publicação no lado do cliente.
// Serve apenas como cortesia de UX (evita duplo clique/spam acidental);
// a aplicação real da regra deve sempre acontecer no backend.
let ultimaPublicacaoEm = 0;
const INTERVALO_MINIMO_MS = 10000;

export function useOfertas() {
  const [ofertas, setOfertas] = useState(OFERTAS_SEMENTE);

  const adicionarOferta = useCallback((dadosOferta) => {
    const agora = Date.now();
    if (agora - ultimaPublicacaoEm < INTERVALO_MINIMO_MS) {
      return { ok: false, erro: 'Aguarde alguns segundos antes de publicar outra oferta.' };
    }
    ultimaPublicacaoEm = agora;

    const novaOferta = {
      id: (window.crypto && window.crypto.randomUUID) ? window.crypto.randomUUID() : String(agora),
      ...dadosOferta,
      publicadoEm: agora,
    };

    setOfertas((anteriores) => [novaOferta, ...anteriores]);
    return { ok: true };
  }, []);

  return { ofertas, adicionarOferta };
}
