/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ThemeSelector } from '../ThemeSelector';
import { SoundControls } from '../SoundControls';
import { Timer } from '../Timer';

interface SidebarProps {
  isMobileOpen?: boolean;
  onClose?: () => void;
}
const sidebarStyles = (isMobileOpen: boolean = true) => css`
  width: 300px;
  padding: 20px;
  border-right: 1px solid var(--border-color);
  background: var(--bg-secondary);
  height: 100vh;
  position: fixed;
  z-index: 100;
  transition: transform 0.3s ease;

  /* Mobile styles */
  @media (max-width: 768px) {
    transform: ${isMobileOpen ? 'translateX(0)' : 'translateX(-100%)'};
    box-shadow: ${isMobileOpen ? '2px 0 10px rgba(0,0,0,0.1)' : 'none'};
  }
  /* Desktop styles */
  @media (min-width: 769px) {
    position: relative;
    transform: none !important;
  }
`;

const closeButtonStyles = css`
  display: none;
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-color);

  @media (max-width: 768px) {
    display: block;
  }
`;

export function Sidebar({ isMobileOpen = true, onClose }: SidebarProps) {
  return (
    <aside css={sidebarStyles(isMobileOpen)}>
      {/* Mobile close button (only visible on mobile) */}
      {onClose && (
        <button css={closeButtonStyles} onClick={onClose} aria-label="Close menu">
          ×
        </button>
      )}

      {/* Existing sidebar content */}
      <ThemeSelector />
      <SoundControls />
      <Timer />
    </aside>
  );
}