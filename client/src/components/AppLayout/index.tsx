/** @jsxImportSource @emotion/react */
import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../hooks/useAuth';
import { Loading } from '../Loading';
import { useState } from 'react';
import { StatusBar } from './StatusBar';
import { useVibeStore } from '../../stores/vibeStore';

export function AppLayout() {
  const { user, isLoading } = useAuth();
  const { theme } = useVibeStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isLoading || !user) {
    return <Loading fullscreen />;
  }
  return (
    <div css={[layoutStyles, themeStyles(theme)]}>
      <Header 
        onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        isMobileOpen={mobileMenuOpen}
      />
      <Sidebar isMobileOpen={mobileMenuOpen} />
      <main css={mainStyles}>
        <Outlet />
      </main>
      <StatusBar />
    </div>
  );
}

// Base layout styles
const layoutStyles = css`
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: minmax(200px, 240px) 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

// Theme-specific styles
const themeStyles = (theme: string) => css`
  background-color: ${theme === 'dark' ? '#1e1e1e' : '#f5f5f5'};
  color: ${theme === 'dark' ? '#e0e0e0' : '#333'};
`;

const mainStyles = css`
  grid-area: main;
  padding: 1.5rem;
  overflow-y: auto;
  background: var(--bg-primary);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Mobile-specific styles
const mobileStyles = css`
  @media (max-width: 768px) {
    grid-template-areas:
      "header"
      "main"
      "footer";
    grid-template-columns: 1fr;
    
    & > aside {
      position: fixed;
      z-index: 100;
      width: 80vw;
      height: 100vh;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      
      &.mobile-open {
        transform: translateX(0);
      }
    }
  }
`;