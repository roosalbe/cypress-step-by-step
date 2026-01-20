import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import './ProductCard.css';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, loading } = useCart();

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await addToCart(product.id);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <Card onClick={handleClick} data-cy="product-card">
      <Card.Image
        src={product.image || '/placeholder.jpg'}
        alt={product.name}
      />
      <Card.Content>
        <Card.Title data-cy="product-name">{product.name}</Card.Title>
        <p className="product-description" data-cy="product-description">
          {product.description.substring(0, 80)}...
        </p>
        <p className="product-category" data-cy="product-category">
          {product.category}
        </p>
      </Card.Content>
      <Card.Footer>
        <span className="product-price" data-cy="product-price">
          {formatPrice(product.price)}
        </span>
        <Button
          variant={product.stock > 0 ? 'primary' : 'secondary'}
          size="small"
          disabled={product.stock === 0 || loading}
          onClick={handleAddToCart}
          data-cy="add-to-cart-button"
        >
          {product.stock > 0 ? 'Toevoegen' : 'Uitverkocht'}
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default ProductCard;
