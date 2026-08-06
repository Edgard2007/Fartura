// Roteador do "Simulador de Aplicativo" (mockup do celular): Início, Lavoura,
// Mercado, Finanças e Técnico.
//
// Independente do AbasRouterFartura — são duas áreas de navegação distintas
// na mesma página, cada uma com seu próprio MemoryRouter, então uma nunca
// interfere no histórico da outra.
//
// O HTML de cada tela continua vindo de window.FarturaTelas (o antigo objeto
// `screens` de js/script.js, agora exposto como global só para leitura pelo
// roteador); a rota apenas decide QUAL tela injetar em #app-content, no lugar
// da antiga função navTo().
import { MemoryRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { TELAS_SIMULADOR } from './rotas.js';

const { useEffect } = React;

// Injeta o HTML da tela em #app-content e dispara os mesmos efeitos colaterais
// que o antigo navTo() disparava (atualização dos sliders de Finanças e
// remontagem do componente de Previsão do Tempo na tela Início).
function ativarTela(nomeTela) {
  const itemNav = document.getElementById('nav-' + nomeTela);
  const areaConteudo = document.getElementById('app-content');
  if (!itemNav || !areaConteudo || !window.FarturaTelas) return;

  itemNav.classList.remove('text-gray-500');
  itemNav.classList.add('active');

  areaConteudo.innerHTML = window.FarturaTelas[nomeTela] || '';

  if (nomeTela === 'financas' && typeof window.updateFinanceData === 'function') {
    setTimeout(() => window.updateFinanceData(), 50);
  }

  if (nomeTela === 'inicio' && window.FarturaPrevisao) {
    setTimeout(() => window.FarturaPrevisao.montar('previsao-root'), 0);
  }
}

// Remove o destaque do item de navegação da tela que está deixando de ser
// exibida. O conteúdo em si não precisa ser limpo aqui: a próxima tela ativa
// substitui o innerHTML de #app-content por completo.
function desativarTela(nomeTela) {
  const itemNav = document.getElementById('nav-' + nomeTela);
  if (!itemNav) return;

  itemNav.classList.remove('active');
  itemNav.classList.add('text-gray-500');
}

// Controlador de uma única tela do simulador: sem corpo visual próprio,
// só sincroniza #app-content e a navegação inferior com o ciclo de vida
// da rota correspondente.
function ControladorDeTela({ nome }) {
  useEffect(() => {
    ativarTela(nome);
    return () => desativarTela(nome);
  }, [nome]);

  return null;
}

// Expõe window.FarturaRouterSimulador.irPara(nomeDaTela) para os botões
// estáticos (bottom nav, atalhos de voz e botões dentro das próprias telas)
// trocarem de tela sem recarregar a página e sem expor a rota na URL.
function PonteDeNavegacaoSimulador() {
  const navegar = useNavigate();

  useEffect(() => {
    window.FarturaRouterSimulador = {
      irPara: (nomeTela) => navegar('/' + nomeTela),
    };
  }, [navegar]);

  return null;
}

export default function SimuladorRouterFartura() {
  return (
    <MemoryRouter initialEntries={['/inicio']}>
      <PonteDeNavegacaoSimulador />
      <Routes>
        {TELAS_SIMULADOR.map((nomeTela) => (
          <Route key={nomeTela} path={'/' + nomeTela} element={<ControladorDeTela nome={nomeTela} />} />
        ))}
        <Route path="*" element={<Navigate to="/inicio" replace />} />
      </Routes>
    </MemoryRouter>
  );
}
