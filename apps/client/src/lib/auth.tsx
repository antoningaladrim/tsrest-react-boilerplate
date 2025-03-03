import { paths } from '@/config/paths';
import type {
  LoginPayload,
  LoginResponse,
  User,
} from '@tsrest-react-boilerplate/api';
import { configureAuth } from 'react-query-auth';
import { Navigate, useLocation } from 'react-router';
import { z } from 'zod';

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

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(5, 'Required'),
});

const loginWithEmailAndPassword = async (
  body: LoginPayload
): Promise<LoginResponse> => {
  const response = await tsr.auth.login.mutate({ body });

  if (response.status !== 200) {
    throw new Error('Login failed');
  }

  return response.body;
};

const authConfig = {
  userFn: getUser,
  loginFn: async (data: LoginPayload) => {
    const response = await loginWithEmailAndPassword(data);
    return response.user;
  },
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
