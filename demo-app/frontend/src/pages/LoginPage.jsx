import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';

function LoginPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading-container">Laden...</div>;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="container" data-cy="login-page">
      <LoginForm />
    </div>
  );
}

export default LoginPage;
