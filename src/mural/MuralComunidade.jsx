// Mural da Comunidade
// -------------------
// Nova funcionalidade do Projeto Fartura: um quadro de ofertas onde produtores
// anunciam a colheita disponível e compradores locais (sacolões, cooperativas,
// atacadistas) encontram o que precisam — dando forma concreta ao recurso
// "Canal Direto com Atacadistas Locais" já citado no relatório, que antes só
// existia como uma tela estática de exemplo.
//
// Responsabilidade única por peça:
//   FormularioOferta  -> captura e valida a entrada do usuário
//   CartaoOferta       -> apresenta uma oferta já validada
//   MuralComunidade    -> orquestra estado, filtro e ordenação

import {
  LIMITES,
  sanitizarTexto,
  nomeDeCulturaValido,
  quantidadeValida,
  precoValido,
  localizacaoValida,
  telefoneValido,
  mascararTelefone,
  formatarPreco,
} from './sanitize.js';
import { useOfertas } from './useOfertas.js';
import { IconeEtiqueta, IconeLocal, IconeBusca, IconeMais, IconeTelefone } from './icones.js';
import GraficoPrecos from './GraficoPrecos.jsx';

const { useState, useMemo } = React;

const UNIDADES = ['caixas', 'sacas', 'toneladas', 'quilos', 'unidades'];

function tempoRelativo(timestampMs) {
  const minutos = Math.max(1, Math.round((Date.now() - timestampMs) / 60000));
  if (minutos < 60) return `há ${minutos} min`;
  const horas = Math.round(minutos / 60);
  if (horas < 24) return `há ${horas}h`;
  return `há ${Math.round(horas / 24)}d`;
}

function CartaoOferta({ oferta }) {
  return React.createElement(
    'article',
    { className: 'mural-oferta' },
    React.createElement(
      'header',
      { className: 'mural-oferta__topo' },
      React.createElement('h4', { className: 'mural-oferta__cultura' }, oferta.cultura),
      React.createElement(
        'span',
        { className: 'mural-oferta__preco' },
        React.createElement(IconeEtiqueta, null),
        formatarPreco(oferta.preco)
      )
    ),
    React.createElement(
      'p',
      { className: 'mural-oferta__quantidade' },
      `${oferta.quantidade} ${oferta.unidade}`
    ),
    React.createElement(
      'p',
      { className: 'mural-oferta__local' },
      React.createElement(IconeLocal, null),
      oferta.local
    ),
    React.createElement(
      'footer',
      { className: 'mural-oferta__rodape' },
      oferta.contatoMascarado
        ? React.createElement(
            'span',
            { className: 'mural-oferta__contato', title: 'Número parcialmente oculto por privacidade' },
            React.createElement(IconeTelefone, null),
            oferta.contatoMascarado
          )
        : React.createElement('span', { className: 'mural-oferta__contato mural-oferta__contato--ausente' }, 'Sem contato direto'),
      React.createElement('time', { className: 'mural-oferta__tempo' }, tempoRelativo(oferta.publicadoEm))
    )
  );
}

function FormularioOferta({ aoPublicar, aoFechar }) {
  const [campos, setCampos] = useState({ cultura: '', quantidade: '', unidade: UNIDADES[0], preco: '', local: '', contato: '' });
  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState(null);

  function atualizarCampo(nome, valor, tamanhoMaximo) {
    const valorLimpo = tamanhoMaximo ? sanitizarTexto(valor, tamanhoMaximo) : valor;
    setCampos((anterior) => ({ ...anterior, [nome]: valorLimpo }));
  }

  function validar() {
    const novosErros = {};
    if (!nomeDeCulturaValido(campos.cultura)) novosErros.cultura = 'Informe o nome da cultura (2 a 40 letras).';
    if (!quantidadeValida(campos.quantidade)) novosErros.quantidade = 'Quantidade deve ser um número maior que zero.';
    if (!precoValido(campos.preco)) novosErros.preco = 'Preço deve ser um número maior que zero.';
    if (!localizacaoValida(campos.local)) novosErros.local = 'Informe bairro/comunidade e cidade (2 a 60 caracteres).';
    if (!telefoneValido(campos.contato)) novosErros.contato = 'Use o formato (DDD) 9XXXX-XXXX, ou deixe em branco.';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function aoSubmeter(evento) {
    evento.preventDefault();
    setMensagem(null);
    if (!validar()) return;

    const resultado = aoPublicar({
      cultura: campos.cultura.trim(),
      quantidade: Number(campos.quantidade),
      unidade: campos.unidade,
      preco: Number(campos.preco),
      local: campos.local.trim(),
      contatoMascarado: campos.contato.trim() ? mascararTelefone(campos.contato) : '',
    });

    if (resultado.ok) {
      setMensagem({ tipo: 'sucesso', texto: 'Oferta publicada no mural.' });
      setCampos({ cultura: '', quantidade: '', unidade: UNIDADES[0], preco: '', local: '', contato: '' });
    } else {
      setMensagem({ tipo: 'erro', texto: resultado.erro });
    }
  }

  return React.createElement(
    'form',
    { className: 'mural-formulario', onSubmit: aoSubmeter, noValidate: true },
    mensagem &&
      React.createElement(
        'p',
        { className: `mural-banner mural-banner--${mensagem.tipo}`, role: 'status', 'aria-live': 'polite' },
        mensagem.texto
      ),
    React.createElement(
      'div',
      { className: 'mural-formulario__grade' },
      React.createElement(
        'label',
        { className: 'mural-campo' },
        React.createElement('span', null, 'Cultura'),
        React.createElement('input', {
          type: 'text',
          value: campos.cultura,
          maxLength: LIMITES.cultura,
          placeholder: 'Ex: Alface Lisa',
          onChange: (e) => atualizarCampo('cultura', e.target.value, LIMITES.cultura),
        }),
        erros.cultura && React.createElement('span', { className: 'mural-erro' }, erros.cultura)
      ),
      React.createElement(
        'label',
        { className: 'mural-campo' },
        React.createElement('span', null, 'Quantidade'),
        React.createElement('input', {
          type: 'number',
          min: '1',
          step: '1',
          value: campos.quantidade,
          onChange: (e) => atualizarCampo('quantidade', e.target.value),
        }),
        erros.quantidade && React.createElement('span', { className: 'mural-erro' }, erros.quantidade)
      ),
      React.createElement(
        'label',
        { className: 'mural-campo' },
        React.createElement('span', null, 'Unidade'),
        React.createElement(
          'select',
          { value: campos.unidade, onChange: (e) => atualizarCampo('unidade', e.target.value) },
          UNIDADES.map((u) => React.createElement('option', { key: u, value: u }, u))
        )
      ),
      React.createElement(
        'label',
        { className: 'mural-campo' },
        React.createElement('span', null, 'Preço (R$)'),
        React.createElement('input', {
          type: 'number',
          min: '0.01',
          step: '0.01',
          value: campos.preco,
          onChange: (e) => atualizarCampo('preco', e.target.value),
        }),
        erros.preco && React.createElement('span', { className: 'mural-erro' }, erros.preco)
      ),
      React.createElement(
        'label',
        { className: 'mural-campo mural-campo--largo' },
        React.createElement('span', null, 'Bairro/Comunidade e cidade'),
        React.createElement('input', {
          type: 'text',
          value: campos.local,
          maxLength: LIMITES.local,
          placeholder: 'Ex: Assentamento Boa Vista, Uberlândia',
          onChange: (e) => atualizarCampo('local', e.target.value, LIMITES.local),
        }),
        erros.local && React.createElement('span', { className: 'mural-erro' }, erros.local)
      ),
      React.createElement(
        'label',
        { className: 'mural-campo mural-campo--largo' },
        React.createElement('span', null, 'Contato (opcional)'),
        React.createElement('input', {
          type: 'tel',
          value: campos.contato,
          maxLength: LIMITES.contato,
          placeholder: '(31) 9XXXX-XXXX',
          onChange: (e) => atualizarCampo('contato', e.target.value, LIMITES.contato),
        }),
        React.createElement('small', { className: 'mural-dica' }, 'Exibido publicamente apenas de forma parcial, para sua segurança.'),
        erros.contato && React.createElement('span', { className: 'mural-erro' }, erros.contato)
      )
    ),
    React.createElement(
      'div',
      { className: 'mural-formulario__acoes' },
      React.createElement('button', { type: 'submit', className: 'botao botao--principal' }, 'Publicar oferta'),
      React.createElement('button', { type: 'button', className: 'botao botao--fantasma', onClick: aoFechar }, 'Cancelar')
    )
  );
}

export default function MuralComunidade() {
  const { ofertas, adicionarOferta } = useOfertas();
  const [termoBusca, setTermoBusca] = useState('');
  const [ordenacao, setOrdenacao] = useState('recentes');
  const [formularioAberto, setFormularioAberto] = useState(false);

  const ofertasVisiveis = useMemo(() => {
    const termo = termoBusca.trim().toLowerCase();
    const filtradas = termo
      ? ofertas.filter((o) => o.cultura.toLowerCase().includes(termo) || o.local.toLowerCase().includes(termo))
      : ofertas;

    const copia = [...filtradas];
    if (ordenacao === 'menor-preco') copia.sort((a, b) => a.preco - b.preco);
    else if (ordenacao === 'maior-preco') copia.sort((a, b) => b.preco - a.preco);
    else copia.sort((a, b) => b.publicadoEm - a.publicadoEm);
    return copia;
  }, [ofertas, termoBusca, ordenacao]);

  return React.createElement(
    'div',
    { className: 'mural-comunidade' },
    React.createElement(GraficoPrecos, { ofertas }),
    React.createElement(
      'div',
      { className: 'mural-comunidade__barra' },
      React.createElement(
        'label',
        { className: 'mural-busca' },
        React.createElement(IconeBusca, null),
        React.createElement('input', {
          type: 'search',
          placeholder: 'Buscar por cultura ou local...',
          value: termoBusca,
          maxLength: 40,
          onChange: (e) => setTermoBusca(sanitizarTexto(e.target.value, 40)),
        })
      ),
      React.createElement(
        'select',
        { className: 'mural-ordenacao', value: ordenacao, onChange: (e) => setOrdenacao(e.target.value), 'aria-label': 'Ordenar ofertas' },
        React.createElement('option', { value: 'recentes' }, 'Mais recentes'),
        React.createElement('option', { value: 'menor-preco' }, 'Menor preço'),
        React.createElement('option', { value: 'maior-preco' }, 'Maior preço')
      ),
      !formularioAberto &&
        React.createElement(
          'button',
          { type: 'button', className: 'botao botao--principal', onClick: () => setFormularioAberto(true) },
          React.createElement(IconeMais, null),
          'Publicar oferta'
        )
    ),
    formularioAberto &&
      React.createElement(FormularioOferta, {
        aoPublicar: adicionarOferta,
        aoFechar: () => setFormularioAberto(false),
      }),
    React.createElement(
      'div',
      { className: 'mural-lista', role: 'list' },
      ofertasVisiveis.length === 0
        ? React.createElement('p', { className: 'mural-vazio' }, 'Nenhuma oferta encontrada para essa busca.')
        : ofertasVisiveis.map((oferta) => React.createElement(CartaoOferta, { key: oferta.id, oferta }))
    )
  );
}
