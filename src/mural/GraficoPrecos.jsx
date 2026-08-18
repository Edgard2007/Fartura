// Painel de Tendência de Preços — terceira funcionalidade em React do projeto.
// Agrega as ofertas atuais do Mural por cultura e mostra o preço médio em um
// gráfico de barras, usando a biblioteca npm "recharts" (não incluída no CDN
// do site — precisa ser compilada, diferente de React/ReactDOM).
//
// Fica dentro do próprio Mural porque depende diretamente do estado de ofertas
// já carregado ali; não faz sentido como painel isolado sem esses dados.

import React, { useMemo } from 'react';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';

const CORES_BARRA = ['#B5651D', '#43602C', '#285360', '#A87418', '#7E4310', '#4C8598'];

function agruparPorCultura(ofertas) {
  const somaPorCultura = new Map();
  ofertas.forEach((oferta) => {
    const atual = somaPorCultura.get(oferta.cultura) || { total: 0, quantidade: 0 };
    somaPorCultura.set(oferta.cultura, {
      total: atual.total + oferta.preco,
      quantidade: atual.quantidade + 1,
    });
  });
  return Array.from(somaPorCultura.entries())
    .map(([cultura, { total, quantidade }]) => ({
      cultura,
      precoMedio: Math.round((total / quantidade) * 100) / 100,
    }))
    .sort((a, b) => b.precoMedio - a.precoMedio)
    .slice(0, 6);
}

function TooltipPersonalizado({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0].payload;
  return React.createElement(
    'div',
    { className: 'mural-tooltip' },
    React.createElement('strong', null, item.cultura),
    React.createElement('span', null, `R$ ${item.precoMedio.toFixed(2)} em média`)
  );
}

export default function GraficoPrecos({ ofertas }) {
  const dados = useMemo(() => agruparPorCultura(ofertas), [ofertas]);

  if (dados.length === 0) return null;

  return React.createElement(
    'section',
    { className: 'mural-grafico', 'aria-label': 'Preço médio por cultura publicada no mural' },
    React.createElement('h4', { className: 'mural-grafico__titulo' }, 'Preço médio por cultura'),
    React.createElement(
      ResponsiveContainer,
      { width: '100%', height: 190 },
      React.createElement(
        BarChart,
        { data: dados, layout: 'vertical', margin: { top: 4, right: 16, bottom: 4, left: 4 } },
        React.createElement(CartesianGrid, { horizontal: false, stroke: 'rgba(51,36,26,0.12)' }),
        React.createElement(XAxis, { type: 'number', tick: { fontSize: 11, fill: '#5B4A38' }, axisLine: false, tickLine: false }),
        React.createElement(YAxis, {
          type: 'category',
          dataKey: 'cultura',
          width: 92,
          tick: { fontSize: 11, fill: '#26190F' },
          axisLine: false,
          tickLine: false,
        }),
        React.createElement(Tooltip, { content: React.createElement(TooltipPersonalizado), cursor: { fill: 'rgba(181,101,29,0.08)' } }),
        React.createElement(
          Bar,
          { dataKey: 'precoMedio', radius: [0, 6, 6, 0], maxBarSize: 22 },
          dados.map((_, indice) => React.createElement(Cell, { key: indice, fill: CORES_BARRA[indice % CORES_BARRA.length] }))
        )
      )
    )
  );
}
