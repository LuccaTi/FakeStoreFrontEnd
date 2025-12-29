import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 1. Importa o componente Link
import axios from 'axios';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Use a URL correta da sua API que você já ajustou
  const API_URL = 'https://localhost:444/api/v1'; 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`${API_URL}/Order/active-or-not`);
        setOrders(response.data);
      } catch (err) {
        console.error("Erro ao buscar pedidos:", err);
        setError('Não foi possível carregar a lista de pedidos.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div style={{ padding: '20px' }}>Carregando lista de pedidos...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;
  }
  
  // Estilo para que o link não tenha sublinhado e herde a cor do texto
  const linkStyle = {
      textDecoration: 'none',
      color: 'inherit',
      display: 'block', // Faz o link ocupar toda a célula
      padding: '10px'
  };
  
  const cellStyle = {
      border: '1px solid #ddd',
      padding: '0' // Zera o padding da célula, pois o link já terá
  };

  return (
    <div>
      <h2>Lista de Pedidos</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
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
            // Adiciona um efeito visual de cursor ao passar o mouse sobre a linha
            <tr key={order.id} style={{ cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              {/* 2. Cada célula agora contém um Link */}
              <td style={cellStyle}><Link to={`/orders/${order.id}`} style={linkStyle}>{order.id}</Link></td>
              <td style={cellStyle}><Link to={`/orders/${order.id}`} style={linkStyle}>{order.customerId}</Link></td>
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