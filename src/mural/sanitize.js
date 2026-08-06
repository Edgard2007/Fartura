// Camada de validação e sanitização de entrada do Mural da Comunidade.
// Toda string vinda do usuário passa por aqui antes de tocar em estado ou em tela.
// Nenhuma função aqui grava, loga ou expõe dado bruto do usuário.

export const LIMITES = {
  cultura: 40,
  local: 60,
  contato: 20,
};

const PADRAO_CULTURA = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s-]{2,40}$/;
const PADRAO_LOCAL = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s,.-]{2,60}$/;
const PADRAO_TELEFONE = /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/;

// Remove caracteres de marcação e corta no tamanho máximo permitido.
// Primeira barreira contra injeção de HTML/script vindo de um campo de texto livre.
export function sanitizarTexto(valor, tamanhoMaximo) {
  if (typeof valor !== 'string') return '';
  return valor.replace(/[<>]/g, '').trim().slice(0, tamanhoMaximo);
}

export function nomeDeCulturaValido(valor) {
  return PADRAO_CULTURA.test(valor.trim());
}

export function quantidadeValida(valor) {
  const numero = Number(valor);
  return Number.isFinite(numero) && numero > 0 && numero <= 100000;
}

export function precoValido(valor) {
  const numero = Number(valor);
  return Number.isFinite(numero) && numero > 0 && numero <= 1000000;
}

export function localizacaoValida(valor) {
  return PADRAO_LOCAL.test(valor.trim());
}

// Telefone é opcional: string vazia é considerada válida (campo não preenchido).
export function telefoneValido(valor) {
  return valor.trim() === '' || PADRAO_TELEFONE.test(valor.trim());
}

// Mascaramento de dado pessoal (LGPD, art. 6º - minimização): o número completo
// nunca é exibido publicamente no mural, apenas DDD e os 2 últimos dígitos.
export function mascararTelefone(telefone) {
  const digitos = telefone.replace(/\D/g, '');
  if (digitos.length < 8) return '';
  const ddd = digitos.slice(0, 2);
  const doisUltimos = digitos.slice(-2);
  return `(${ddd}) ****-**${doisUltimos}`;
}

export function formatarPreco(valor) {
  return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
