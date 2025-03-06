import { paths } from '@/config/paths';
import type { LoginPayload, User } from '@tsrest-react-boilerplate/api';
import { configureAuth } from 'react-query-auth';
import { Navigate, useLocation } from 'react-router';

import { tsr } from './api-client';

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features

const getUser = async (): Promise<User | null> => {
  const response = await tsr.auth.me.query();

  if (response.status !== 200) {
    return null;
  }

  return response.body;
};

const logout = async (): Promise<void> => {
  const response = await tsr.auth.logout.mutate({ body: undefined });

  if (response.status !== 204) {
    throw new Error('Failed to logout');
  }
};

const login = async (body: LoginPayload): Promise<User> => {
  const response = await tsr.auth.login.mutate({ body });

  if (response.status !== 200) {
    throw new Error('Login failed');
  }

  return response.body;
};

const authConfig = {
  userFn: getUser,
  loginFn: async (data: LoginPayload) => await login(data),
  registerFn: () => {
    throw new Error('Registering is not implemented');
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, AuthLoader } =
  configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const location = useLocation();

  if (!user.data) {
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};
