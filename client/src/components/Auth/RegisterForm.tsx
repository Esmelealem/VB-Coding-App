/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { useAuth } from '../../hooks/useAuth';
import { Button, TextField, Checkbox, FormControlLabel, Link } from '@mui/material';

const formStyles = css`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const titleStyles = css`
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--text-primary);
`;

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    if (!agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    await register(email, password, name); 
    navigate('/verify-email');
  } catch (error) {
    setErrors({
      ...errors,
      form: error instanceof Error ? error.message : 'Registration failed'
    });
  }
};

  return (
    <form css={formStyles} onSubmit={handleSubmit}>
      <h2 css={titleStyles}>Create an Account</h2>
      
      {errors.form && (
        <div css={{ color: 'var(--error)', marginBottom: '1rem' }}>
          {errors.form}
        </div>
      )}

      <TextField
        label="Full Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
      />

      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />

      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />

      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
      />

      <FormControlLabel
        control={
          <Checkbox 
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            color="primary"
          />
        }
        label={
          <span>
            I agree to the{' '}
            <Link href="/terms" css={{ color: 'var(--accent)' }}>
              Terms of Service
            </Link>
          </span>
        }
        css={{ margin: '1rem 0' }}
      />
      {errors.agreeToTerms && (
        <div css={{ color: 'var(--error)', marginBottom: '1rem' }}>
          {errors.agreeToTerms}
        </div>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        disabled={isLoading}
        css={{ marginTop: '1rem' }}
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>

      <div css={{ textAlign: 'center', marginTop: '1rem' }}>
        Already have an account?{' '}
        <Link href="/login" css={{ color: 'var(--accent)' }}>
          Sign in
        </Link>
      </div>
    </form>
  );
}