import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // 1. Importa o hook useParams
import axios from 'axios';

function OrderDetailPage() {
  const { orderId } = useParams(); // 2. Extrai o parâmetro "orderId" da URL

  // Estados para guardar o pedido, carregamento e erro
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = 'https://localhost:444/api/v1'; // Sua URL da API

  useEffect(() => {
    // Se não tivermos um orderId, não fazemos nada.
    if (!orderId) return;

    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        setError('');
        // 3. Faz a chamada GET para o endpoint de um pedido específico
        const response = await axios.get(`${API_URL}/Order/${orderId}`);
        setOrder(response.data);
      } catch (err) {
        console.error(`Erro ao buscar detalhes do pedido ${orderId}:`, err);
        setError('Não foi possível carregar os detalhes do pedido.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]); // 4. O array de dependências agora contém "orderId"

  // Renderização condicional
  if (loading) {
    return <div style={{ padding: '20px' }}>Carregando detalhes do pedido...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;
  }
  
  // Se o pedido não for encontrado após o carregamento
  if (!order) {
      return <div style={{ padding: '20px' }}>Pedido não encontrado.</div>;
  }

  // Renderização principal com os detalhes
  return (
    <div>
      <h2>Detalhes do Pedido #{order.id}</h2>
      <div style={{ marginTop: '20px', lineHeight: '1.8' }}>
        <p><strong>Data do Pedido:</strong> {new Date(order.orderDate).toLocaleString('pt-BR')}</p>
        <p><strong>ID do Cliente:</strong> {order.customerId}</p>
        <p><strong>Status:</strong> {order.isActive ? 'Ativo' : 'Cancelado'}</p>
        {new Date(order.deliveredDate).getFullYear() > 1 && (
          <p><strong>Data da Entrega:</strong> {new Date(order.deliveredDate).toLocaleString('pt-BR')}</p>
        )}
      </div>
    </div>
  );
}

export default OrderDetailPage;