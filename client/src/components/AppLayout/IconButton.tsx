/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode } from 'react';

interface IconButtonProps {
  children: ReactNode;
  onClick: () => void;
  ariaLabel: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'ghost' | 'bare';
  css?: ReturnType<typeof css>;
}

export function IconButton({
  children,
  onClick,
  ariaLabel,
  size = 'medium',
  variant = 'default',
  ...props
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      css={[buttonStyles, sizeStyles[size], variantStyles[variant], props.css]}
      type="button"
    >
      {children}
    </button>
  );
}

const buttonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 50%;
  padding: 0;
  line-height: 1;

  &:focus {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const sizeStyles = {
  small: css`
    width: 32px;
    height: 32px;
    font-size: 16px;
  `,
  medium: css`
    width: 40px;
    height: 40px;
    font-size: 20px;
  `,
  large: css`
    width: 48px;
    height: 48px;
    font-size: 24px;
  `,
};

const variantStyles = {
  default: css`
    background-color: #007bff;
    color: white;

    &:hover {
      background-color: #0069d9;
    }
  `,
  ghost: css`
    background-color: transparent;
    color: #007bff;
    border: 1px solid #007bff;

    &:hover {
      background-color: rgba(0, 123, 255, 0.1);
    }
  `,
  bare: css`
    background-color: transparent;
    color: currentColor;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  `,
};