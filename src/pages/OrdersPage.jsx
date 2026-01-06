import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getStatusProps } from '../utils/statusUtils';

import {
  Box, Button, ButtonGroup, CircularProgress, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from '@mui/material';

function OrdersPage() {
  const navigate = useNavigate();
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const API_URL = 'https://localhost:444/api/v1';

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`${API_URL}/Order/active-or-not`);
        setAllOrders(response.data);
        setFilteredOrders(response.data);
      } catch (err) {
        setError('Não foi possível carregar a lista de pedidos.');
      } finally {
        setLoading(false);
      }
    };
    fetchAllOrders();
  }, []);

  // --- LÓGICA DE FILTRO ATUALIZADA ---
  useEffect(() => {
    if (filter === 'all') {
      setFilteredOrders(allOrders);
    } else if (filter === 'active') {
      const activeOrders = allOrders.filter(o => o.orderStatus !== 'Finished' && o.orderStatus !== 'Cancelled');
      setFilteredOrders(activeOrders);
    } else if (filter === 'finished') { // 1. NOVA LÓGICA DE FILTRO
      const finishedOrders = allOrders.filter(o => o.orderStatus === 'Finished');
      setFilteredOrders(finishedOrders);
    } else if (filter === 'cancelled') {
      const cancelledOrders = allOrders.filter(o => o.orderStatus === 'Cancelled');
      setFilteredOrders(cancelledOrders);
    }
  }, [filter, allOrders]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error">{error}</Typography>;
  
  const handleRowClick = (orderId) => navigate(`/orders/${orderId}`);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">Lista de Pedidos</Typography>
        <ButtonGroup variant="outlined">
          <Button variant={filter === 'all' ? 'contained' : 'outlined'} onClick={() => setFilter('all')}>Todos</Button>
          <Button variant={filter === 'active' ? 'contained' : 'outlined'} onClick={() => setFilter('active')}>Ativos</Button>
          {/* 2. NOVO BOTÃO DE FILTRO */}
          <Button variant={filter === 'finished' ? 'contained' : 'outlined'} onClick={() => setFilter('finished')}>Finalizados</Button>
          <Button variant={filter === 'cancelled' ? 'contained' : 'outlined'} onClick={() => setFilter('cancelled')}>Cancelados</Button>
        </ButtonGroup>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead><TableRow><TableCell>ID Pedido</TableCell><TableCell>ID Cliente</TableCell><TableCell>Data</TableCell><TableCell>Status</TableCell></TableRow></TableHead>
          <TableBody>
            {filteredOrders.map((order) => {
              const status = getStatusProps(order.orderStatus);
              return (
                <TableRow key={order.id} hover onClick={() => handleRowClick(order.id)} sx={{ cursor: 'pointer' }}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerId}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>
                    <Typography component="span" color={status.color} sx={{ fontWeight: 'bold' }}>
                      {status.text}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default OrdersPage;