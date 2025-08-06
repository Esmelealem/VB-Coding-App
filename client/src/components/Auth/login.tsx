/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LoadingSpinner } from './LoadingSpinner';

const loginContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  background: var(--bg-primary);
`;

const loginForm = css`
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const inputStyle = css`
  width: 100%;
  padding: 0.875rem;
  margin-bottom: 1.25rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--accent);
  }
`;

const buttonStyle = css`
  width: 100%;
  padding: 0.875rem;
  margin: 0.5rem 0;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: var(--accent-dark);
  }

  &:disabled {
    background: var(--accent-light);
    cursor: not-allowed;
  }
`;

const linkStyle = css`
  display: block;
  text-align: center;
  margin-top: 1.5rem;
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const errorStyle = css`
  color: var(--error);
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--error-bg);
  border-radius: 4px;
  text-align: center;
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/app';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Login failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div css={loginContainer}>
      <form css={loginForm} onSubmit={handleSubmit}>
        <h2 css={{ textAlign: 'center', marginBottom: '2rem' }}>Welcome Back</h2>
        
        {error && <div css={errorStyle}>{error}</div>}

        <div css={{ marginBottom: '1rem' }}>
          <label htmlFor="email" css={{ display: 'block', marginBottom: '0.5rem' }}>
            Email
          </label>
          <input
            css={inputStyle}
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div css={{ marginBottom: '1.5rem' }}>
          <label htmlFor="password" css={{ display: 'block', marginBottom: '0.5rem' }}>
            Password
          </label>
          <input
            css={inputStyle}
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>

        <button css={buttonStyle} type="submit" disabled={isLoading}>
          {isLoading ? <LoadingSpinner size="small" /> : 'Log In'}
        </button>

        <Link to="/forgot-password" css={linkStyle}>
          Forgot password?
        </Link>

        <div css={{ marginTop: '2rem', textAlign: 'center' }}>
          <span css={{ color: 'var(--text-secondary)' }}>Don't have an account? </span>
          <Link to="/register" css={{ color: 'var(--accent)', fontWeight: 500 }}>
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}