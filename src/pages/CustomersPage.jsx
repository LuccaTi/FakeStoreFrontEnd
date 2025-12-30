import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CustomersPage() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const API_URL = 'https://localhost:444/api/v1';

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await axios.get(`${API_URL}/Customer/active-or-not`);
                setCustomers(response.data);
            } catch (err) {
                console.error("Erro ao buscar clientes:", err);
                setError('Não foi possível carregar a lista de clientes.');
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);
    if (loading) {
        return <div style={{ padding: '20px' }}>Carregando lista de clientes...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;
    }

    const linkStyle = {
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        padding: '10px'
    };

    const cellStyle = {
        border: '1px solid #ddd',
        padding: '0'
    };

    return (
        <div>
            <h2>Lista de Clientes</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>ID Cliente</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Primeiro nome</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Sobrenome</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Email</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Telefone</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id} style={{ cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                            <td style={cellStyle}><Link to={`/customers/${customer.id}`} style={linkStyle}>{customer.id}</Link></td>
                            <td style={cellStyle}><Link to={`/customers/${customer.id}`} style={linkStyle}>{customer.firstName}</Link></td>
                            <td style={cellStyle}><Link to={`/customers/${customer.id}`} style={linkStyle}>{customer.lastName}</Link></td>
                            <td style={cellStyle}><Link to={`/customers/${customer.id}`} style={linkStyle}>{customer.email}</Link></td>
                            <td style={cellStyle}><Link to={`/customers/${customer.id}`} style={linkStyle}>{customer.phone}</Link></td>
                            <td style={cellStyle}><Link to={`/customers/${customer.id}`} style={linkStyle}>{customer.isActive ? 'Ativo' : 'Inativo'}</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CustomersPage;