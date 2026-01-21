import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import './Header.css';

function Header() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="header" data-cy="header">
      <div className="header-container">
        <div className="header-brand">
          <Link to="/" className="header-logo" data-cy="navbar-brand">
            Cypress Shop
          </Link>
        </div>

        <nav className="header-nav" data-cy="main-nav">
          <Link to="/" className="nav-link" data-cy="nav-home">
            Home
          </Link>
          <Link to="/products" className="nav-link" data-cy="nav-products">
            Producten
          </Link>
          {user && (
            <>
              <Link to="/dashboard" className="nav-link" data-cy="nav-dashboard">
                Dashboard
              </Link>
              <Link to="/orders" className="nav-link" data-cy="nav-orders">
                Bestellingen
              </Link>
            </>
          )}
        </nav>

        <div className="header-actions">
          {user ? (
            <>
              <Link to="/cart" className="cart-link" data-cy="nav-cart">
                Winkelwagen
                {itemCount > 0 && (
                  <span className="cart-badge" data-cy="cart-badge">{itemCount}</span>
                )}
              </Link>
              <span className="user-name" data-cy="user-info">{user.name}</span>
              <button
                onClick={handleLogout}
                className="logout-button"
                data-cy="logout-button"
              >
                Uitloggen
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" data-cy="nav-login">
                Inloggen
              </Link>
              <Link to="/register" className="nav-link nav-link-register" data-cy="nav-register">
                Registreren
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
