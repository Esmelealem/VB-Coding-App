/** @jsxImportSource @emotion/react */
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { css } from '@emotion/react';
import { Button } from '../Pages/Button';

const errorPageStyles = (status?: number) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 2rem;
  color: ${status === 404 ? '#4a5568' : '#e53e3e'};

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    max-width: 600px;
  }
`;

const statusMessages: Record<number, string> = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Page Not Found',
  500: 'Internal Server Error',
  503: 'Service Unavailable'
};

interface ErrorPageProps {
  status?: number;
  error?: Error;
}

export function ErrorPage({ status, error }: ErrorPageProps) {
  // const error = useRouteError();
  const isRouteError = isRouteErrorResponse(error);
  
  // Determine status code
  const errorStatus = status || (isRouteError ? error.status : 500);
  const statusText = isRouteError ? error.statusText : undefined;
{error?.stack && (
    <details css={css` margin-top: 1rem; `}>
      <summary>Technical details</summary>
      <pre css={css` 
        white-space: pre-wrap;
        font-family: monospace;
      `}>
        {error.stack}
      </pre>
    </details>
  )}
  // Get appropriate message
  const defaultMessage = statusMessages[errorStatus] || 'Something went wrong';
  const errorMessage = statusText || 
                      (error instanceof Error ? error.message : 
                      typeof error === 'string' ? error : 
                      defaultMessage);

  console.error('Error occurred:', error);

  return (
    <div css={errorPageStyles(errorStatus)}>
      <h1>{errorStatus}</h1>
      <p>{errorMessage}</p>
      
      {errorStatus === 401 && (
        <Button onClick={() => window.location.href = '/login'}>
          Go to Login
        </Button>
      )}

      {errorStatus === 404 && (
        <Button onClick={() => window.location.href = '/'}>
          Return Home
        </Button>
      )}

      {(errorStatus === 500 || errorStatus === 503) && (
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      )}
    </div>
  );
}