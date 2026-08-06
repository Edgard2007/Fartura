// Previsão do Tempo — 7 dias
// --------------------------
// Segunda nova funcionalidade em React do Projeto Fartura. Troca o cartão estático
// "28°C, clima favorável" da tela Início por uma previsão real de 7 dias, com dia
// selecionável e destaque de quais dias são bons para colheita — informação direta
// para o planejamento de trabalho do produtor (persona João, na aba Personas).
//
// Usa a biblioteca npm "date-fns" para formatação e aritmética de datas em pt-BR,
// em vez de manipular strings de data manualmente.

import { addDays, format, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { gerarPrevisao } from './dadosSimulados.js';

const { useState, useMemo } = React;

const ROTULO_CONDICAO = {
  sol: 'Sol',
  'parcialmente-nublado': 'Parc. nublado',
  'chuva-leve': 'Chuva leve',
};

function IconeCondicao({ condicao }) {
  const caminhos = {
    sol: React.createElement('g', null,
      React.createElement('circle', { cx: '12', cy: '13', r: '4.2' }),
      React.createElement('path', { d: 'M12 4.5v2M4.5 13h2M19.5 13h2M6.5 7l1.4 1.4M17.5 7l-1.4 1.4' })
    ),
    'parcialmente-nublado': React.createElement('g', null,
      React.createElement('circle', { cx: '9.5', cy: '11', r: '3.3' }),
      React.createElement('path', { d: 'M9.5 5.5v1.6M5 11H3.5M13.5 6.6l-1.1 1.1' }),
      React.createElement('path', { d: 'M9 18.5a4 4 0 0 1 .3-8 5.2 5.2 0 0 1 10 1.6A3.5 3.5 0 0 1 19 18.5Z' })
    ),
    'chuva-leve': React.createElement('g', null,
      React.createElement('path', { d: 'M7 15.5a4 4 0 0 1 .3-8 5.2 5.2 0 0 1 10 1.6A3.5 3.5 0 0 1 17 15.5Z' }),
      React.createElement('path', { d: 'M9 18.5v2M12.5 18.5v2M16 18.5v2' })
    ),
  };
  return React.createElement(
    'svg',
    {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '1.6',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      className: 'icone-linha',
      style: { width: '1.6rem', height: '1.6rem' },
      'aria-hidden': 'true',
    },
    caminhos[condicao]
  );
}

export default function PrevisaoTempo() {
  const previsao = useMemo(() => gerarPrevisao(new Date(), 7), []);
  const [diaSelecionadoIndice, setDiaSelecionadoIndice] = useState(0);
  const diaSelecionado = previsao[diaSelecionadoIndice];
  const dataSelecionada = addDays(new Date(), diaSelecionado.offsetDias);

  return React.createElement(
    'div',
    { className: 'card-previsao' },
    React.createElement(
      'div',
      { className: 'card-previsao__resumo' },
      React.createElement(IconeCondicao, { condicao: diaSelecionado.condicao }),
      React.createElement(
        'div',
        null,
        React.createElement('h3', { className: 'card-previsao__temperatura' }, `${diaSelecionado.maxima}°C`),
        React.createElement(
          'p',
          { className: 'card-previsao__legenda' },
          isToday(dataSelecionada) ? 'Hoje' : format(dataSelecionada, "EEEE, d 'de' MMMM", { locale: ptBR }),
          ' — ',
          diaSelecionado.favoravelColheita ? 'favorável para colheita' : 'evite colheita, solo úmido'
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'card-previsao__dias', role: 'list' },
      previsao.map((dia, indice) => {
        const data = addDays(new Date(), dia.offsetDias);
        const selecionado = indice === diaSelecionadoIndice;
        return React.createElement(
          'button',
          {
            key: dia.offsetDias,
            type: 'button',
            role: 'listitem',
            className: `card-previsao__dia${selecionado ? ' card-previsao__dia--ativo' : ''}`,
            onClick: () => setDiaSelecionadoIndice(indice),
            'aria-pressed': selecionado,
            'aria-label': `${format(data, 'EEEE', { locale: ptBR })}, ${ROTULO_CONDICAO[dia.condicao]}, mínima ${dia.minima} graus, máxima ${dia.maxima} graus`,
          },
          React.createElement('span', { className: 'card-previsao__dia-rotulo' }, isToday(data) ? 'Hoje' : format(data, 'EEEEEE', { locale: ptBR })),
          React.createElement(IconeCondicao, { condicao: dia.condicao }),
          React.createElement('span', { className: 'card-previsao__dia-temp' }, `${dia.maxima}°`),
          !dia.favoravelColheita && React.createElement('span', { className: 'card-previsao__dia-marca', title: 'Não recomendado para colheita' })
        );
      })
    )
  );
}
