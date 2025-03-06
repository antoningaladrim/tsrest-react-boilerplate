import { initServer } from '@ts-rest/fastify';
import { authRestApiContract } from '@tsrest-react-boilerplate/api';
import { FastifyInstance } from 'fastify';
import { getAuthControllerLive } from '../../../live';

export const addAuthRouter = async (app: FastifyInstance) => {
  const s = initServer();

  const authController = getAuthControllerLive();

  const router = s.router(authRestApiContract, {
    login: async ({ body }) => {
      const res = await authController.login(body);
      return {
        status: 200,
        body: res,
      };
    },
    logout: async ({ request }) => {
      const res = await authController.logout(request);
      return {
        status: 204,
        body: res,
      };
    },
    me: async ({ request }) => {
      const res = await authController.me(request);
      return {
        status: 200,
        body: res,
      };
    },
    register: async ({ body }) => {
      const res = await authController.register(body);
      return {
        status: 200,
        body: res,
      };
    },
  });

  s.registerRouter(authRestApiContract, router, app, {
    responseValidation: true,
  });
};
