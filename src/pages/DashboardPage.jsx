import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Importações do Material-UI
import { Box, CircularProgress, Grid, Typography } from '@mui/material';

// Importando nosso componente de cartão separado
import SummaryCard from '../components/SummaryCard';

// Importando os ícones que usaremos
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';

function DashboardPage() {
  const navigate = useNavigate(); // Usamos o hook para navegação
  const [summary, setSummary] = useState({
    orderCount: 0,
    customerCount: 0,
    productCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = 'https://localhost:444/api/v1';

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        setLoading(true);
        setError('');

        const [ordersResponse, customersResponse, productsResponse] = await Promise.all([
          axios.get(`${API_URL}/Order/active-or-not`),
          axios.get(`${API_URL}/Customer`),
          axios.get(`${API_URL}/Product`)
        ]);

        setSummary({
          orderCount: ordersResponse.data.length,
          customerCount: customersResponse.data.length,
          productCount: productsResponse.data.length,
        });

      } catch (err) {
        setError('Não foi possível carregar os dados do dashboard.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Cartão de Pedidos */}
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard 
            icon={<ShoppingCartIcon sx={{ color: 'primary.main' }} />}
            title="Total de Pedidos"
            value={summary.orderCount}
            color="primary.light"
            onNavigate={() => navigate('/orders')} // Ação de navegação
          />
        </Grid>
        
        {/* Cartão de Clientes */}
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard 
            icon={<PeopleIcon sx={{ color: 'success.main' }} />}
            title="Total de Clientes"
            value={summary.customerCount}
            color="success.light"
            onNavigate={() => navigate('/customers')}
          />
        </Grid>

        {/* Cartão de Produtos */}
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard 
            icon={<InventoryIcon sx={{ color: 'warning.main' }} />}
            title="Total de Produtos"
            value={summary.productCount}
            color="warning.light"
            onNavigate={() => navigate('/products')}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardPage;