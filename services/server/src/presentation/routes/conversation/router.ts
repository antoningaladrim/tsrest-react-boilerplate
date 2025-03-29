import { initServer } from '@ts-rest/fastify';
import { ConversationRestApiContract } from '@tsrest-react-boilerplate/api';
import { FastifyInstance } from 'fastify';
import { getMessagesControllerLive } from '../../../live';

export const addConversationRouter = async (app: FastifyInstance) => {
  const s = initServer();

  const conversationController = getMessagesControllerLive();

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
    sendMessage: async ({ body }) => {
      const responseBody = await conversationController.sendMessage(body);

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
