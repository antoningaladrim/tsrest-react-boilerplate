import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { HttpError } from '../errors/HttpError';
import { NotFoundError } from '../errors/common';
import { response } from '../response.js';

/**
 * @see https://fastify.dev/docs/latest/Reference/Server/#seterrorhandler
 */
export const globalErrorHandler = async (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (
    process.env.NODE_ENV !== 'production' 
    // process.env.NODE_ENV !== 'test'
  ) {
    console.error(`Timestamp: ${new Date().toISOString()}`);
    console.error('Error:', error);
  }

  const responseStatus = error instanceof HttpError ? error.status : 500;
  return reply.status(responseStatus).send(response(undefined, error));
};

// Middleware for handling requests that don't match any available router
export const routeNotFoundHandler = async () => {
  throw NotFoundError();
};
