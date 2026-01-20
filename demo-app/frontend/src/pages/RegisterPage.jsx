import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import './RegisterPage.css';

function RegisterPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading, register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (authLoading) {
    return <div className="loading-container">Laden...</div>;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

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

    if (!formData.email.trim()) {
      newErrors.email = 'E-mailadres is verplicht';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ongeldig e-mailadres';
    }

    if (!formData.password) {
      newErrors.password = 'Wachtwoord is verplicht';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Wachtwoord moet minimaal 6 tekens zijn';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Wachtwoorden komen niet overeen';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setErrors({
        general: err.response?.data?.error || 'Registratie mislukt'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" data-cy="register-page">
      <form className="register-form" onSubmit={handleSubmit} data-cy="register-form">
        <h1 className="form-title">Registreren</h1>

        {errors.general && (
          <div className="error-message" data-cy="register-error">
            {errors.general}
          </div>
        )}

        <Input
          type="text"
          name="name"
          label="Naam"
          value={formData.name}
          onChange={handleChange}
          placeholder="Uw naam"
          error={errors.name}
          required
          data-cy="name-input"
        />

        <Input
          type="email"
          name="email"
          label="E-mailadres"
          value={formData.email}
          onChange={handleChange}
          placeholder="uw@email.nl"
          error={errors.email}
          required
          data-cy="email-input"
        />

        <Input
          type="password"
          name="password"
          label="Wachtwoord"
          value={formData.password}
          onChange={handleChange}
          placeholder="Minimaal 6 tekens"
          error={errors.password}
          required
          data-cy="password-input"
        />

        <Input
          type="password"
          name="confirmPassword"
          label="Bevestig wachtwoord"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Herhaal wachtwoord"
          error={errors.confirmPassword}
          required
          data-cy="confirm-password-input"
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
          data-cy="register-button"
        >
          Registreren
        </Button>

        <p className="form-footer">
          Heeft u al een account?{' '}
          <Link to="/login" data-cy="login-link">
            Inloggen
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
