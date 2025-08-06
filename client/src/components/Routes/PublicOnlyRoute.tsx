import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Loading } from '../Loading';

export function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading fullscreen />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}