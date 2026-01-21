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
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
        data-cy="username"
      />

      <Input
        type="password"
        name="password"
        label="Wachtwoord"
        value={formData.password}
        onChange={handleChange}
        placeholder="Uw wachtwoord"
        required
        data-cy="password"
      />

      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            data-cy="remember-me"
          />
          <span>Onthoud mij</span>
        </label>
      </div>

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

      <div className="test-accounts" data-cy="test-accounts">
        <h3 className="test-accounts-title">Test Accounts</h3>
        <p className="test-accounts-subtitle">
          Gebruik deze accounts om in te loggen:
        </p>
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
    </form>
  );
}

export default LoginForm;
