import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import './CartPage.css';

function CartPage() {
  const { items, loading } = useCart();

  if (loading && items.length === 0) {
    return <div className="loading-container">Winkelwagen laden...</div>;
  }

  return (
    <div className="container cart-page" data-cy="cart-page">
      <h1 className="page-title">Winkelwagen</h1>

      {items.length === 0 ? (
        <div className="empty-cart" data-cy="empty-cart">
          <p>Je winkelwagen is leeg</p>
          <Link to="/products">
            <Button variant="primary">Bekijk producten</Button>
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items" data-cy="cart-items">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <aside className="cart-sidebar">
            <CartSummary />
          </aside>
        </div>
      )}
    </div>
  );
}

export default CartPage;
