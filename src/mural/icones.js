// Ícones de traço, desenhados como componentes React simples.
// Ficam junto do Mural porque só são usados aqui; os ícones globais do restante
// do site vivem em js/icones.js (usado pelo HTML e pelo script.js estáticos).

function Icone({ children, rotulo }) {
  return React.createElement(
    'svg',
    {
      className: 'icone-linha',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '1.6',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-hidden': rotulo ? undefined : 'true',
      role: rotulo ? 'img' : undefined,
      'aria-label': rotulo,
    },
    children
  );
}

export function IconeEtiqueta(props) {
  return Icone({
    ...props,
    children: [
      React.createElement('path', { key: 1, d: 'M12.5 2.5h6a2 2 0 0 1 2 2v6a2 2 0 0 1-.6 1.4l-8.4 8.4a2 2 0 0 1-2.8 0l-6-6a2 2 0 0 1 0-2.8l8.4-8.4a2 2 0 0 1 1.4-.6Z' }),
      React.createElement('circle', { key: 2, cx: '16.5', cy: '7.5', r: '1.25', fill: 'currentColor', stroke: 'none' }),
    ],
  });
}

export function IconeLocal(props) {
  return Icone({
    ...props,
    children: [
      React.createElement('path', { key: 1, d: 'M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z' }),
      React.createElement('circle', { key: 2, cx: '12', cy: '9.5', r: '2.3' }),
    ],
  });
}

export function IconeBusca(props) {
  return Icone({
    ...props,
    children: [
      React.createElement('circle', { key: 1, cx: '10.5', cy: '10.5', r: '6.5' }),
      React.createElement('path', { key: 2, d: 'M20 20l-4.8-4.8' }),
    ],
  });
}

export function IconeMais(props) {
  return Icone({
    ...props,
    children: [
      React.createElement('path', { key: 1, d: 'M12 5v14M5 12h14' }),
    ],
  });
}

export function IconeTelefone(props) {
  return Icone({
    ...props,
    children: [
      React.createElement('path', {
        key: 1,
        d: 'M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2a1 1 0 0 1 1-.25 8.5 8.5 0 0 0 2.7.43 1 1 0 0 1 1 1V19a1 1 0 0 1-1 1A15 15 0 0 1 4 6a1 1 0 0 1 1-1h2.9a1 1 0 0 1 1 1 8.5 8.5 0 0 0 .43 2.7 1 1 0 0 1-.25 1Z',
      }),
    ],
  });
}
