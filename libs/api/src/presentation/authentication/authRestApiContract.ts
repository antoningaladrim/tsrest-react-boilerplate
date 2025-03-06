import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import {
  BadRequestError,
  InternalServiceError,
  UnauthorizedError,
} from '../errors';
import { loginPayload, registerPayload, user } from './schemas';

const c = initContract();

export const authRestApiContract = c.router(
  {
    login: {
      method: 'POST',
      path: '/login',
      responses: {
        200: user,
        401: UnauthorizedError,
        500: InternalServiceError,
      },
      body: loginPayload,
      summary: 'Log the user in',
    },
    me: {
      method: 'GET',
      path: '/me',
      responses: {
        200: z.union([user, z.null()]),
        500: InternalServiceError,
      },
      summary: 'Get the current user',
    },
    logout: {
      method: 'POST',
      path: '/logout',
      responses: {
        204: z.void(),
        500: InternalServiceError,
      },
      body: z.void(),
      summary: 'Log the user out',
    },
    register: {
      method: 'POST',
      path: '/register',
      responses: {
        200: user,
        400: BadRequestError,
        500: InternalServiceError,
      },
      body: registerPayload,
      summary: 'Register a new user',
    },
  },
  { pathPrefix: '/api/auth' }
);
