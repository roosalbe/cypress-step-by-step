import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import './HomePage.css';

function HomePage() {
  const { user } = useAuth();

  return (
    <div className="home-page" data-cy="home-page">
      <section className="hero" data-cy="hero-section">
        <div className="container">
          <h1 className="hero-title" data-cy="hero-title">Welkom bij Cypress Shop</h1>
          <p className="hero-subtitle" data-cy="hero-subtitle">
            Een e-commerce demo applicatie voor de Cypress cursus
          </p>
          <div className="hero-actions">
            <Link to="/products">
              <Button variant="primary" size="large" data-cy="shop-now-button">
                Bekijk producten
              </Button>
            </Link>
            {!user && (
              <Link to="/login">
                <Button variant="outline" size="large" data-cy="login-cta">
                  Inloggen
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Wat kun je hier leren?</h2>
          <div className="features-grid">
            <div className="feature-card" data-cy="feature-card">
              <h3>E2E Testing</h3>
              <p>Leer complete user flows testen van begin tot eind</p>
            </div>
            <div className="feature-card" data-cy="feature-card">
              <h3>API Testing</h3>
              <p>Test API endpoints met cy.request en cy.intercept</p>
            </div>
            <div className="feature-card" data-cy="feature-card">
              <h3>Page Objects</h3>
              <p>Gebruik het Page Object Model voor onderhoudbare tests</p>
            </div>
            <div className="feature-card" data-cy="feature-card">
              <h3>Custom Commands</h3>
              <p>Maak herbruikbare test helpers met custom commands</p>
            </div>
          </div>
        </div>
      </section>

      <section className="test-accounts">
        <div className="container">
          <h2 className="section-title">Test Accounts</h2>
          <p className="section-subtitle">
            Gebruik deze accounts om de applicatie te testen:
          </p>
          <div className="accounts-table-wrapper">
            <table className="accounts-table" data-cy="test-accounts-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Wachtwoord</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>student@test.nl</td>
                  <td>cypress123</td>
                  <td>user</td>
                </tr>
                <tr>
                  <td>admin@test.nl</td>
                  <td>admin123</td>
                  <td>admin</td>
                </tr>
                <tr>
                  <td>tester@test.nl</td>
                  <td>test123</td>
                  <td>user</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
