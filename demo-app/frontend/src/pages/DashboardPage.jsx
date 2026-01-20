import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import './DashboardPage.css';

function DashboardPage() {
  const { user } = useAuth();
  const { itemCount } = useCart();

  return (
    <div className="container dashboard-page" data-cy="dashboard-page">
      <h1 className="page-title">Dashboard</h1>

      <div className="welcome-card" data-cy="welcome-card">
        <h2>Welkom terug, {user?.name}!</h2>
        <p>Je bent ingelogd als {user?.email}</p>
      </div>

      <div className="dashboard-grid">
        <Card data-cy="cart-card">
          <Card.Content>
            <h3>Winkelwagen</h3>
            <p className="stat-number" data-cy="cart-count">{itemCount}</p>
            <p className="stat-label">artikelen</p>
          </Card.Content>
          <Card.Footer>
            <Link to="/cart">
              <Button variant="primary" size="small">
                Bekijk winkelwagen
              </Button>
            </Link>
          </Card.Footer>
        </Card>

        <Card data-cy="orders-card">
          <Card.Content>
            <h3>Bestellingen</h3>
            <p className="stat-description">Bekijk je bestelgeschiedenis</p>
          </Card.Content>
          <Card.Footer>
            <Link to="/orders">
              <Button variant="primary" size="small">
                Bekijk bestellingen
              </Button>
            </Link>
          </Card.Footer>
        </Card>

        <Card data-cy="products-card">
          <Card.Content>
            <h3>Producten</h3>
            <p className="stat-description">Ontdek onze producten</p>
          </Card.Content>
          <Card.Footer>
            <Link to="/products">
              <Button variant="primary" size="small">
                Bekijk producten
              </Button>
            </Link>
          </Card.Footer>
        </Card>
      </div>

      <div className="account-info" data-cy="account-info">
        <h2>Account Informatie</h2>
        <table className="info-table">
          <tbody>
            <tr>
              <td>Naam</td>
              <td data-cy="account-name">{user?.name}</td>
            </tr>
            <tr>
              <td>E-mail</td>
              <td data-cy="account-email">{user?.email}</td>
            </tr>
            <tr>
              <td>Rol</td>
              <td data-cy="account-role">{user?.role}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardPage;
