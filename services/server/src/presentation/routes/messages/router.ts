import { initServer } from '@ts-rest/fastify';
import { MessagesRestApiContract } from '@tsrest-react-boilerplate/api';
import { FastifyInstance } from 'fastify';
import { getMessagesControllerLive } from '../../../live';

export const addMessagesRouter = async (app: FastifyInstance) => {
  const s = initServer();

  const chatController = getMessagesControllerLive();

  const router = s.router(MessagesRestApiContract, {
    send: async ({ body }) => {
      const responseBody = await chatController.complete({
        messages: body.messages,
        model: body.model,
      });

      return {
        status: 200,
        body: responseBody,
      };
    },
  });

  s.registerRouter(MessagesRestApiContract, router, app, {
    responseValidation: true,
  });
};
