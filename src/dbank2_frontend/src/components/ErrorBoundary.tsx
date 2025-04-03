import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: (error: Error) => React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null
  };

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    // Log to error reporting service (e.g., Sentry) here
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() render() {
    if (this.state.hasError) {
      return this.props.fallback 
        ? this.props.fallback(this.state.error) 
        : <DefaultErrorFallback 
            error={this.state.error} 
            onReset={this.handleReset} 
          />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

// In ErrorBoundary.tsx
