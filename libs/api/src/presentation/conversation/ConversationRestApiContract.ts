import { initContract } from '@ts-rest/core';
import {
  InternalServiceError,
  NotFoundError,
  UnauthorizedError,
} from '../errors';
import {
  zCompletionPayload,
  zCompletionResponse,
  zConversation,
  zFindAllConversationsResponseBody,
} from './schema';

const c = initContract();

export const ConversationRestApiContract = c.router(
  {
    findAll: {
      method: 'GET',
      path: '',
      responses: {
        200: zFindAllConversationsResponseBody,
        401: UnauthorizedError,
        500: InternalServiceError,
      },
      summary: 'Find all conversations',
    },
    findById: {
      method: 'GET',
      path: '/:conversationId',
      responses: {
        200: zConversation,
        401: UnauthorizedError,
        404: NotFoundError,
        500: InternalServiceError,
      },
      summary: 'Find a conversation by id',
    },
    prompt: {
      method: 'POST',
      path: '/prompt',
      responses: {
        201: zCompletionResponse,
        401: UnauthorizedError,
        404: NotFoundError,
        500: InternalServiceError,
      },
      body: zCompletionPayload,
      summary:
        'Send a prompt in a conversation. If conversationId is null, the conversation will be created',
    },
  },
  {
    pathPrefix: '/api/conversation',
  }
);
