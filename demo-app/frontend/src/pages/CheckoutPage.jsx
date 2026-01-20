import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import { useCart } from '../hooks/useCart';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import './CheckoutPage.css';

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, itemCount, refreshCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderError, setOrderError] = useState('');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: ''
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Naam is verplicht';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Adres is verplicht';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Plaats is verplicht';
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postcode is verplicht';
    } else if (!/^[0-9]{4}\s?[A-Za-z]{2}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Ongeldige postcode (bijv. 1234 AB)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setOrderError('');

    try {
      const response = await ordersAPI.create(formData);
      await refreshCart();
      navigate('/orders', {
        state: { newOrderId: response.data.order.id }
      });
    } catch (err) {
      setOrderError(err.response?.data?.error || 'Bestelling plaatsen mislukt');
    } finally {
      setLoading(false);
    }
  };

  if (itemCount === 0) {
    return (
      <div className="container">
        <div className="empty-checkout" data-cy="empty-checkout">
          <p>Je winkelwagen is leeg</p>
          <Link to="/products">
            <Button variant="primary">Bekijk producten</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container checkout-page" data-cy="checkout-page">
      <h1 className="page-title">Afrekenen</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} data-cy="checkout-form">
          <h2>Verzendgegevens</h2>

          {orderError && (
            <div className="error-message" data-cy="checkout-error">
              {orderError}
            </div>
          )}

          <Input
            type="text"
            name="name"
            label="Volledige naam"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jan Jansen"
            error={errors.name}
            required
            data-cy="checkout-name"
          />

          <Input
            type="text"
            name="address"
            label="Adres"
            value={formData.address}
            onChange={handleChange}
            placeholder="Straatnaam 123"
            error={errors.address}
            required
            data-cy="checkout-address"
          />

          <div className="form-row">
            <Input
              type="text"
              name="postalCode"
              label="Postcode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="1234 AB"
              error={errors.postalCode}
              required
              data-cy="checkout-postalcode"
            />

            <Input
              type="text"
              name="city"
              label="Plaats"
              value={formData.city}
              onChange={handleChange}
              placeholder="Amsterdam"
              error={errors.city}
              required
              data-cy="checkout-city"
            />
          </div>

          <Input
            type="tel"
            name="phone"
            label="Telefoonnummer (optioneel)"
            value={formData.phone}
            onChange={handleChange}
            placeholder="06-12345678"
            data-cy="checkout-phone"
          />

          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            loading={loading}
            data-cy="place-order-button"
          >
            Bestelling plaatsen
          </Button>
        </form>

        <aside className="checkout-summary" data-cy="checkout-summary">
          <h2>Besteloverzicht</h2>

          <div className="order-items">
            {items.map((item) => (
              <div key={item.id} className="order-item">
                <span className="order-item-name">
                  {item.product.name} x {item.quantity}
                </span>
                <span className="order-item-price">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="order-total">
            <span>Totaal</span>
            <span data-cy="checkout-total">{formatPrice(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default CheckoutPage;
