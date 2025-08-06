/** @jsxImportSource @emotion/react */
import { Component, ErrorInfo, ReactNode, useState } from 'react';
import { css } from '@emotion/react';
import { ErrorPage } from './index';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

const errorBoundaryStyles = css`
  width: 100%;
  height: 100%;
`;

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
    this.props.onError?.(error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div css={errorBoundaryStyles}>
          <ErrorPage 
            status={500} 
            error={this.state.error} 
          />
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
export function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);

  if (error) {
    return (
      <div css={errorBoundaryStyles}>
        <ErrorPage status={500} error={error} />
      </div>
    );
  }

  return setError;
}