import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import Button from '../common/Button';
import './CartSummary.css';

function CartSummary() {
  const navigate = useNavigate();
  const { total, itemCount, clearCart, loading } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleClear = async () => {
    if (window.confirm('Weet je zeker dat je de winkelwagen wilt legen?')) {
      try {
        await clearCart();
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
  };

  return (
    <div className="cart-summary" data-cy="cart-summary">
      <h2 className="summary-title">Overzicht</h2>

      <div className="summary-row">
        <span>Aantal artikelen</span>
        <span data-cy="item-count">{itemCount}</span>
      </div>

      <div className="summary-row summary-total">
        <span>Totaal</span>
        <span data-cy="cart-total">{formatPrice(total)}</span>
      </div>

      <div className="summary-actions">
        <Button
          variant="primary"
          fullWidth
          onClick={handleCheckout}
          disabled={itemCount === 0}
          data-cy="checkout-button"
        >
          Afrekenen
        </Button>

        <Button
          variant="secondary"
          fullWidth
          onClick={handleClear}
          disabled={itemCount === 0 || loading}
          data-cy="clear-cart-button"
        >
          Winkelwagen legen
        </Button>
      </div>
    </div>
  );
}

export default CartSummary;
