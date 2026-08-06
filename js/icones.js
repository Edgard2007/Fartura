// Conjunto de ícones de traço (line icons) desenhado para o Projeto Fartura.
// Motivo de existir: identidade visual própria não usa emoji como ícone funcional
// (renderização inconsistente entre sistemas, sem controle de cor/peso, e
// característica de protótipo genérico). Cada função devolve uma string SVG
// autocontida, sem requisição de rede, coerente com a proposta do app de
// funcionar offline / em conexão intermitente.

function svg(miolo, rotulo) {
  const aria = rotulo ? `role="img" aria-label="${rotulo}"` : 'aria-hidden="true"';
  return `<svg class="icone-linha" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ${aria}>${miolo}</svg>`;
}

const ICONES = {
  folha: () => svg('<path d="M4 20C4 11 10 4 20 4 20 13 13 20 4 20Z"/><path d="M4 20 12 12"/>', 'Fartura'),
  casa: () => svg('<path d="M4 11 12 4l8 7"/><path d="M6 10v9a1 1 0 0 0 1 1h3v-5h4v5h3a1 1 0 0 0 1-1v-9"/>'),
  calendario: () => svg('<rect x="4" y="5.5" width="16" height="15" rx="2"/><path d="M8 3.5v4M16 3.5v4M4 10h16"/>'),
  carrinho: () => svg('<circle cx="9.5" cy="20" r="1.3" fill="currentColor" stroke="none"/><circle cx="17.5" cy="20" r="1.3" fill="currentColor" stroke="none"/><path d="M3.5 4h2.2l1.9 11.2a1.5 1.5 0 0 0 1.5 1.3h8a1.5 1.5 0 0 0 1.5-1.2L20.5 8H7"/>'),
  carteira: () => svg('<rect x="3.5" y="6.5" width="17" height="12" rx="2"/><path d="M3.5 10.5h17"/><circle cx="16.5" cy="14.5" r="1" fill="currentColor" stroke="none"/>'),
  chat: () => svg('<path d="M4 5.5h16v10.5H9l-4 3.5v-3.5H4Z"/>'),
  nuvemSync: () => svg('<path d="M7 17.5a4 4 0 0 1 .3-8 5.2 5.2 0 0 1 10 1.6A3.5 3.5 0 0 1 17 17.5Z"/><path d="M10.5 12.5 12 11l1.5 1.5M12 11v5"/>'),
  bateria: () => svg('<rect x="2.5" y="8.5" width="16" height="7" rx="1.5"/><path d="M21 11v2"/><rect x="4.3" y="10.2" width="10.5" height="3.6" fill="currentColor" stroke="none"/>'),
  microfone: () => svg('<rect x="9.5" y="3.5" width="5" height="10" rx="2.5"/><path d="M6.5 11a5.5 5.5 0 0 0 11 0M12 16.5v3.5M9 20h6"/>'),
  alerta: () => svg('<path d="M12 4 2.5 20h19Z"/><path d="M12 10v4.5"/><circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none"/>'),
  tendencia: () => svg('<path d="M4 16 10 10l4 4 6-7"/><path d="M15 7h5v5"/>'),
  broto: () => svg('<path d="M12 21V11"/><path d="M12 11C12 6 8 4 4 4c0 4.5 3 7 8 7Z"/><path d="M12 11c0-3.5 2.6-5.5 6-5.5 0 3.7-2.4 5.9-6 5.9Z"/>'),
  gota: () => svg('<path d="M12 3.5C9 8 6 11.3 6 14.5A6 6 0 0 0 18 14.5C18 11.3 15 8 12 3.5Z"/>'),
  inseto: () => svg('<ellipse cx="12" cy="13.5" rx="4" ry="6"/><path d="M12 7.5V4M8.5 9l-3-2.5M15.5 9l3-2.5M8 17l-3 2.5M16 17l3 2.5"/>'),
  trator: () => svg('<circle cx="7" cy="17.5" r="2.5"/><circle cx="17" cy="17.5" r="3.2"/><path d="M4.5 17.5V11h6l3 3h3.5"/><path d="M10.5 11V7h4"/>'),
  apertoMao: () => svg('<path d="M2.5 12.5 6 9l4 2.5"/><path d="M21.5 12.5 18 9l-4 2.5"/><path d="M6 9l5 4.5a1.4 1.4 0 0 0 2-2L9.5 8"/><path d="M18 9l-5 4.5a1.4 1.4 0 0 1-2-2L14.5 8"/>'),
  telefone: () => svg('<path d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2a1 1 0 0 1 1-.25 8.5 8.5 0 0 0 2.7.43 1 1 0 0 1 1 1V19a1 1 0 0 1-1 1A15 15 0 0 1 4 6a1 1 0 0 1 1-1h2.9a1 1 0 0 1 1 1 8.5 8.5 0 0 0 .43 2.7 1 1 0 0 1-.25 1Z"/>'),
  camera: () => svg('<path d="M4 8.5h3l1.5-2h7l1.5 2h3v10.5H4Z"/><circle cx="12" cy="13.5" r="3.3"/>'),
  ajuda: () => svg('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.3a2.5 2.5 0 1 1 3.7 2.2c-.9.5-1.2 1-1.2 2"/><circle cx="12" cy="16.7" r="0.9" fill="currentColor" stroke="none"/>'),
  moeda: () => svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 7v10M9.5 9.3h3.2a1.8 1.8 0 0 1 0 3.6H10.8a1.8 1.8 0 0 0 0 3.6H14"/>'),
  loja: () => svg('<path d="M4 9.5 5.5 4h13L20 9.5"/><path d="M4 9.5h16v10H4Z"/><path d="M9 19v-5h6v5"/>'),
  checagem: () => svg('<circle cx="12" cy="12" r="9"/><path d="M7.5 12.5l3 3 6-6.5"/>'),
  checagemDupla: () => svg('<path d="M2.5 12.5 6 16l6-7"/><path d="M9 12.5l3.5 3.5L20 8"/>'),
  engrenagem: () => svg('<circle cx="12" cy="12" r="3"/><path d="M12 3.5v2M12 18.5v2M20.5 12h-2M5.5 12h-2M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4M17.7 17.7l-1.4-1.4M7.7 7.7 6.3 6.3"/>'),
  ondaVoz: () => svg('<path d="M3 12h2.5M18.5 12H21M6.5 8v8M10 5v14M13.5 8v8M17 5.5v13"/>'),
  seta: () => svg('<path d="M4 12h15.5"/><path d="M14 6.5 19.5 12 14 17.5"/>'),
  sol: () => svg('<circle cx="12" cy="13" r="4.2"/><path d="M12 4.5v2M4.5 13h2M19.5 13h2M6.5 7l1.4 1.4M17.5 7l-1.4 1.4"/><path d="M8.5 19.5a5.5 5.5 0 0 1 9-3.2"/>'),
};

// Preenche todo elemento estático marcado com data-icone="nome" assim que o
// DOM estiver pronto. Mantém o HTML livre de SVG repetido e a fonte da
// verdade dos ícones em um único lugar.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-icone]').forEach((elemento) => {
    const nome = elemento.getAttribute('data-icone');
    if (ICONES[nome]) elemento.innerHTML = ICONES[nome]();
  });
});
