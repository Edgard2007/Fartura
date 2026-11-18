// Configuração da região demonstrativa exibida no simulador.
const WEATHER_CONFIG = {
  latitude: -18.9186,
  longitude: -48.2772,
  timezone: "America/Sao_Paulo",
};

// Converte códigos meteorológicos da Open-Meteo em condições visuais conhecidas.
export function mapearCondicaoWeatherCode(weatherCode) {
  if (weatherCode === 0) return "sol";
  if (weatherCode >= 51 && weatherCode <= 67) return "chuva-leve";
  if (weatherCode >= 80 && weatherCode <= 82) return "chuva-leve";
  if (weatherCode >= 95) return "chuva-leve";
  return "parcialmente-nublado";
}

// Busca a previsão real de sete dias para a região do simulador.
export async function buscarPrevisaoSeteDias(signal, location = null) {
  const parametros = new URLSearchParams({
    latitude: String(location?.latitude ?? WEATHER_CONFIG.latitude),
    longitude: String(location?.longitude ?? WEATHER_CONFIG.longitude),
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum",
    timezone: WEATHER_CONFIG.timezone,
    forecast_days: "7",
  });

  const resposta = await fetch(`https://api.open-meteo.com/v1/forecast?${parametros}`, {
    method: "GET",
    signal,
  });

  if (!resposta.ok) {
    throw new Error(`Open-Meteo respondeu com status ${resposta.status}.`);
  }

  const dados = await resposta.json();
  const dias = dados.daily;

  if (!dias?.time?.length) {
    throw new Error("Open-Meteo não retornou dias de previsão.");
  }

  return dias.time.map((date, indice) => ({
    offsetDias: indice,
    data: date,
    condicao: mapearCondicaoWeatherCode(dias.weather_code[indice]),
    minima: Math.round(dias.temperature_2m_min[indice]),
    maxima: Math.round(dias.temperature_2m_max[indice]),
    precipitacao: Number(dias.precipitation_sum[indice] ?? 0),
    favoravelColheita:
      dias.precipitation_sum[indice] <= 1 &&
      mapearCondicaoWeatherCode(dias.weather_code[indice]) !== "chuva-leve",
  }));
}
