import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import Button from '../components/common/Button';
import './OrdersPage.css';

function OrdersPage() {
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const newOrderId = location.state?.newOrderId;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await ordersAPI.getAll();
        setOrders(response.data.orders);
      } catch (err) {
        setError('Kon bestellingen niet laden');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'In behandeling',
      processing: 'Wordt verwerkt',
      shipped: 'Verzonden',
      delivered: 'Geleverd',
      cancelled: 'Geannuleerd'
    };
    return labels[status] || status;
  };

  if (loading) {
    return <div className="loading-container">Bestellingen laden...</div>;
  }

  return (
    <div className="container orders-page" data-cy="orders-page">
      <h1 className="page-title">Mijn Bestellingen</h1>

      {newOrderId && (
        <div className="success-message" data-cy="order-success">
          Je bestelling is succesvol geplaatst!
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {orders.length === 0 ? (
        <div className="no-orders" data-cy="no-orders">
          <p>Je hebt nog geen bestellingen geplaatst</p>
          <Link to="/products">
            <Button variant="primary">Bekijk producten</Button>
          </Link>
        </div>
      ) : (
        <div className="orders-list" data-cy="orders-list">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`order-card ${newOrderId === order.id ? 'order-new' : ''}`}
              data-cy="order-card"
            >
              <div className="order-header">
                <div className="order-info">
                  <span className="order-id" data-cy="order-id">
                    Bestelling #{order.id.substring(0, 8)}
                  </span>
                  <span className="order-date" data-cy="order-date">
                    {formatDate(order.createdAt)}
                  </span>
                </div>
                <span className={`order-status status-${order.status}`} data-cy="order-status">
                  {getStatusLabel(order.status)}
                </span>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">x {item.quantity}</span>
                    <span className="item-price">{formatPrice(item.subtotal)}</span>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="shipping-info">
                  <strong>Verzendadres:</strong>
                  <span>
                    {order.shippingInfo.name}, {order.shippingInfo.address},{' '}
                    {order.shippingInfo.postalCode} {order.shippingInfo.city}
                  </span>
                </div>
                <div className="order-total" data-cy="order-total">
                  Totaal: {formatPrice(order.total)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
