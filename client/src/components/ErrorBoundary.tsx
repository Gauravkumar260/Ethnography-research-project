'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

function ErrorFallback() {
  const t = useTranslations('ErrorBoundary');
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9] p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
          {t('title')}
        </h2>
        <p className="text-[#1a1a1a]/70 mb-6">
          {t('message')}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-[#99302A] text-white rounded hover:bg-[#99302A]/90 transition-colors"
        >
          {t('reload')}
        </button>
      </div>
    </div>
  );
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Error logged for debugging
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;