import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getStatusProps } from "../utils/statusUtils";

// Importações do Material-UI
import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function CustomerDetailPage() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "https://localhost:444/api/v1";

  useEffect(() => {
    // Usaremos o endpoint que já busca o cliente com seus pedidos
    const fetchCustomerDetails = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(
          `${API_URL}/Customer/${customerId}/with-orders`
        );
        setCustomer(response.data);
      } catch (err) {
        setError("Não foi possível carregar os detalhes do cliente.");
      } finally {
        setLoading(false);
      }
    };
    if (customerId) {
      fetchCustomerDetails();
    }
  }, [customerId]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Typography color="error">{error}</Typography>;
  if (!customer) return <Typography>Cliente não encontrado.</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Detalhes do Cliente: {customer.firstname} {customer.lastname}
      </Typography>

      {/* Card de Informações Pessoais */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Informações Pessoais
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography style={{ textTransform: "capitalize" }}>
              <strong>Nome:</strong>{" "}
              {customer.firstName + " " + customer.lastName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>
              <strong>Email:</strong> {customer.email}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>
              <strong>Telefone:</strong> {customer.phone}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>
              <strong>Data de Cadastro:</strong>{" "}
              {new Date(customer.dateCreate).toLocaleDateString("pt-BR")}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabela de Histórico de Pedidos */}
      <Typography variant="h5" gutterBottom>
        Histórico de Pedidos
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Pedido</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customer.customerOrders.map((order) => (
              <TableRow
                key={order.id}
                hover
                onClick={() => navigate(`/orders/${order.id}`)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  {new Date(order.orderDate).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>
                  <Typography
                    component="span"
                    color={getStatusProps(order.orderStatus).color}
                    sx={{ fontWeight: "bold" }}
                  >
                    {getStatusProps(order.orderStatus).text}
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

export default CustomerDetailPage;
