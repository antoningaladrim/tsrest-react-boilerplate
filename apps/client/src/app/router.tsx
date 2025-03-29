import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { paths } from '@/config/paths';
import LoginRoute from './routes/auth/Login';
import { ChatRoute } from './routes/chat/Chat';
import { ChatLayoutRoute } from './routes/chat/layout';
import NotFoundRoute from './routes/NotFound';

const ErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: paths.auth.login.path,
      element: <LoginRoute />,
    },
    {
      path: paths.chatLayout.path,
      element: <ChatLayoutRoute />,
      children: [
        {
          path: paths.chat.path,
          element: <ChatRoute />,
          errorElement: <ErrorBoundary />,
        },
      ],
      errorElement: <ErrorBoundary />,
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
