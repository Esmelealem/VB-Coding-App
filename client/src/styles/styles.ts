import { css } from '@emotion/react';

export const errorPageStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  text-align: center;
  background: var(--bg-primary);
  color: var(--text-primary);

  h1 {
    color: var(--error);
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    margin: 0.5rem 0;
    font-size: 1.2rem;
  }
`;