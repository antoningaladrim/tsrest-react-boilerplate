import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { paths } from '@/config/paths';
import LoginRoute from './routes/auth/Login';
import { ErrorBoundary, Home } from './routes/chat';
import NotFoundRoute from './routes/NotFound';

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: paths.auth.login.path,
      element: <LoginRoute />,
    },
    {
      path: paths.chat.path,
      element: <Home />,
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
