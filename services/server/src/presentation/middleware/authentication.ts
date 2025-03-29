import { getAuth } from '@clerk/fastify';
import { preHandlerHookHandler } from 'fastify';

export const protectedRouteHandler: preHandlerHookHandler = async (
  request,
  reply
) => {
  const { sessionId } = getAuth(request);

  const isDocumentationPath = request.url.startsWith('/docs');

  // Protect the route from unauthenticated users
  if (!sessionId && !isDocumentationPath) {
    return reply
      .code(401)
      .send({ message: 'Access denied. Authentication required.' });
  }
};
