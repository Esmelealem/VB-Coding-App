/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const sizeMap: Record<'small' | 'medium' | 'large', string> = {
  small: '16px',
  medium: '24px',
  large: '32px'
};

const borderMap: Record<'small' | 'medium' | 'large', string> = {
  small: '2px',
  medium: '3px',
  large: '4px'
};

export function LoadingSpinner({
  size = 'medium',
  color = 'currentColor',
  className
}: LoadingSpinnerProps) {
  const spinnerStyles = css`
    display: inline-block;
    width: ${sizeMap[size]};
    height: ${sizeMap[size]};
    border: ${borderMap[size]} solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: ${color};
    animation: ${spin} 800ms linear infinite;
    box-sizing: border-box;
  `;

  return (
    <span 
      css={spinnerStyles} 
      className={className}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    />
  );
}