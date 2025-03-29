import { initServer } from '@ts-rest/fastify';
import { ConversationRestApiContract } from '@tsrest-react-boilerplate/api';
import { FastifyInstance } from 'fastify';
import { getConversationControllerLive } from '../../../live';

export const addConversationRouter = async (app: FastifyInstance) => {
  const s = initServer();

  const conversationController = getConversationControllerLive();

  const router = s.router(ConversationRestApiContract, {
    findAll: async () => {
      const responseBody = await conversationController.findAll();

      return {
        status: 200,
        body: responseBody,
      };
    },
    findById: async ({ params }) => {
      const responseBody = await conversationController.findById(
        params.conversationId
      );

      return {
        status: 200,
        body: responseBody,
      };
    },
    prompt: async ({ body }) => {
      const responseBody = await conversationController.prompt(body);

      return {
        status: 201,
        body: responseBody,
      };
    },
  });

  s.registerRouter(ConversationRestApiContract, router, app, {
    responseValidation: true,
  });
};
