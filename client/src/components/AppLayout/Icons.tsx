/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const iconBaseStyle = css`
  width: 1.25em;
  height: 1.25em;
  display: block;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

export function MenuIcon() {
  return (
    <svg css={iconBaseStyle} viewBox="0 0 24 24">
      <path d="M3 12h18" />
      <path d="M3 6h18" />
      <path d="M3 18h18" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg css={iconBaseStyle} viewBox="0 0 24 24">
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

// Optional: Add more icons for future use
export function UserIcon() {
  return (
    <svg css={iconBaseStyle} viewBox="0 0 24 24">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function ChevronDownIcon() {
  return (
    <svg css={iconBaseStyle} viewBox="0 0 24 24">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}