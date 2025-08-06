/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IconButton } from './IconButton';
import { MenuIcon, CloseIcon } from './Icons';

interface HeaderProps {
  onMenuToggle: () => void;
  isMobileOpen: boolean;
}

export function Header({ onMenuToggle, isMobileOpen }: HeaderProps) {
  return (
    <header css={headerStyles}>
      <div css={headerContent}>
        <IconButton
          onClick={onMenuToggle}
          ariaLabel={isMobileOpen ? 'Close menu' : 'Open menu'}
          css={menuButtonStyle}
        >
          {isMobileOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        
        <div css={titleContainer}>
          <h1 css={titleStyle}>My Application</h1>
        </div>
        
        <div css={userControls}>
          {/* Add user avatar/controls here */}
        </div>
      </div>
    </header>
  );
}

const headerStyles = css`
  grid-area: header;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const headerContent = css`
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 1.5rem;
  max-width: 100vw;
`;

const menuButtonStyle = css`
  margin-right: 1rem;
  @media (min-width: 768px) {
    display: none;
  }
`;

const titleContainer = css`
  flex-grow: 1;
`;

const titleStyle = css`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
`;

const userControls = css`
  display: flex;
  gap: 1rem;
`;