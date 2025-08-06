import { css } from '@emotion/react';

export const globalStyles = css`
  :root {
    --bg-primary: #1e1e1e;
    --text-primary: #e0e0e0;
    --accent: #64ffda;
  }

  .light {
    --bg-primary: #ffffff;
    --text-primary: #333333;
    --accent: #2962ff;
  }

  .terminal {
    --bg-primary: #000000;
    --text-primary: #00ff00;
    --accent: #ff0099;
  }

  body {
    margin: 0;
    font-family: 'Fira Code', monospace;
    background: var(--bg-primary);
    color: var(--text-primary);
  }

  .app {
    display: flex;
    height: 100vh;
  }

  .controls-panel {
    width: 250px;
    padding: 20px;
    border-right: 1px solid var(--accent);
  }
  .sound-controls, .theme-selector {
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.1);
  }

  .volume-control {
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  input[type="range"] {
    width: 100%;
    accent-color: var(--accent);
  }
    
`;