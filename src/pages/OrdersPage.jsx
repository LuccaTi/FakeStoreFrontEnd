import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. NOVO: Hook para navegação programática
import axios from 'axios';

// --- Importações do Material-UI ---
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress, // Um "spinner" de carregamento mais bonito
  Paper, // Um container com fundo branco e sombra
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

function OrdersPage() {
  const navigate = useNavigate(); // 2. Inicializa o hook de navegação

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const API_URL = 'https://localhost:444/api/v1';

  useEffect(() => {
    // ... (A lógica de fetchOrders continua exatamente a mesma) ...
    const fetchOrders = async () => {
      let apiUrl = `${API_URL}/Order/active-or-not`;
      if (filter === 'active') {
        apiUrl = `${API_URL}/Order`;
      } else if (filter === 'cancelled') {
        apiUrl = `${API_URL}/Order/cancelled`;
      }

      try {
        setLoading(true);
        setError('');
        const response = await axios.get(apiUrl);
        setOrders(response.data);
      } catch (err) {
        console.error("Erro ao buscar pedidos:", err);
        setError(`Não foi possível carregar a lista de pedidos.`);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [filter]);

  // 3. Renderização de Carregamento e Erro com componentes MUI
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }
  
  // 4. Função para navegar para os detalhes do pedido
  const handleRowClick = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">
          Lista de Pedidos
        </Typography>
        {/* 5. Grupo de botões do MUI */}
        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
          <Button variant={filter === 'all' ? 'contained' : 'outlined'} onClick={() => setFilter('all')}>Todos</Button>
          <Button variant={filter === 'active' ? 'contained' : 'outlined'} onClick={() => setFilter('active')}>Ativos</Button>
          <Button variant={filter === 'cancelled' ? 'contained' : 'outlined'} onClick={() => setFilter('cancelled')}>Cancelados</Button>
        </ButtonGroup>
      </Box>

      {/* 6. A nova Tabela MUI, envolvida por um Paper para um visual melhor */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID Pedido</TableCell>
              <TableCell>ID Cliente</TableCell>
              <TableCell>Data do Pedido</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                hover // Adiciona efeito de hover automaticamente
                onClick={() => handleRowClick(order.id)} // 7. Linha inteira clicável
                sx={{ cursor: 'pointer' }}
              >
                <TableCell component="th" scope="row">{order.id}</TableCell>
                <TableCell>{order.customerId}</TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>
                   <Typography 
                     color={order.isActive ? 'green' : 'red'}
                     sx={{ fontWeight: 'bold' }}
                   >
                     {order.isActive ? 'Ativo' : 'Cancelado'}
                   </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default OrdersPage;