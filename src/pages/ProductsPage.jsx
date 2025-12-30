import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const API_URL = 'https://localhost:444/api/v1';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await axios.get(`${API_URL}/Product/active-or-not`);
                setProducts(response.data);
            } catch (err) {
                console.error("Erro ao buscar produtos:", err);
                setError('Não foi possível carregar a lista de produtos.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div style={{padding: '20px'}}>Carregando lista de produtos...</div>;
    }
    if (error) {
        return <div style={{color: 'red', padding: '20px'}}>{error}</div>;
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
            <h2>Lista de Produtos</h2>
            <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '20px'}}>
                <thead>
                <tr style={{backgroundColor: '#f2f2f2'}}>
                    <th style={{padding: '12px', border: '1px solid #ddd', textAlign: 'left'}}>ID Produto</th>
                    <th style={{padding: '12px', border: '1px solid #ddd', textAlign: 'left'}}>Nome do Produto</th>
                    <th style={{padding: '12px', border: '1px solid #ddd', textAlign: 'left'}}>Categoria</th>
                    <th style={{padding: '12px', border: '1px solid #ddd', textAlign: 'left'}}>Preço</th>
                    <th style={{padding: '12px', border: '1px solid #ddd', textAlign: 'left'}}>Status</th>
                </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                            <tr key={product.id} style={{ cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                            <td style={cellStyle}><Link to={`/products/${product.id}`} style={linkStyle}>{product.id}</Link></td>
                            <td style={cellStyle}><Link to={`/products/${product.id}`} style={linkStyle}>{product.title}</Link></td>
                            <td style={cellStyle}><Link to={`/products/${product.id}`} style={linkStyle}>{product.category}</Link></td>
                            <td style={cellStyle}><Link to={`/products/${product.id}`} style={linkStyle}>${product.price.toFixed(2)}</Link></td>
                            <td style={cellStyle}><Link to={`/products/${product.id}`} style={linkStyle}>{product.isActive ? 'Ativo' : 'Inativo'}</Link></td>
                        </tr>
                   ))}
                </tbody>
            </table>
        </div>
    );
}
                                        
export default ProductsPage;