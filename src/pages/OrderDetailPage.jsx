import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function OrderDetailPage() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = 'https://localhost:444/api/v1';

  useEffect(() => {
    if (!orderId) return;

    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`${API_URL}/Order/${orderId}/with-order-items`);
        setOrder(response.data);
        console.log("Dados do Pedido Recebido:", response.data); // Ótimo para depurar!
      } catch (err) {
        console.error(`Erro ao buscar detalhes do pedido ${orderId}:`, err);
        setError('Não foi possível carregar os detalhes do pedido.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div>Carregando detalhes do pedido...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (!order) {
    return <div>Pedido não encontrado.</div>;
  }

  // --- Estilos para a nova tabela ---
  const tableStyle = {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '30px'
  };
  const thStyle = {
      backgroundColor: '#f2f2f2',
      padding: '12px',
      border: '1px solid #ddd',
      textAlign: 'left'
  };
  const tdStyle = {
      padding: '10px',
      border: '1px solid #ddd'
  };

  return (
    <div>
      <h2>Detalhes do Pedido #{order.id}</h2>

      {/* Seção de Informações Gerais */}
      <div style={{ marginTop: '20px', lineHeight: '1.8' }}>
        <p><strong>Data do Pedido:</strong> {new Date(order.orderDate).toLocaleString('pt-BR')}</p>
        <p><strong>ID do Cliente:</strong> {order.customerId}</p>
        <p><strong>Status:</strong> {order.isActive ? 'Ativo' : 'Cancelado'}</p>
        {new Date(order.deliveredDate).getFullYear() > 1 && (
          <p><strong>Data da Entrega:</strong> {new Date(order.deliveredDate).toLocaleString('pt-BR')}</p>
        )}
      </div>

      {/* --- NOVA SEÇÃO: Itens do Pedido --- */}
      <h3 style={{ marginTop: '40px' }}>Itens do Pedido</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID Produto</th>
            <th style={thStyle}>Quantidade</th>
            <th style={thStyle}>Preço Total do Item</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapeamos a lista de orderItems, que está dentro do nosso objeto 'order' */}
          {order.orderItems && order.orderItems.map(item => (
            <tr key={item.productId}>
              <td style={tdStyle}>{item.productId}</td>
              <td style={tdStyle}>{item.quantity}</td>
              <td style={tdStyle}>R$ {item.totalPrice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetailPage;