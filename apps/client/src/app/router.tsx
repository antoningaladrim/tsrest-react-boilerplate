import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { paths } from '@/config/paths';
import { ProtectedRoute } from '@/lib/auth';
import { ErrorBoundary, Home } from './routes/app';
import LoginRoute from './routes/auth/Login';
import LandingRoute from './routes/Landing';
import NotFoundRoute from './routes/NotFound';

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: paths.home.path,
      element: <LandingRoute />,
    },
    {
      path: paths.auth.login.path,
      element: <LoginRoute />,
    },
    {
      path: paths.app.root.path,
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
      ErrorBoundary,
    },
    {
      path: '*',
      element: <NotFoundRoute />,
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
