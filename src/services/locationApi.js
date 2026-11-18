// Busca locais brasileiros autorizados pelo usuário antes de alterar a previsão.
export async function buscarLocalizacao(textoBusca, signal) {
  const busca = textoBusca.trim();
  if (busca.length < 2) return [];

  const parametros = new URLSearchParams({
    name: busca,
    count: "8",
    language: "pt",
    countryCode: "BR",
  });

  const resposta = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?${parametros}`,
    { method: "GET", signal },
  );

  if (!resposta.ok) {
    throw new Error(`Busca geográfica respondeu com status ${resposta.status}.`);
  }

  const dados = await resposta.json();
  return (dados.results ?? []).filter(
    (resultado) => resultado.feature_code !== "AIRP",
  );
}
