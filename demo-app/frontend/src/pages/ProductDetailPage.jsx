import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import Button from '../components/common/Button';
import './ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, loading: cartLoading } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await productsAPI.getById(id);
        setProduct(response.data.product);
      } catch (err) {
        if (err.response?.status === 404) {
          setError('Product niet gevonden');
        } else {
          setError('Kon product niet laden');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await addToCart(product.id, quantity);
      setAddedMessage('Product toegevoegd aan winkelwagen!');
      setTimeout(() => setAddedMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Kon product niet toevoegen');
    }
  };

  if (loading) {
    return <div className="loading-container">Product laden...</div>;
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">{error}</div>
        <Link to="/products">
          <Button variant="secondary">Terug naar producten</Button>
        </Link>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="container product-detail-page" data-cy="product-detail-page">
      <Link to="/products" className="back-link" data-cy="back-link">
        &larr; Terug naar producten
      </Link>

      <div className="product-detail">
        <div className="product-detail-image">
          <img
            src={product.image || '/placeholder.jpg'}
            alt={product.name}
            data-cy="product-image"
          />
        </div>

        <div className="product-detail-info">
          <h1 className="product-detail-name" data-cy="product-name">
            {product.name}
          </h1>

          <span className="product-detail-category" data-cy="product-category">
            {product.category}
          </span>

          <p className="product-detail-description" data-cy="product-description">
            {product.description}
          </p>

          <div className="product-detail-price" data-cy="product-price">
            {formatPrice(product.price)}
          </div>

          <div className="product-detail-stock" data-cy="product-stock">
            {product.stock > 0 ? (
              <span className="in-stock">{product.stock} op voorraad</span>
            ) : (
              <span className="out-of-stock">Uitverkocht</span>
            )}
          </div>

          {addedMessage && (
            <div className="success-message" data-cy="added-message">
              {addedMessage}
            </div>
          )}

          {product.stock > 0 && (
            <div className="product-detail-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Aantal:</label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="form-input"
                  data-cy="quantity-select"
                >
                  {[...Array(Math.min(10, product.stock))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                variant="primary"
                size="large"
                onClick={handleAddToCart}
                loading={cartLoading}
                data-cy="add-to-cart-button"
              >
                In winkelwagen
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
