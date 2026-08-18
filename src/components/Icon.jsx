const paths = {
  folha: <><path d="M4 20C4 11 10 4 20 4 20 13 13 20 4 20Z"/><path d="M4 20 12 12"/></>,
  casa: <><path d="M4 11 12 4l8 7"/><path d="M6 10v9a1 1 0 0 0 1 1h3v-5h4v5h3a1 1 0 0 0 1-1v-9"/></>,
  calendario: <><rect x="4" y="5.5" width="16" height="15" rx="2"/><path d="M8 3.5v4M16 3.5v4M4 10h16"/></>,
  carrinho: <><circle cx="9.5" cy="20" r="1.3" fill="currentColor" stroke="none"/><circle cx="17.5" cy="20" r="1.3" fill="currentColor" stroke="none"/><path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6"/></>,
  carteira: <><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H19a1 1 0 0 1 1 1v13H6.5A2.5 2.5 0 0 1 4 16.5Z"/><path d="M4 8h13a2 2 0 0 1 2 2v2h-4a2 2 0 0 0 0 4h4"/><circle cx="15" cy="14" r=".7" fill="currentColor" stroke="none"/></>,
  chat: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-5.5 4v-4.3A2.5 2.5 0 0 1 4 12.5Z"/></>,
  microfone: <><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/></>,
  broto: <><path d="M12 20V10"/><path d="M12 14C8 14 5 11.5 5 8c4.5 0 7 2.5 7 6Z"/><path d="M12 11c0-4 2.8-6 7-6 0 4.5-2.7 7-7 7Z"/></>,
  seta: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  tendencia: <><path d="M4 17l5-5 4 3 7-8"/><path d="M15 7h5v5"/></>,
  usuarios: <><circle cx="9" cy="8" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 15.5a4.5 4.5 0 0 1 5 3.5"/></>,
  loja: <><path d="M4 10h16l-1-5H5Z"/><path d="M5 10v9h14v-9"/><path d="M9 19v-5h6v5"/></>,
  celular: <><rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M10 5h4M11 18.5h2"/></>,
  correio: <><rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="m4.5 7 7.5 6 7.5-6"/></>,
  alerta: <><path d="M12 4 21 20H3Z"/><path d="M12 9v5M12 17h.01"/></>,
  engrenagem: <><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.2-1.6l2-1.5-2-3.4-2.3 1a7 7 0 0 0-2.7-1.6L13.5 2h-3l-.4 2.9a7 7 0 0 0-2.7 1.6l-2.3-1-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .6.1 1.1.2 1.6l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 2.7 1.6l.4 2.9h3l.4-2.9a7 7 0 0 0 2.7-1.6l2.3 1 2-3.4-2-1.5c.1-.5.2-1 .2-1.6Z"/></>,
  ondaVoz: <><path d="M4 9v6M8 6v12M12 3v18M16 6v12M20 9v6"/></>,
  apertoMao: <><path d="m4 12 4-4 4 3 3-3 5 4-4 5h-4l-3-3-3 3-4-4Z"/></>,
  gota: <><path d="M12 3s6 6.3 6 11a6 6 0 0 1-12 0c0-4.7 6-11 6-11Z"/></>,
  inseto: <><circle cx="12" cy="13" r="5"/><path d="M12 8V4M8 10 5 7M16 10l3-3M7 14H3M17 14h4M8 17l-3 3M16 17l3 3"/></>,
  trator: <><path d="M4 16h13l2-6h-5l-1-4H8v10"/><circle cx="8" cy="18" r="2.5"/><circle cx="17" cy="18" r="2"/></>,
  telefone: <><path d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2a1 1 0 0 1 1-.25 8.5 8.5 0 0 0 2.7.43 1 1 0 0 1 1 1V19a1 1 0 0 1-1 1A15 15 0 0 1 4 6a1 1 0 0 1 1-1h2.9a1 1 0 0 1 1 1 8.5 8.5 0 0 0 .43 2.7 1 1 0 0 1-.25 1Z"/></>,
  moeda: <><circle cx="12" cy="12" r="8"/><path d="M15 9.5c-.6-1-1.5-1.5-3-1.5-1.7 0-3 .8-3 2s1.3 2 3 2 3 .8 3 2-1.3 2-3 2c-1.5 0-2.4-.5-3-1.5M12 6v12"/></>,
  camera: <><path d="M4 8h4l1.5-2h5L16 8h4v10H4Z"/><circle cx="12" cy="13" r="3"/></>,
  checagemDupla: <><path d="m4 12 3 3 6-7M10 15l2 2 7-8"/></>,
  bateria: <><rect x="3" y="7" width="17" height="10" rx="2"/><path d="M21 10v4"/><path d="M6 10h8v4H6Z" fill="currentColor" stroke="none"/></>,
  nuvemSync: <><path d="M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 9a4.5 4.5 0 0 0 1 9Z"/><path d="M8 14h5M11 12l2 2-2 2"/></>,
  checagem: <><path d="m5 12 4 4 10-10"/></>,
};

export default function Icon({ name, className = '', ...props }) {
  return <svg className={`icone-linha ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.folha}</svg>;
}
