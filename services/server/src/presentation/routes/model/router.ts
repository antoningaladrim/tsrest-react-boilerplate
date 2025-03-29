import { initServer } from '@ts-rest/fastify';
import { ModelRestApiContract } from '@tsrest-react-boilerplate/api';
import { FastifyInstance } from 'fastify';
import { getModelControllerLive } from '../../../live';

export const addModelRouter = async (app: FastifyInstance) => {
  const s = initServer();

  const modelController = getModelControllerLive();

  const router = s.router(ModelRestApiContract, {
    findAll: async () => {
      const responseBody = await modelController.findAll();

      return {
        status: 200,
        body: responseBody,
      };
    },
  });

  s.registerRouter(ModelRestApiContract, router, app, {
    responseValidation: true,
  });
};
