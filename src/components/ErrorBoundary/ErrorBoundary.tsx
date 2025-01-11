import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode; 
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    errorMessage: '',
  };

  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message || 'Something went wrong' };
  }

  componentDidCatch(error: any, info: any): void {
    console.error('ErrorBoundary caught an error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>Error: {this.state.errorMessage}</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

