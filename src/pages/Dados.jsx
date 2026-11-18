import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { buscarDadosAgricolasLatest } from "../services/ibgeApi";

export default function Dados() {
  const [dadosLatest, setDadosLatest] = useState(null);
  const [estadoDados, setEstadoDados] = useState("carregando");

  useEffect(() => {
    const controller = new AbortController();

    buscarDadosAgricolasLatest(controller.signal)
      .then((dados) => {
        setDadosLatest(dados);
        setEstadoDados("atualizada");
      })
      .catch((erro) => {
        if (erro.name !== "AbortError") {
          setEstadoDados("fallback");
        }
      });

    return () => controller.abort();
  }, []);

  const dataHistorica = [
    { name: "Agricultura Familiar (77%)", value: 77 },
    { name: "Grande Escala / Outros (23%)", value: 23 },
  ];
  const dataAtualizada = dadosLatest?.culturas?.length
    ? dadosLatest.culturas
    : dataHistorica;

  const formatarHectares = (valor) =>
    valor === null
      ? "Não disponível"
      : valor.toLocaleString("pt-BR", { maximumFractionDigits: 0 });

  const formatarToneladas = (valor) =>
    valor === null
      ? "Não disponível"
      : valor.toLocaleString("pt-BR", { maximumFractionDigits: 0 });
  return (
    <Layout
      title="Dados do Campo"
      subtitle="Panorama histórico do Censo Agropecuário e série oficial atual da produção agrícola."
    >
      <main className="cartao-fartura dados-painel">
        <div className="dados-painel__intro">
          <span className="dados-painel__eyebrow">
            {estadoDados === "atualizada"
              ? `Produção agrícola · ${dadosLatest?.ano}`
              : "Censo Agropecuário · 2017"}
          </span>
          <p>
            {estadoDados === "atualizada"
              ? "Dados publicados pelo IBGE/SIDRA"
              : estadoDados === "carregando"
                ? "Consultando o IBGE..."
                : "Série oficial temporariamente indisponível"}
          </p>
        </div>
        {estadoDados === "atualizada" && dadosLatest && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <div className="p-3 rounded-xl text-center" style={{ background: "rgba(67,96,44,0.12)" }}>
              <p className="text-[10px] uppercase font-bold" style={{ color: "var(--broto)" }}>Área plantada</p>
              <p className="text-lg font-black">{formatarHectares(dadosLatest.areaPlantada)} ha</p>
            </div>
            <div className="p-3 rounded-xl text-center" style={{ background: "rgba(227,168,59,0.18)" }}>
              <p className="text-[10px] uppercase font-bold" style={{ color: "var(--mandioca-escura)" }}>Área colhida</p>
              <p className="text-lg font-black">{formatarHectares(dadosLatest.areaColhida)} ha</p>
            </div>
            <div className="p-3 rounded-xl text-center" style={{ background: "rgba(47,93,107,0.12)" }}>
              <p className="text-[10px] uppercase font-bold" style={{ color: "var(--ceu-chuva)" }}>Produção</p>
              <p className="text-lg font-black">{formatarToneladas(dadosLatest.producao)} t</p>
            </div>
          </div>
        )}
        <h2 className="text-lg font-bold text-center mb-2">
          {estadoDados === "atualizada"
            ? `Principais culturas por área plantada · ${dadosLatest?.ano}`
            : "A Força da Agricultura Familiar no Brasil"}
        </h2>
        <p className="text-xs text-center text-[color:var(--texto-suave)] mb-4">
          {estadoDados === "atualizada"
            ? "Fonte: PAM/IBGE SIDRA — tabela 1612"
            : "Fonte: Censo Agropecuário IBGE (2017)"}
        </p>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataAtualizada}
                dataKey="value"
                innerRadius={estadoDados === "atualizada" ? "55%" : "70%"}
                outerRadius="90%"
                stroke="none"
              >
                {dataAtualizada.map((item, indice) => (
                  <Cell
                    key={item.name}
                    fill={
                      ["var(--broto)", "#D9A12E", "#6D8C52", "#A64B3C", "#9CB3A0", "#D9CBB8"][indice]
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11, fontWeight: 600 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div
          className="mt-4 p-4 rounded-xl text-sm font-medium text-center"
          style={{ background: "rgba(67,96,44,0.12)", color: "var(--broto)" }}
        >
          Apesar de representarem 77% dos estabelecimentos e produzirem 70% da
          nossa comida, esses agricultores possuem o{" "}
          <strong>menor acesso à tecnologia, crédito e assistência</strong>.
        </div>
      </main>
    </Layout>
  );
}
