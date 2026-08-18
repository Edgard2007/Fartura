import Layout from '../components/Layout';
import MuralComunidade from '../mural/MuralComunidade';
export default function Mural(){return <Layout title="Mural da Comunidade" subtitle="Produtores publicam a colheita disponível; compradores locais encontram a oferta mais próxima."><main className="cartao-fartura"><p className="text-sm text-[color:var(--texto-suave)] mb-4">Nenhum dado é armazenado além desta sessão do navegador — protótipo sem backend. Telefones de contato são exibidos já mascarados.</p><MuralComunidade/></main></Layout>}
