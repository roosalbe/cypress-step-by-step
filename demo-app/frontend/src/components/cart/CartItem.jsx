import { useCart } from '../../hooks/useCart';
import Button from '../common/Button';
import './CartItem.css';

function CartItem({ item }) {
  const { updateQuantity, removeFromCart, loading } = useCart();
  const { product, quantity } = item;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(item.id, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemove = async () => {
    try {
      await removeFromCart(item.id);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <div className="cart-item" data-cy="cart-item">
      <div className="cart-item-image">
        <img src={product.image || '/placeholder.jpg'} alt={product.name} />
      </div>

      <div className="cart-item-info">
        <h3 className="cart-item-name" data-cy="cart-item-name">{product.name}</h3>
        <p className="cart-item-price" data-cy="cart-item-price">
          {formatPrice(product.price)} per stuk
        </p>
      </div>

      <div className="cart-item-quantity">
        <Button
          variant="secondary"
          size="small"
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={loading || quantity <= 1}
          data-cy="quantity-decrease"
        >
          -
        </Button>
        <span className="quantity-value" data-cy="item-quantity">{quantity}</span>
        <Button
          variant="secondary"
          size="small"
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={loading || quantity >= product.stock}
          data-cy="increase-quantity"
        >
          +
        </Button>
      </div>

      <div className="cart-item-subtotal" data-cy="cart-item-subtotal">
        {formatPrice(product.price * quantity)}
      </div>

      <Button
        variant="danger"
        size="small"
        onClick={handleRemove}
        disabled={loading}
        data-cy="remove-item"
      >
        Verwijderen
      </Button>
    </div>
  );
}

export default CartItem;
