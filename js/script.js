// ===== JAVASCRIPT =====

// --- 1. Report Context Tabs Logic ---
function changeTab(tabName) {
    ['contexto', 'dados', 'personas', 'contato'].forEach(t => {
        document.getElementById('tab-' + t).className = "px-4 py-2 font-bold rounded-t-lg text-gray-500 hover:bg-gray-50 transition-colors text-sm";
        document.getElementById('content-' + t).classList.add('hidden');
    });

    document.getElementById('tab-' + tabName).className = "px-4 py-2 font-bold rounded-t-lg bg-green-50 text-green-700 border-b-2 border-green-600 transition-colors text-sm";
    document.getElementById('content-' + tabName).classList.remove('hidden');

    if (tabName === 'dados' && !window.ibgeChartInstance) {
        renderIBGEChart();
    }
}

// --- 2. Chart.js Implementation for Context Tab ---
function renderIBGEChart() {
    const ctx = document.getElementById('ibgeChart').getContext('2d');
    window.ibgeChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Agricultura Familiar (77%)', 'Grande Escala / Outros (23%)'],
            datasets: [{
                data: [77, 23],
                backgroundColor: ['#16a34a', '#e2e8f0'],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { font: { family: 'Inter', size: 11, weight: '600' } }
                }
            },
            cutout: '70%'
        }
    });
}

// --- 3. Strict Form Validation (Fale Conosco) ---
function validarNome(nome) {
    const partes = nome.trim().split(/\s+/);
    if (partes.length < 2) return false;
    return partes.every(p => p.length >= 2 && /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(p));
}

function validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validarNomeRealtime() {
    const val = document.getElementById('fc-nome').value;
    const err = document.getElementById('err-nome');
    if (val.trim().length === 0) {
        err.innerText = "";
        err.classList.add('hidden');
    } else if (!validarNome(val)) {
        err.innerText = "Insira nome e pelo menos um sobrenome (mínimo de 2 letras cada, sem números).";
        err.classList.remove('hidden');
    } else {
        err.classList.add('hidden');
    }
}

function validarEmailRealtime() {
    const val = document.getElementById('fc-email').value;
    const err = document.getElementById('err-email');
    if (val.trim().length === 0) {
        err.innerText = "";
        err.classList.add('hidden');
    } else if (!validarEmail(val)) {
        err.innerText = "Formato de e-mail inválido (exemplo@dominio.com).";
        err.classList.remove('hidden');
    } else {
        err.classList.add('hidden');
    }
}

function validarMensagemRealtime() {
    const val = document.getElementById('fc-mensagem').value;
    const err = document.getElementById('err-mensagem');
    document.getElementById('char-count').innerText = val.length;
    
    if (val.trim().length > 0) {
        err.classList.add('hidden');
    }
}

function validarFormulario(event) {
    event.preventDefault();
    const nomeVal = document.getElementById('fc-nome').value;
    const emailVal = document.getElementById('fc-email').value;
    const mensVal = document.getElementById('fc-mensagem').value;

    let isOk = true;

    const errNome = document.getElementById('err-nome');
    if (!validarNome(nomeVal)) {
        errNome.innerText = "Nome inválido. Deve possuir nome e sobrenome (mín. de 2 letras cada).";
        errNome.classList.remove('hidden');
        isOk = false;
    } else {
        errNome.classList.add('hidden');
    }

    const errEmail = document.getElementById('err-email');
    if (!validarEmail(emailVal)) {
        errEmail.innerText = "Insira um endereço de e-mail correto.";
        errEmail.classList.remove('hidden');
        isOk = false;
    } else {
        errEmail.classList.add('hidden');
    }

    const errMens = document.getElementById('err-mensagem');
    if (mensVal.trim().length === 0) {
        errMens.innerText = "A mensagem é obrigatória.";
        errMens.classList.remove('hidden');
        isOk = false;
    } else if (mensVal.length > 500) {
        errMens.innerText = "Máximo de 500 caracteres excedido.";
        errMens.classList.remove('hidden');
        isOk = false;
    } else {
        errMens.classList.add('hidden');
    }

    if (isOk) {
        document.getElementById('fc-success').classList.remove('hidden');
        document.getElementById('fale-conosco-form').reset();
        document.getElementById('char-count').innerText = "0";
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            document.getElementById('fc-success').classList.add('hidden');
        }, 4000);
    }
}

// --- 4. Interactive Voice Assistant Overlay ---
function toggleVoiceModal() {
    const modal = document.getElementById('voice-modal');
    modal.classList.toggle('hidden');
}

function enviarComandoVoz(comando) {
    toggleVoiceModal();
    if (comando === 'carteira') {
        navTo('financas');
    } else if (comando === 'plantio') {
        navTo('calendario');
    } else if (comando === 'falar_ana') {
        navTo('tecnico');
    }
}

// --- 5. Mobile Layout Views (Simulated screens) ---
const screens = {
    inicio: `
        <div class="fade-in pb-8">
            <div class="bg-green-700 pt-4 pb-6 px-4 rounded-b-[30px] shadow-sm flex justify-between items-center text-white">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">👨🏽‍🌾</div>
                    <div>
                        <h2 class="text-lg font-bold">Bom dia, João!</h2>
                        <p class="text-xs opacity-80">Sítio Esperança</p>
                    </div>
                </div>
                <button class="text-xl bg-green-600/50 p-2 rounded-full" onclick="alert('Abrindo configurações da conta do produtor.')">⚙️</button>
            </div>
            
            <div class="px-4 -mt-4">
                <div class="bg-white rounded-2xl shadow-md p-4 flex items-center justify-between border border-gray-100">
                    <div class="text-5xl">🌤️</div>
                    <div>
                        <h3 class="text-3xl font-extrabold text-gray-800">28°C</h3>
                        <p class="text-xs font-bold text-gray-500">Clima favorável para colheita hoje.</p>
                    </div>
                </div>
            </div>

            <div class="mx-4 mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-2xl shadow-sm text-center">
                <p class="text-xs uppercase font-bold tracking-wider mb-2">Comando de Voz Ativado</p>
                <p class="text-sm font-semibold mb-3">Tem dificuldade para ler? Fale com o Fartura!</p>
                <button onclick="toggleVoiceModal()" class="mx-auto bg-white text-green-700 font-extrabold px-6 py-3 rounded-full flex items-center gap-2 text-sm shadow-md transition transform active:scale-95">
                    <span class="text-lg">🎤</span> Falar um Comando
                </button>
            </div>

            <div class="px-4 mt-6 space-y-3">
                <button onclick="navTo('calendario')" class="w-full bg-white border border-gray-200 text-gray-800 text-base font-bold py-4 rounded-xl shadow-sm flex items-center justify-between px-4 transition transform active:scale-95">
                    <span class="flex items-center gap-2">🌽 Ver Lavouras</span>
                    <span>➔</span>
                </button>
                <button onclick="navTo('mercado')" class="w-full bg-white border border-gray-200 text-gray-800 text-base font-bold py-4 rounded-xl shadow-sm flex items-center justify-between px-4 transition transform active:scale-95">
                    <span class="flex items-center gap-2">🛒 Vender Produtos</span>
                    <span>➔</span>
                </button>
            </div>
        </div>
    `,
    calendario: `
        <div class="fade-in pb-8">
            <div class="p-4 bg-white shadow-sm flex items-center justify-between sticky top-0 z-10">
                <h2 class="text-xl font-bold text-gray-800">Minha Lavoura</h2>
                <button class="text-lg bg-gray-100 p-2 rounded-full" onclick="alert('Tocando áudio de instruções da página.')">🔊 Ler Tela</button>
            </div>

            <div class="p-4 space-y-4">
                <div class="bg-white border-2 border-green-500 rounded-2xl p-4 shadow-sm">
                    <div class="flex items-center gap-4 mb-3">
                        <div class="text-4xl">🌽</div>
                        <div>
                            <h3 class="text-lg font-bold text-gray-800">Milho Híbrido</h3>
                            <p class="text-xs font-bold text-green-700">Restam 15 dias para a colheita prevista</p>
                        </div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3 mb-4">
                        <div class="bg-green-500 h-3 rounded-full w-[80%]"></div>
                    </div>
                    <div class="flex justify-between gap-2 border-t pt-3 border-gray-100">
                        <button onclick="alert('Tarefa agendada: Irrigar amanhã de manhã.')" class="flex-1 bg-blue-50 text-blue-700 py-2 rounded-xl font-bold text-xs flex flex-col items-center">
                            <span class="text-lg">💧</span> Irrigar
                        </button>
                        <button onclick="navTo('tecnico')" class="flex-1 bg-red-50 text-red-700 py-2 rounded-xl font-bold text-xs flex flex-col items-center">
                            <span class="text-lg">🐛</span> Alerta Praga
                        </button>
                    </div>
                </div>

                <div class="bg-white border-2 border-amber-400 rounded-2xl p-4 shadow-sm bg-amber-50">
                    <div class="flex items-center gap-4 mb-3">
                        <div class="text-4xl">🥬</div>
                        <div>
                            <h3 class="text-lg font-bold text-gray-800">Alface Lisa</h3>
                            <p class="text-xs font-black text-amber-700 animate-pulse">Pronto para comercialização!</p>
                        </div>
                    </div>
                    <button onclick="navTo('mercado')" class="w-full bg-amber-400 text-amber-950 font-black py-3 rounded-xl flex items-center justify-center gap-2 text-sm">
                        🚜 Oferecer no Mercado Direto
                    </button>
                </div>
            </div>
        </div>
    `,
    mercado: `
        <div class="fade-in pb-8">
            <div class="p-4 bg-white shadow-sm sticky top-0 z-10">
                <h2 class="text-xl font-bold text-gray-800 mb-3">Mercado de Vendas</h2>
                <div class="flex bg-gray-100 p-1 rounded-xl text-xs font-bold">
                    <button class="flex-1 py-2 bg-white shadow-sm rounded-lg text-green-700">Ofertas Próximas</button>
                    <button class="flex-1 py-2 text-gray-500" onclick="alert('Navegando para cadastro de produtos novos.')">Anunciar Safra</button>
                </div>
            </div>

            <div class="p-4 space-y-4">
                <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h4 class="font-bold text-base text-gray-800">Sacolão do Bairro</h4>
                            <p class="text-xs text-gray-400">Distância: 8.5 km</p>
                        </div>
                        <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-lg font-bold">Verificado</span>
                    </div>
                    
                    <div class="bg-green-50 p-3 rounded-xl mb-3 flex justify-between items-center text-sm">
                        <span class="font-bold text-gray-700 flex items-center gap-2">🥬 Caixa de Alface</span>
                        <span class="text-lg font-black text-green-700">R$ 45,00</span>
                    </div>

                    <div class="flex gap-2">
                        <button onclick="alert('Proposta de entrega enviada ao Sacolão! Entraremos em contato.')" class="flex-1 bg-green-600 text-white font-bold py-2 rounded-xl text-xs flex justify-center items-center gap-1">🤝 Fechar Venda</button>
                        <a href="tel:0800000000" class="bg-blue-100 text-blue-700 px-4 rounded-xl flex items-center justify-center">📞</a>
                    </div>
                </div>
            </div>
        </div>
    `,
    financas: `
        <div class="fade-in pb-8">
            <div class="p-4 bg-white shadow-sm flex items-center justify-between sticky top-0 z-10">
                <h2 class="text-xl font-bold text-gray-800">Simulador Financeiro</h2>
                <button class="text-sm bg-gray-100 px-3 py-1 rounded-full font-bold text-gray-600" onclick="alert('Simulador dinâmico de produtividade para estimativa de colheitas.')">Ajuda</button>
            </div>

            <div class="p-4 space-y-4">
                
                <div class="bg-white p-4 rounded-2xl border border-gray-200 space-y-4">
                    <h3 class="text-xs font-bold uppercase tracking-wider text-gray-500">Ajuste os parâmetros da colheita:</h3>
                    
                    <div>
                        <label class="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                            <span>Tamanho da Área (Hectares):</span>
                            <span class="font-bold text-green-700"><span id="val-area">2</span> ha</span>
                        </label>
                        <input type="range" id="slider-area" min="1" max="10" value="2" oninput="updateFinanceData()" class="w-full accent-green-600 h-2 bg-gray-200 rounded-lg cursor-pointer">
                    </div>

                    <div>
                        <label class="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                            <span>Custo Estimado / Hectare:</span>
                            <span class="font-bold text-red-600">R$ <span id="val-custo">400</span></span>
                        </label>
                        <input type="range" id="slider-custo" min="100" max="1000" step="50" value="400" oninput="updateFinanceData()" class="w-full accent-red-600 h-2 bg-gray-200 rounded-lg cursor-pointer">
                    </div>

                    <div>
                        <label class="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                            <span>Venda Estimada / Hectare:</span>
                            <span class="font-bold text-blue-600">R$ <span id="val-venda">1250</span></span>
                        </label>
                        <input type="range" id="slider-venda" min="500" max="3000" step="100" value="1250" oninput="updateFinanceData()" class="w-full accent-blue-600 h-2 bg-gray-200 rounded-lg cursor-pointer">
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-2 text-center">
                    <div class="bg-red-50 p-3 rounded-xl border border-red-200">
                        <p class="text-[10px] uppercase font-bold text-red-500">Gasto Total</p>
                        <p class="text-base font-black text-red-700">R$ <span id="disp-gasto">800,00</span></p>
                    </div>
                    <div class="bg-green-50 p-3 rounded-xl border border-green-200">
                        <p class="text-[10px] uppercase font-bold text-green-500">Receita Total</p>
                        <p class="text-base font-black text-green-700">R$ <span id="disp-receita">2.500,00</span></p>
                    </div>
                </div>

                <div class="bg-emerald-600 text-white p-4 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                        <p class="text-xs font-bold opacity-80">Lucro Estimado Sobrando</p>
                        <p class="text-2xl font-black">R$ <span id="disp-lucro">1.700,00</span></p>
                    </div>
                    <span class="text-4xl">💰</span>
                </div>

                <div class="bg-white p-3 rounded-xl border border-gray-100">
                    <div class="chart-container" style="height: 160px;">
                        <canvas id="financeChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `,
    tecnico: `
        <div class="fade-in h-full flex flex-col">
            <div class="bg-white p-3 shadow-sm sticky top-0 z-10 flex items-center gap-3">
                <div class="w-11 h-11 bg-green-100 rounded-full flex items-center justify-center text-xl relative">
                    👩‍🔬
                    <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div>
                    <h2 class="text-sm font-bold text-gray-800 leading-tight">Agrônoma Ana Paula</h2>
                    <p class="text-[10px] text-green-600 font-bold">EMATER Local - Online</p>
                </div>
            </div>

            <div class="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col justify-end" style="min-height: 380px;">
                
                <div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] border border-gray-100 self-start">
                    <p class="text-xs text-gray-800">Bom dia, João! Como está o combate às lagartas no plantio de milho híbrido?</p>
                    <span class="text-[9px] text-gray-400 mt-1 block">09:30</span>
                </div>

                <div class="bg-green-100 p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] border border-green-200 self-end">
                    <p class="text-xs text-green-900">Bom dia dona Ana, o remédio que você receitou funcionou muito bem. Obrigado!</p>
                    <span class="text-[9px] text-green-700 mt-1 flex justify-end items-center gap-1">09:35 <span class="text-blue-500">✓✓</span></span>
                </div>
            </div>

            <div class="bg-gray-100 p-3 border-t border-gray-200 flex items-center gap-2 mt-auto">
                <button class="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-base flex-shrink-0" onclick="alert('Abrindo Câmera para registrar praga.')">📷</button>
                <div class="flex-1 bg-white h-10 rounded-full border border-gray-300 px-3 flex items-center">
                    <span class="text-gray-400 text-xs">Mensagem...</span>
                </div>
                <button onclick="toggleVoiceModal()" class="bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg flex-shrink-0 transition transform active:scale-95">🎤</button>
            </div>
        </div>
    `
};

// --- 6. Navigation with Automatic State Refresh ---
function navTo(screenId) {
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('active', 'text-green-600');
        el.classList.add('text-gray-500');
    });
    const activeNav = document.getElementById('nav-' + screenId);
    activeNav.classList.remove('text-gray-500');
    activeNav.classList.add('active');

    const contentDiv = document.getElementById('app-content');
    contentDiv.innerHTML = screens[screenId];

    if(screenId === 'financas') {
        setTimeout(() => {
            updateFinanceData();
        }, 50);
    }
}

// --- 7. Real-Time Finance Estimator Simulator ---
function updateFinanceData() {
    const area = parseInt(document.getElementById('slider-area').value);
    const custo = parseInt(document.getElementById('slider-custo').value);
    const venda = parseInt(document.getElementById('slider-venda').value);

    document.getElementById('val-area').innerText = area;
    document.getElementById('val-custo').innerText = custo;
    document.getElementById('val-venda').innerText = venda;

    const totalGasto = area * custo;
    const totalReceita = area * venda;
    const totalLucro = totalReceita - totalGasto;

    document.getElementById('disp-gasto').innerText = totalGasto.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    document.getElementById('disp-receita').innerText = totalReceita.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    document.getElementById('disp-lucro').innerText = totalLucro.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

    renderFinancePieChart(totalGasto, totalLucro);
}

function renderFinancePieChart(gasto, lucro) {
    const canvas = document.getElementById('financeChart');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');

    if(window.financeChartInstance) {
        window.financeChartInstance.destroy();
    }

    window.financeChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Lucro Esperado', 'Gastos Insumos'],
            datasets: [{
                data: [lucro > 0 ? lucro : 0, gasto],
                backgroundColor: ['#16a34a', '#dc2626'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { 
                    position: 'bottom',
                    labels: { font: { family: 'Inter', size: 10, weight: 'bold' } } 
                }
            }
        }
    });
}

// --- Clock ticking ---
setInterval(() => {
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    const clockEl = document.getElementById('clock');
    if(clockEl) clockEl.innerText = timeStr;
}, 1000);

// --- Initialization ---
window.onload = () => {
    changeTab('contexto');
    navTo('inicio');
};