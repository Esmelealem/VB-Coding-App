/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

type ButtonVariant = 'primary' | 'outlined' | 'text' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const baseStyles = css`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
`;

const variantStyles = {
  primary: css`
    background: #3f51b5;
    color: white;
    border: none;
    &:hover {
      background: #303f9f;
    }
  `,
  outlined: css`
    background: transparent;
    color: #3f51b5;
    border: 1px solid #3f51b5;
    &:hover {
      background: rgba(63, 81, 181, 0.04);
    }
  `,
  text: css`
    background: transparent;
    color: #3f51b5;
    border: none;
    &:hover {
      background: rgba(63, 81, 181, 0.04);
    }
  `,
  ghost: css`
    background: transparent;
    border: none;
    color: inherit;
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  `,
};

export function Button({
  variant = 'primary',
  children,
  ...props
}: ButtonProps) {
  return (
    
    <button
      css={[baseStyles, variantStyles[variant]]}
      {...props}
    >
      {children}
    </button>
  );
}