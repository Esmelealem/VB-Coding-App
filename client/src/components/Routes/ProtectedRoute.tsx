/** @jsxImportSource @emotion/react */
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Loading } from '../Loading';
import { css } from '@emotion/react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireVerification?: boolean;
}

export function ProtectedRoute({ 
  children, 
  redirectTo = '/login',
  requireVerification = true
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      `}>
        <Loading />
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate 
        to={redirectTo} 
        replace 
        state={{ 
          from: location.pathname,
          search: location.search,
          hash: location.hash
        }} 
      />
    );
  }

  if (requireVerification && user && !user.token) {
    return (
      <Navigate 
        to="/verify-email" 
        replace 
        state={{ 
          from: location,
          message: 'Please verify your email to continue'
        }} 
      />
    );
  }

  return <>{children}</>;
}