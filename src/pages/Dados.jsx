import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Layout from '../components/Layout';

export default function Dados(){ const data=[{name:'Agricultura Familiar (77%)',value:77},{name:'Grande Escala / Outros (23%)',value:23}]; return <Layout title="Dados do Campo" subtitle="Censo Agropecuário IBGE (2017): a força da agricultura familiar no Brasil.">
 <main className="cartao-fartura"><h2 className="text-lg font-bold text-center mb-2">A Força da Agricultura Familiar no Brasil</h2><p className="text-xs text-center text-[color:var(--texto-suave)] mb-4">Dados: Censo Agropecuário IBGE (2017)</p>
  <div className="chart-container"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data} dataKey="value" innerRadius="70%" outerRadius="90%" stroke="none"><Cell fill="#43602C"/><Cell fill="#e2e0d5"/></Pie><Tooltip/><Legend wrapperStyle={{fontSize:11,fontWeight:600}}/></PieChart></ResponsiveContainer></div>
  <div className="mt-4 p-4 rounded-xl text-sm font-medium text-center" style={{background:'rgba(67,96,44,0.12)',color:'var(--broto)'}}>Apesar de representarem 77% dos estabelecimentos e produzirem 70% da nossa comida, esses agricultores possuem o <strong>menor acesso à tecnologia, crédito e assistência</strong>.</div>
 </main></Layout> }
