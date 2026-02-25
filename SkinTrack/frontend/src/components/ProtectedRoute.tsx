import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-zinc-300">Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  return children;
};

export default ProtectedRoute;
