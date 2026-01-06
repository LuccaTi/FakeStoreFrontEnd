import { Link, Outlet } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Layout() {
  return (
    <div>
      {/* 1. O novo AppBar (Barra de Navegação) */}
      <AppBar position="static">
        <Toolbar>
          {/* Título da Aplicação */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FakeStore Dashboard
          </Typography>

          {/* 2. Botões de Navegação */}
          <Button color="inherit" component={Link} to="/">Dashboard</Button>
          <Button color="inherit" component={Link} to="/orders">Pedidos</Button>
          <Button color="inherit" component={Link} to="/customers">Clientes</Button>
          <Button color="inherit" component={Link} to="/products">Produtos</Button>
        </Toolbar>
      </AppBar>

      {/* 3. Conteúdo Principal */}
      <Box component="main" sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </div>
  );
}

export default Layout;