// Obtiene os indicadores oficiais mais recentes da Produção Agrícola Municipal.
export async function buscarDadosAgricolasLatest(signal) {
  const url =
    "https://apisidra.ibge.gov.br/values/t/1612/n1/all/v/109,216,214,112/p/last%201/c81/all";
  const resposta = await fetch(url, { method: "GET", signal });

  if (!resposta.ok) {
    throw new Error(`SIDRA respondeu com status ${resposta.status}.`);
  }

  const dados = await resposta.json();
  const linhas = dados.slice(1);
  const ano = linhas.find((linha) => linha.D3N)?.D3N ?? "";

  const encontrarValor = (nomeVariavel, nomeProduto = "Total") =>
    linhas.find(
      (linha) =>
        linha.D2N === nomeVariavel &&
        linha.D4N === nomeProduto &&
        linha.V !== "..." &&
        linha.V !== "-",
    );

  const parseNumero = (linha) => {
    if (!linha || ["...", "..", "-"].includes(String(linha.V))) return null;
    return Number(String(linha.V).replace(/\./g, "").replace(",", "."));
  };

  const areaPlantada = parseNumero(
    encontrarValor("Área plantada", "Total"),
  );
  const areaColhida = parseNumero(
    encontrarValor("Área colhida", "Total"),
  );
  const producao = parseNumero(
    encontrarValor("Quantidade produzida", "Total"),
  );
  const rendimento = parseNumero(
    encontrarValor("Rendimento médio da produção", "Total"),
  );

  const variavelArea = "Área plantada";
  const culturas = linhas
    .filter(
      (linha) =>
        linha.D2N === variavelArea &&
        linha.D4N !== "Total" &&
        linha.V !== "..." &&
        linha.V !== "-",
    )
    .map((linha) => ({
      name: linha.D4N.replace("*", "").trim(),
      value: parseNumero(linha),
    }))
    .filter((item) => item.value !== null && item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  return {
    ano,
    areaPlantada,
    areaColhida,
    producao,
    rendimento,
    culturas,
  };
}
