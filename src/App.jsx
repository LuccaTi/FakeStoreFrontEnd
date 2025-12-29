import { useState, useEffect } from 'react';
import axios from 'axios';
import KpiCard from './components/KpiCard';
import './App.css';

// A URL base da sua API.
const API_URL = 'https://localhost:444/api/v1';

function App() {
  // O estado agora começa com 0. A API que vai preenchê-los.
  const [kpis, setKpis] = useState({
    activeOrders: 0,
    cancelledOrders: 0,
    deliveredToday: 0,
  });
  
  // Este estado vai guardar mensagens de erro, se acontecerem.
  const [error, setError] = useState('');

  // useEffect vai rodar uma vez, quando o componente for montado.
  useEffect(() => {
    // Função que busca os dados da API.
    const fetchDashboardMetrics = async () => {
      try {
        setError(''); // Limpa erros anteriores
        // Faz a chamada GET para o novo endpoint otimizado.
        const response = await axios.get(`${API_URL}/Dashboard/metrics`);
        
        // Atualiza o estado com os dados recebidos da API. Simples e direto!
        setKpis(response.data);

      } catch (err) {
        console.error("Erro ao buscar métricas da API:", err);
        // Se der erro (API desligada, CORS, etc), guardamos a mensagem.
        setError('Não foi possível carregar os dados do dashboard. Verifique se a API está rodando e o CORS está configurado.');
      }
    };

    fetchDashboardMetrics(); // Executa a função.

  }, []); // O array vazio garante que isso rode apenas uma vez.

  // Estilos para organizar a página.
  const appStyle = {
    padding: '20px',
    fontFamily: 'sans-serif',
  };

  const dashboardStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  };

  const errorStyle = {
    color: 'red',
    backgroundColor: '#ffeeee',
    border: '1px solid red',
    padding: '10px',
    borderRadius: '5px',
    marginTop: '20px',
  };

  return (
    <div style={appStyle}>
      <h1>Painel Administrativo FakeStore</h1>

      {/* Se houver uma mensagem de erro, mostre-a na tela. */}
      {error && <div style={errorStyle}>{error}</div>}

      <div style={dashboardStyle}>
        <KpiCard title="Pedidos Ativos" value={kpis.activeOrders} />
        <KpiCard title="Pedidos Cancelados" value={kpis.cancelledOrders} />
        <KpiCard title="Entregues Hoje" value={kpis.deliveredToday} />
      </div>
    </div>
  );
}

export default App;