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
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    postcode: '',
    city: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

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

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Voornaam is verplicht';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Achternaam is verplicht';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail is verplicht';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ongeldig e-mailadres';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Adres is verplicht';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Plaats is verplicht';
    }

    if (!formData.postcode.trim()) {
      newErrors.postcode = 'Postcode is verplicht';
    } else if (!/^[0-9]{4}\s?[A-Za-z]{2}$/.test(formData.postcode)) {
      newErrors.postcode = 'Ongeldige postcode (bijv. 1234 AB)';
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
      // Transform formData to match backend expectations
      const orderData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        postalCode: formData.postcode,
        city: formData.city
      };

      const response = await ordersAPI.create(orderData);
      await refreshCart();
      setOrderSuccess(true);
      // Navigate after a short delay to show confirmation
      setTimeout(() => {
        navigate('/orders', {
          state: { newOrderId: response.data.order.id }
        });
      }, 2000);
    } catch (err) {
      setOrderError(err.response?.data?.error || 'Bestelling plaatsen mislukt');
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="container">
        <div className="order-confirmation" data-cy="order-confirmation">
          <h2>Bedankt voor je bestelling!</h2>
          <p>Je bestelling is succesvol geplaatst. Je wordt doorgestuurd naar je bestellingen...</p>
        </div>
      </div>
    );
  }

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

          <div className="form-row">
            <Input
              type="text"
              name="firstName"
              label="Voornaam"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Jan"
              error={errors.firstName}
              required
              data-cy="firstName"
            />

            <Input
              type="text"
              name="lastName"
              label="Achternaam"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Jansen"
              error={errors.lastName}
              required
              data-cy="lastName"
            />
          </div>

          <Input
            type="email"
            name="email"
            label="E-mailadres"
            value={formData.email}
            onChange={handleChange}
            placeholder="jan@example.com"
            error={errors.email}
            required
            data-cy="email"
          />

          <Input
            type="tel"
            name="phone"
            label="Telefoonnummer"
            value={formData.phone}
            onChange={handleChange}
            placeholder="06-12345678"
            error={errors.phone}
            data-cy="phone"
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
            data-cy="address"
          />

          <div className="form-row">
            <Input
              type="text"
              name="postcode"
              label="Postcode"
              value={formData.postcode}
              onChange={handleChange}
              placeholder="1234 AB"
              error={errors.postcode}
              required
              data-cy="postcode"
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
              data-cy="city"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            loading={loading}
            data-cy="submit-order"
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
