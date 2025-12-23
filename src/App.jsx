import { useState, useEffect } from 'react'; // Passo 1: Importar o useEffect
import KpiCard from './components/KpiCard';
import './App.css';

// Assumindo que sua API está rodando em http://localhost:5000
// Se for outra porta, trocaremos aqui.
const API_BASE_URL = 'http://localhost:5000/api'; 

function App() {
  const [kpis, setKpis] = useState({
    activeOrders: 0, // Valor inicial agora é 0
    cancelledOrders: 0,
    deliveredToday: 0,
  });

  // Passo 2: Usar o useEffect para buscar os dados
  useEffect(() => {
    // Função para buscar os dados do dashboard
    const fetchDashboardData = async () => {
      try {
        // Exemplo de como buscaríamos os dados.
        // Vamos precisar confirmar os endpoints exatos da sua API.
        // Por enquanto, vamos simular uma chamada.
        console.log("Buscando dados da API...");

        // Simulação de uma resposta da API após 1 segundo
        setTimeout(() => {
          const fakeApiData = {
            activeOrders: 182,
            cancelledOrders: 21,
            deliveredToday: 45,
          };
          setKpis(fakeApiData); // Atualiza o estado com os dados "recebidos"
          console.log("Dados recebidos e estado atualizado!", fakeApiData);
        }, 1000);

      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    };

    fetchDashboardData(); // Executa a função
  }, []); // Passo 3: O array de dependências vazio

  const appStyle = {
    padding: '20px'
  };

  const dashboardStyle = {
    display: 'flex',
    flexDirection: 'row',
  };

  return (
    <div style={appStyle}>
      <h1>Painel Administrativo FakeStore</h1>
      <div style={dashboardStyle}>
        <KpiCard title="Pedidos Ativos" value={kpis.activeOrders} />
        <KpiCard title="Pedidos Cancelados" value={kpis.cancelledOrders} />
        <KpiCard title="Entregues Hoje" value={kpis.deliveredToday} />
      </div>
    </div>
  );
}

export default App;