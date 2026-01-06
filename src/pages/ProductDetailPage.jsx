import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import {
  Box,
  CircularProgress,
  Paper,
  Typography
} from '@mui/material';

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = 'https://localhost:444/api/v1';

  useEffect(() => {
    // ...código para buscar os dados não muda...
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`${API_URL}/Product/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError('Não foi possível carregar os detalhes do produto.');
      } finally {
        setLoading(false);
      }
    };
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!product) return <Typography>Produto não encontrado.</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Detalhes do Produto
      </Typography>

      <Paper sx={{ p: 3 }}>
        {/* ABORDAGEM COM FLEXBOX - MAIS DIRETA */}
        <Box sx={{
          display: 'flex',
          // Em telas pequenas (xs), a direção é coluna (um sobre o outro)
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: 3 // Espaçamento entre os itens (imagem e texto)
        }}>
          
          {/* Coluna da Imagem (usando a tag img que funciona para você) */}
          <Box
            component="img"
            sx={{
              // Em telas pequenas (xs), ocupa 80% e centraliza. Em maiores (sm), tem 250px fixo.
              width: { xs: '80%', sm: '250px' },
              height: 'auto',
              display: 'block',
              margin: { xs: '0 auto 24px auto', sm: '0' }, // Centraliza no mobile, zera no desktop
              borderRadius: '8px',
            }}
            alt={product.title}
            src={product.image}
          />

          {/* Coluna do Texto */}
          <Box sx={{ flex: 1 }}> {/* Ocupa o espaço restante */}
            <Typography variant="h5" component="h1" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Categoria: {product.category}
            </Typography>
            <Typography variant="body1" sx={{ my: 2 }}>
              {product.description}
            </Typography>
            <Typography variant="h6" color="primary">
              Preço: R$ {product.price.toFixed(2)}
            </Typography>
          </Box>

        </Box>
      </Paper>
    </Box>
  );
}

export default ProductDetailPage;