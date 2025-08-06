/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useActiveFile, useEditorStore } from '../../stores/editorStore';
import { useVibeStore } from '../../stores/vibeStore';
import { useEffect, useState } from 'react';

export function StatusBar() {
    const { cursorPosition } = useEditorStore();
    const activeFile = useActiveFile();

  const { theme } = useVibeStore();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <footer css={[statusBarStyles, themeStyles(theme)]}>
      <div css={leftSection}>
        <span css={statusItem}>
          {cursorPosition.line}:{cursorPosition.column}
        </span>
        <span css={statusItem}>
          {activeFile?.language || 'Plain Text'}
        </span>
        <span css={statusItem}>
          UTF-8
        </span>
      </div>
      
      <div css={rightSection}>
        <span css={statusItem}>
          {activeFile?.indentation === 'spaces' 
            ? `${activeFile?.indentSize} Spaces` 
            : 'Tab'}
        </span>
        <span css={statusItem}>
          {formatTime(currentTime)}
        </span>
      </div>
    </footer>
  );
}

// Base styles
const statusBarStyles = css`
  grid-area: footer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  padding: 0 12px;
  font-size: 12px;
  font-family: 'Fira Code', monospace;
  border-top: 1px solid;
`;

// Theme variants
const themeStyles = (theme: string) => css`
  background-color: ${theme === 'dark' ? '#252526' : '#e0e0e0'};
  border-color: ${theme === 'dark' ? '#3c3c3c' : '#d0d0d0'};
  color: ${theme === 'dark' ? '#e0e0e0' : '#333'};
`;

// Section layouts
const sectionStyles = css`
  display: flex;
  gap: 16px;
`;

const leftSection = css`
  ${sectionStyles};
  margin-right: auto;
`;

const rightSection = css`
  ${sectionStyles};
  margin-left: auto;
`;

// Status item styles
const statusItem = css`
  display: flex;
  align-items: center;
  white-space: nowrap;

  &:not(:last-child)::after {
    content: '|';
    margin-left: 16px;
    opacity: 0.6;
  }
`;