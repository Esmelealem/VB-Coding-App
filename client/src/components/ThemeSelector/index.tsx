import styled from '@emotion/styled';
import { useVibeStore } from '../../stores/vibeStore';

const themeOptions = [
  { id: 'dark', name: 'Dark', icon: '🌙' },
  { id: 'light', name: 'Light', icon: '☀️' },
  { id: 'terminal', name: 'Terminal', icon: '💻' }
];

const ThemeButton = styled.button<{ isActive: boolean }>`
  background: ${props => props.isActive ? 'var(--accent)' : 'transparent'};
  border: 1px solid var(--accent);
  border-radius: 8px;
  padding: 8px 12px;
  margin: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export function ThemeSelector() {
  const { theme, setTheme } = useVibeStore();

  return (
    <div className="theme-selector">
      <h3>Theme</h3>
      <div className="theme-buttons">
        {themeOptions.map(({ id, name, icon }) => (
          <ThemeButton
            key={id}
            onClick={() => setTheme(id as any)}
            isActive={theme === id}
            aria-label={`${name} theme`}
          >
            {icon} {name}
          </ThemeButton>
        ))}
      </div>
    </div>
  );
}