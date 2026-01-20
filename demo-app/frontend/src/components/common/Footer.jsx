import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" data-cy="footer">
      <div className="footer-container">
        <p className="footer-text">
          Demo Shop - Cypress Cursus {currentYear}
        </p>
        <p className="footer-subtitle">
          Deze applicatie is alleen bedoeld voor leerdoeleinden
        </p>
      </div>
    </footer>
  );
}

export default Footer;
