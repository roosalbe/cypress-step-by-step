import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import './HomePage.css';

const quotes = [
  { text: "Testing leads to failure, and failure leads to understanding.", author: "Burt Rutan" },
  { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
  { text: "The bitterness of poor quality remains long after the sweetness of low price is forgotten.", author: "Benjamin Franklin" },
  { text: "If you don't like testing your product, most likely your customers won't like to test it either.", author: "Anonymous" },
  { text: "A bug is never just a mistake. It represents something bigger.", author: "James Whittaker" },
  { text: "Testing is not about finding bugs, it's about building quality.", author: "Anonymous" },
  { text: "The earlier you catch defects, the cheaper they are to fix.", author: "David Farley" },
  { text: "Automated testing is a safety net that enables fearless refactoring.", author: "Kent Beck" }
];

function HomePage() {
  const { user } = useAuth();
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

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

      <section className="quote-section" data-cy="quote-section">
        <div className="container">
          <blockquote className="quote-block" data-cy="random-quote">
            <p className="quote-text">"{quote.text}"</p>
            <footer className="quote-author">— {quote.author}</footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
