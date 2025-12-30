import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetailPage() {
    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const API_URL = 'https://localhost:444/api/v1';

    useEffect(() => {
        if (!productId) return;

        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await axios.get(`${API_URL}/Product/${productId}`);
                setProduct(response.data);
            } catch (err) {
                console.error("Erro ao buscar produto:", err);
                setError('Não foi possível carregar os detalhes do produto.');
            } finally {
                setLoading(false);
            }

        };

        fetchProductDetails();
    }, [productId]);

    if (loading) {
        return <div>Carregando detalhes do produto...</div>;
    }
    if (error) {
        return <div style={{color: 'red'}}>{error}</div>;
    }
    if (!product) {
        return <div>Produto não encontrado.</div>;
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
            <h2>Detalhes do Produto #{productId}</h2>

            <div style={{marginTop: '20px', lineHeight: '1.8'}}>
                <p><strong>Nome:</strong> {product.title}</p>
                <p><strong>Categoria:</strong> {product.category}</p>
                <p><strong>Descrição:</strong> {product.description}</p>
                <p><strong>Preço:</strong> R$ {product.price.toFixed(2)}</p>
                <p><strong>Imagem:</strong> <img src={product.image} alt={product.title} style={{maxWidth: '200px', marginTop: '10px'}} /></p>
                <p><strong>Status:</strong> {product.isActive ? 'Ativo' : 'Inativo'}</p>
            </div>
        </div>
    );
}

export default ProductDetailPage;

    