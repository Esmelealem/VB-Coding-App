/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserAvatar } from './UserAvator'

const dropdownStyles = css`
  position: relative;
  display: inline-block;
`;
const dropdownButtonStyles = css`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.2s;
  &:hover {
    background-color: var(--hover-bg);
  }
`;

const menuStyles = (isOpen: boolean) => css`
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  min-width: 200px;
  background: var(--bg-secondary);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1000;
  opacity: ${isOpen ? 1 : 0};
  transform: ${isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  visibility: ${isOpen ? 'visible' : 'hidden'};
  transition: all 0.2s ease;
  border: 1px solid var(--border-color);
`;

const menuItemStyles = css`
  display: block;
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--hover-bg);
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }
`;

interface UserDropdownProps {
  user: {
    name?: string;
    email: string;
    avatar?: string;
  };
  onLogout: () => void; 
}

export function UserDropdown({ user }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (path?: string) => {
    setIsOpen(false);
    if (path) navigate(path);
  };

  return (
    <div css={dropdownStyles} ref={dropdownRef}>
      <button 
        css={dropdownButtonStyles}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="User menu"
      >
        <UserAvatar user={user} />
        <span>{user.name || user.email.split('@')[0]}</span>
      </button>

      <div css={menuStyles(isOpen)}>
        {user.name && (
          <div css={css`
            padding: 12px 16px;
            border-bottom: 1px solid var(--border-color);
          `}>
            <div css={css` font-weight: 500; `}>{user.name}</div>
            <div css={css` font-size: 0.8rem; color: var(--text-secondary); `}>
              {user.email}
            </div>
          </div>
        )}

        <button 
          css={menuItemStyles}
          onClick={() => handleItemClick('/profile')}
        >
          Profile Settings
        </button>

        <button 
          css={menuItemStyles}
          onClick={() => handleItemClick('/settings')}
        >
          App Preferences
        </button>

        <button 
          css={menuItemStyles}
          onClick={() => {
            logout();
            handleItemClick();
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}