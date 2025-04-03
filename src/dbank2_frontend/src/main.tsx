import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.scss';


// App.tsx
import ErrorBoundary from './components/ErrorBoundary';
import DefaultErrorFallback from './components/DefaultErrorFallback';

function App() {
  return (
    <ErrorBoundary
      // Optional: Still supports custom fallback
      fallback={(error) => (
        <DefaultErrorFallback 
          error={error} 
          onReset={() => window.location.reload()} 
        />
      )}
    >
      <App />
    </ErrorBoundary>
  );
}