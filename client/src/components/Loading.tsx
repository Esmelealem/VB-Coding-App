/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
interface LoadingProps {
  fullscreen?: boolean;
}
const spinner = css`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 3px solid var(--accent);
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
`;

export function Loading({ fullscreen = false }: LoadingProps) {
  const containerStyles = css`
    display: flex;
    justify-content: center;
    align-items: center;
    ${fullscreen && `height: 100vh;`}
  `;

  return (
    <div css={containerStyles}>
      {/* <div css={spinner}></div> */}
      {/* Your loading spinner/indicator */}
      <div>Loading...</div>
    </div>
  );
}