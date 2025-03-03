import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';

import { MainErrorFallback } from '@/components/errors/main';
import { Spinner } from '@/components/ui/spinner';
import { tsr } from '@/lib/api-client';
import { AuthLoader } from '@/lib/auth';
import { queryConfig } from '@/lib/react-query';
import { Toaster } from 'react-hot-toast';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      })
  );

  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <tsr.ReactQueryProvider>
              {import.meta.env.DEV && <ReactQueryDevtools />}
              <Toaster />
              <AuthLoader
                renderLoading={() => (
                  <div className="flex h-screen w-screen items-center justify-center">
                    <Spinner />
                  </div>
                )}
              >
                {children}
              </AuthLoader>
            </tsr.ReactQueryProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
