import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CustomerDetailPage() {
    const { customerId } = useParams();

    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const API_URL = 'https://localhost:444/api/v1';

    useEffect(() => {
        if (!customerId) return;

        const fetchCustomerDetails = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await axios.get(`${API_URL}/Customer/${customerId}/with-address`);
                setCustomer(response.data);
            } catch (err) {
                console.error("Erro ao buscar cliente:", err);
                setError('Não foi possível carregar os detalhes do cliente.');
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerDetails();
    }, [customerId]);

    if (loading) {
        return <div>Carregando detalhes do cliente...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    if (!customer) {
        return <div>Cliente não encontrado.</div>;
    }

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '30px'
    };
    const thStyle = {
        backgroundColor: '#f2f2f2',
        padding: '12px',
        border: '1px solid #ddd',
        textAlign: 'left'
    }; 
    const tdStyle = {
        padding: '10px',
        border: '1px solid #ddd'
    };

    return (
        <div>
            <h2>Detalhes do Cliente #{customerId}</h2>
            
            <div style={{ marginTop: '20px', lineHeight: '1.8' }}>
                <p><strong>Primeiro nome:</strong> {customer.firstName}</p>
                <p><strong>Sobrenome:</strong> {customer.lastName}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Telefone:</strong> {customer.phone}</p>
                <p><strong>Cidade:</strong> {customer.address.city}</p>
                <p><strong>Endereço:</strong> {customer.address.street}</p>
                <p><strong>Numero:</strong> {customer.address.number}</p>
                <p><strong>CEP:</strong> {customer.address.zipcode}</p>
                <p><strong>Data de cadastro:</strong> {new Date(customer.dateCreate).toLocaleDateString('pt-BR')}</p>
                <p><strong>Status:</strong> {customer.isActive ? 'Ativo' : 'Inativo'}</p>
            </div>
        </div>
    );
}

export default CustomerDetailPage;