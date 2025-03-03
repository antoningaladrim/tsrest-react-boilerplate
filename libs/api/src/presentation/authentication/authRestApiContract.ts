import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { InternalServiceError, UnauthorizedError } from '../errors';
import { loginPayload, LoginResponse, user } from './schemas';

const c = initContract();

export const authRestApiContract = c.router({
  login: {
    method: 'POST',
    path: '/api/auth/login',
    responses: {
      200: LoginResponse,
      401: UnauthorizedError,
      500: InternalServiceError,
    },
    body: loginPayload,
    summary: 'Log the user in',
  },
  me: {
    method: 'GET',
    path: '/api/auth/me',
    responses: {
      200: z.union([user, z.null()]),
      500: InternalServiceError,
    },
    summary: 'Get the current user',
  },
  logout: {
    method: 'POST',
    path: '/api/auth/logout',
    responses: {
      204: z.void(),
      500: InternalServiceError,
    },
    body: z.void(),
    summary: 'Log the user out',
  },
});
