import { HttpError, NotFoundError } from '@tsrest-react-boilerplate/api-errors';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

const formatError = (error: HttpError | Error) => {
  const errMessage =
    error.name === 'ZodError' ? JSON.parse(error.message) : error.message;

  return { error: { name: error?.name, message: errMessage } };
};

/**
 * @see https://fastify.dev/docs/latest/Reference/Server/#seterrorhandler
 */
export const globalErrorHandler = async (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(`Timestamp: ${new Date().toISOString()}`);
    console.error('Error:', error);
  }

  const responseStatus = error instanceof HttpError ? error.status : 500;
  return reply.status(responseStatus).send(formatError(error));
};

// Middleware for handling requests that don't match any available router
export const routeNotFoundHandler = async () => {
  throw NotFoundError();
};
