/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useVibeStore } from '../../stores/vibeStore';
import { css } from '@emotion/react';
import { Loading } from '../Loading';
import { Button } from './Button';

const dashboardStyles = css`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const cardGridStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const cardStyles = css`
  padding: 1.5rem;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export default function Dashboard() {
  const { user, isLoading, logout } = useAuth();
  const { user: storeUser } = useVibeStore();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login', { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) {
    return <Loading fullscreen />;
  }

  // If user exists but isn't verified, redirect to verification page
  if (user && !user.isVerified) {
    navigate('/verify-email', { replace: true });
    return null;
  }

  return (
    // <div css={dashboardStyles}>
      <div css={dashboardStyles}>
      <header css={headerStyles}>
        <h1>Welcome, {user.name || user.email.split('@')[0]}!</h1>
        <Button 
          variant="outlined" 
          onClick={() => logout()}
        >
          Sign Out
        </Button>
      </header>

      <div css={cardGridStyles}>
        <div css={cardStyles}>
          <h2>Your Profile</h2>
          <p>Email: {user.email}</p>
          <p>Status: {user.isVerified ? 'Verified' : 'Pending Verification'}</p>
        </div>

        <div css={cardStyles}>
          <h2>Quick Actions</h2>
          <Button onClick={() => navigate('/profile')}>
            Edit Profile
          </Button>
        </div>

        <div css={cardStyles}>
          <h2>Recent Activity</h2>
          <p>Last login: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}