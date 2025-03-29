import { initContract } from '@ts-rest/core';
import { InternalServiceError, UnauthorizedError } from '../errors';
import { zModel } from './schema';

const c = initContract();

export const ModelRestApiContract = c.router(
  {
    findAll: {
      method: 'GET',
      path: '',
      responses: {
        200: zModel.array().readonly(),
        401: UnauthorizedError,
        500: InternalServiceError,
      },
      summary: 'Find all available models',
    },
  },
  {
    pathPrefix: '/api/model',
  }
);
