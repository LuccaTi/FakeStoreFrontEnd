import { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom'; // 1. Renomeia o Link do Router
import axios from 'axios';

// --- Importações do Material-UI ---
import {
  Box,
  CircularProgress,
  Grid,
  Link, // 2. Agora estamos usando o Link do MUI
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

function OrderDetailPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = 'https://localhost:444/api/v1';

  useEffect(() => {
    // A lógica de busca continua a mesma, usando o endpoint com itens
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`${API_URL}/Order/${orderId}/with-order-items`);
        setOrder(response.data);
      } catch (err) {
        setError('Não foi possível carregar os detalhes do pedido.');
      } finally {
        setLoading(false);
      }
    };
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!order) return <Typography>Pedido não encontrado.</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Detalhes do Pedido #{order.id}
      </Typography>

      {/* 3. Card de Detalhes Gerais */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Informações Gerais</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Data do Pedido:</strong> {new Date(order.orderDate).toLocaleString('pt-BR')}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>ID do Cliente:</strong>{' '}
              <Link component={RouterLink} to={`/customers/${order.customerId}`}>{order.customerId}</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
             <Typography variant="body1">
               <strong>Status:</strong>{' '}
               <Typography component="span" color={order.isActive ? 'green' : 'red'} sx={{ fontWeight: 'bold' }}>
                 {order.isActive ? 'Ativo' : 'Cancelado'}
               </Typography>
            </Typography>
          </Grid>
          {new Date(order.deliveredDate).getFullYear() > 1 && (
             <Grid item xs={12} sm={6}>
               <Typography variant="body1"><strong>Data da Entrega:</strong> {new Date(order.deliveredDate).toLocaleString('pt-BR')}</Typography>
             </Grid>
          )}
        </Grid>
      </Paper>
      
      {/* 4. Tabela de Itens do Pedido */}
      <Typography variant="h5" gutterBottom>Itens do Pedido</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Produto</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell align="right">Preço Total do Item</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.orderItems.map((item) => (
              <TableRow key={item.productId} hover>
                <TableCell>
                   <Link component={RouterLink} to={`/products/${item.productId}`}>{item.productId}</Link>
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell align="right">R$ {item.totalPrice.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default OrderDetailPage;