import { Outlet, Link } from 'react-router-dom';

function Layout() {
  const navStyle = {
    backgroundColor: '#f8f9fa',
    padding: '10px 20px',
    borderBottom: '1px solid #dee2e6',
    display: 'flex',
    gap: '20px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#0d6efd',
    fontWeight: 'bold',
    fontSize: '16px',
  };

  const mainContentStyle = {
    padding: '20px',
  };

  return (
    <div>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Dashboard</Link>
        <Link to="/orders" style={linkStyle}>Pedidos</Link>
        <Link to="/customers" style={linkStyle}>Clientes</Link>
        <Link to="/products" style={linkStyle}>Produtos</Link>
      </nav>

      <main style={mainContentStyle}>
        {/* O Outlet renderiza a página da rota atual aqui */}
        <Outlet /> 
      </main>
    </div>
  );
}

export default Layout;