// src/components/DefaultErrorFallback.tsx
import React from 'react';

interface DefaultErrorFallbackProps {
  error: Error | null;
  onReset: () => void;
}

const DefaultErrorFallback: React.FC<DefaultErrorFallbackProps> = ({ error, onReset }) => {
  return (
    <div className="error-fallback" role="alert">
      <h2>Oops! Something went wrong</h2>
      <div className="error-details">
        <p>{error?.message || 'An unknown error occurred'}</p>
        {process.env.NODE_ENV === 'development' && (
          <details className="error-stack">
            <summary>Stack trace</summary>
            <pre>{error?.stack}</pre>
          </details>
        )}
      </div>
      <button 
        className="retry-button" 
        onClick={onReset}
        aria-label="Retry"
      >
        Retry
      </button>
    </div>
  );
};

export default DefaultErrorFallback;