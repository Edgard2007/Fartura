// Roteador das abas da "Central do Relatório" (O Problema / Dados do Campo /
// Personas / Mural / Fale Conosco).
//
// Por que MemoryRouter: o histórico fica só na memória da aba do navegador —
// a barra de endereço nunca muda e o botão "voltar" do navegador não interfere
// na navegação interna do site. É exatamente o comportamento que o antigo
// changeTab() já tinha (nenhuma URL era tocada); agora quem garante isso é o
// próprio react-router-dom, e não mais manipulação manual de classList.
//
// O conteúdo de cada aba continua vivendo como marcação estática em index.html
// (não foi reescrito em JSX): cada <Route> abaixo renderiza apenas um
// controlador "sem corpo visual" que, ao montar/desmontar, aplica no DOM
// existente o mesmo efeito que changeTab() aplicava.
import { MemoryRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ABAS_RELATORIO } from './rotas.js';

const { useEffect } = React;

// Alterna a classe do botão e a visibilidade do bloco de conteúdo da aba
// informada, e dispara os efeitos colaterais que antes ficavam dentro de
// changeTab() (gráfico do IBGE e montagem preguiçosa do Mural).
function ativarAba(nomeAba) {
  const botao = document.getElementById('tab-' + nomeAba);
  const conteudo = document.getElementById('content-' + nomeAba);
  if (!botao || !conteudo) return;

  botao.className = 'aba-fartura aba-fartura--ativa';
  conteudo.classList.remove('hidden');

  if (nomeAba === 'dados' && typeof window.renderIBGEChart === 'function' && !window.ibgeChartInstance) {
    window.renderIBGEChart();
  }

  if (nomeAba === 'mural' && window.FarturaMural) {
    window.FarturaMural.montar('mural-root');
  }
}

// Reverte o botão/conteúdo da aba para o estado inativo (espelha a primeira
// metade do antigo changeTab(), que escondia todas as abas antes de mostrar
// a nova).
function desativarAba(nomeAba) {
  const botao = document.getElementById('tab-' + nomeAba);
  const conteudo = document.getElementById('content-' + nomeAba);
  if (!botao || !conteudo) return;

  botao.className = 'aba-fartura';
  conteudo.classList.add('hidden');
}

// Controlador de uma única aba: não renderiza nada na tela, apenas sincroniza
// o DOM estático com o ciclo de vida da rota (montado = aba ativa).
function ControladorDeAba({ nome }) {
  useEffect(() => {
    ativarAba(nome);
    return () => desativarAba(nome);
  }, [nome]);

  return null;
}

// Expõe window.FarturaRouterAbas.irPara(nomeDaAba) para os botões estáticos
// do index.html trocarem de aba sem recarregar a página e sem gerar entrada
// alguma na URL do navegador.
function PonteDeNavegacaoAbas() {
  const navegar = useNavigate();

  useEffect(() => {
    window.FarturaRouterAbas = {
      irPara: (nomeAba) => navegar('/' + nomeAba),
    };
  }, [navegar]);

  return null;
}

export default function AbasRouterFartura() {
  return (
    <MemoryRouter initialEntries={['/contexto']}>
      <PonteDeNavegacaoAbas />
      <Routes>
        {ABAS_RELATORIO.map((nomeAba) => (
          <Route key={nomeAba} path={'/' + nomeAba} element={<ControladorDeAba nome={nomeAba} />} />
        ))}
        <Route path="*" element={<Navigate to="/contexto" replace />} />
      </Routes>
    </MemoryRouter>
  );
}
