import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../common/Input';
import Button from '../common/Button';
import './LoginForm.css';

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Inloggen mislukt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit} data-cy="login-form">
      <h1 className="form-title">Inloggen</h1>

      {error && (
        <div className="error-message" data-cy="login-error">
          {error}
        </div>
      )}

      <Input
        type="email"
        name="email"
        label="E-mailadres"
        value={formData.email}
        onChange={handleChange}
        placeholder="uw@email.nl"
        required
        data-cy="email-input"
      />

      <Input
        type="password"
        name="password"
        label="Wachtwoord"
        value={formData.password}
        onChange={handleChange}
        placeholder="Uw wachtwoord"
        required
        data-cy="password-input"
      />

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={loading}
        data-cy="login-button"
      >
        Inloggen
      </Button>

      <p className="form-footer">
        Nog geen account?{' '}
        <Link to="/register" data-cy="register-link">
          Registreer hier
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
