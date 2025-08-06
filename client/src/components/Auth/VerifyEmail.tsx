/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Loading } from '../Loading';
import { Button } from '../Pages/Button';
import { css } from '@emotion/react';

const containerStyles = css`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;
`;

export default function VerifyEmail() {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const { user, verifyEmail, resendVerification } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if no email to verify
  useEffect(() => {
    if (!user?.email) {
      navigate('/register', { state: { from: location.pathname } });
    } else if (user.token) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError('');
    
    try {
      await verifyEmail(code);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendVerification();
      setError(''); // Clear any previous errors
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend code');
    }
  };

  if (!user?.email) {
    return <Loading fullscreen />;
  }

  return (
    <div css={containerStyles}>
      <h2>Verify Your Email</h2>
      <p>We've sent a verification code to {user.email}</p>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter verification code"
          required
        />
        
        <Button type="submit" disabled={isVerifying}>
          {isVerifying ? 'Verifying...' : 'Verify Email'}
        </Button>
        
        {error && <p className="error">{error}</p>}
      </form>

      <div style={{ marginTop: '1rem' }}>
        <p>Didn't receive a code?</p>
        <Button 
          variant="text" 
          onClick={handleResend}
          disabled={isVerifying}
        >
          Resend Verification Email
        </Button>
      </div>
    </div>
  );
}