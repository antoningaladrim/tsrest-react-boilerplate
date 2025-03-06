import { getAuth } from '@clerk/fastify';
import { preHandlerHookHandler } from 'fastify';

export const protectedRouteHandler: preHandlerHookHandler = async (
  request,
  reply
) => {
  const { sessionId } = getAuth(request);

  // Protect the route from unauthenticated users
  if (!sessionId) {
    return reply
      .code(401)
      .send({ message: 'Access denied. Authentication required.' });
  }
};
