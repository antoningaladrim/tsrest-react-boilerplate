import { initContract } from '@ts-rest/core';
import { InternalServiceError } from '../errors';
import { zCompletionPayload, zMessage } from './schema';

const c = initContract();

export const MessagesRestApiContract = c.router(
  {
    completion: {
      method: 'POST',
      path: '/send',
      responses: {
        200: zMessage,
        500: InternalServiceError,
      },
      body: zCompletionPayload,
      summary: 'Send a message',
    },
  },
  {
    pathPrefix: '/api/messages',
  }
);
