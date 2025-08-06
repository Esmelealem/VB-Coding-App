/** @jsxImportSource @emotion/react */
import { Header } from './components/AppLayout/Header'; // Make sure this path is correct
import { MyEditorComponent } from './Editor';
import { SoundControls } from './components/SoundControls';
import { ThemeSelector } from './components/ThemeSelector';
import { Timer } from './components/Timer';
import { useVibeStore } from './stores/vibeStore';
import { globalStyles } from './styles/global';
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

const appStyles = (theme: string) => css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: background 0.3s ease, color 0.3s ease;

  .main-content {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  .controls-panel {
    width: 300px;
    padding: 20px;
    border-right: 1px solid var(--accent);
    overflow-y: auto;
    background: ${theme === 'dark' 
      ? 'rgba(0, 0, 0, 0.1)' 
      : 'rgba(255, 255, 255, 0.1)'};
  }

  .editor-container {
    flex: 1;
    overflow: hidden;
    position: relative;
  }

  @media (max-width: 768px) {
    .main-content {
      flex-direction: column;
    }
    
    .controls-panel {
      width: 100%;
      height: auto;
      border-right: none;
      border-bottom: 1px solid var(--accent);
    }
  }
`;

function App() {
  const { theme } = useVibeStore();

  useEffect(() => {
    document.documentElement.className = `${theme}-theme`;
  }, [theme]);

  return (
    <div css={[globalStyles, appStyles(theme)]}>
      {/* Header placed here - will appear at the top of the app */}
      <Header onMenuToggle={function (): void {
        throw new Error('Function not implemented.');
      } } isMobileOpen={false} />

        {/* <RouterProvider router={Router}/> */}
      <div className="main-content">
        <div className="controls-panel">
          <ThemeSelector />
          <SoundControls />
          <Timer />
        </div>
        <div className="editor-container">
          <MyEditorComponent />
        </div>
      </div>
    </div>
  );
}

export default App;