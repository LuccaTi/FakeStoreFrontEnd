import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // --- 1. NOVO ESTADO PARA O FILTRO ---
  // Guardará o status do filtro: 'all', 'active', ou 'cancelled'
  const [filter, setFilter] = useState('all'); 

  const API_URL = 'https://localhost:444/api/v1';

  // --- 2. useEffect AGORA DEPENDE DO FILTRO ---
  useEffect(() => {
    const fetchOrders = async () => {
      // Constrói a URL da API baseada no filtro ativo
      let apiUrl = `${API_URL}/Order/active-or-not`; // Padrão: buscar todos
      if (filter === 'active') {
        apiUrl = `${API_URL}/Order`;
      } else if (filter === 'cancelled') {
        apiUrl = `${API_URL}/Order/cancelled`;
      }

      try {
        setLoading(true);
        setError('');
        console.log(`Buscando dados de: ${apiUrl}`); // Log para depuração
        const response = await axios.get(apiUrl);
        setOrders(response.data);
      } catch (err) {
        console.error("Erro ao buscar pedidos:", err);
        setError(`Não foi possível carregar a lista de pedidos (filtro: ${filter}).`);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [filter]); // O efeito agora re-executa toda vez que 'filter' mudar

  if (loading) return <div>Carregando lista de pedidos...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  const linkStyle = { textDecoration: 'none', color: 'inherit', display: 'block', padding: '10px' };
  const cellStyle = { border: '1px solid #ddd', padding: '0' };
  
  // --- 3. ESTILOS PARA OS BOTÕES DE FILTRO ---
  const filterButtonStyle = (buttonFilter) => ({
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginRight: '10px',
    backgroundColor: filter === buttonFilter ? '#0d6efd' : '#f8f9fa', // Destaque para o botão ativo
    color: filter === buttonFilter ? 'white' : 'black',
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Lista de Pedidos</h2>
        {/* --- 4. OS BOTÕES DE FILTRO --- */}
        <div>
          <button style={filterButtonStyle('all')} onClick={() => setFilter('all')}>Todos</button>
          <button style={filterButtonStyle('active')} onClick={() => setFilter('active')}>Ativos</button>
          <button style={filterButtonStyle('cancelled')} onClick={() => setFilter('cancelled')}>Cancelados</button>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        {/* O resto da sua tabela permanece exatamente igual */}
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>ID Pedido</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>ID Cliente</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Data do Pedido</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} style={{ cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              <td style={cellStyle}><Link to={`/orders/${order.id}`} style={linkStyle}>{order.id}</Link></td>
              <td style={cellStyle}><Link to={`/customers/${order.customerId}`} style={{...linkStyle, color: '#0d6efd'}}>{order.customerId}</Link></td>
              <td style={cellStyle}><Link to={`/orders/${order.id}`} style={linkStyle}>{new Date(order.orderDate).toLocaleDateString('pt-BR')}</Link></td>
              <td style={cellStyle}><Link to={`/orders/${order.id}`} style={linkStyle}>{order.isActive ? 'Ativo' : 'Cancelado'}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersPage;