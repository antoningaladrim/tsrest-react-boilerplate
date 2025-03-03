import { preHandlerHookHandler } from 'fastify';
import { accessTokenManager } from '../../application/authentication/tokenManager';
import { getUserRepositoryLive } from '../../repositoriesLive';

const userRepository = getUserRepositoryLive();

/**
 * This plugin can be used to protect a router.
 * Register it adding this to registerRouter options:
 *
 * hooks: {
 *   preHandler: protectedRouteHandler,
 * },
 *
 * Extracts JWT token from the `authorization` header with scheme `B/bearer`
 */
export const protectedRouteHandler: preHandlerHookHandler = async (
  request,
  reply
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    reply.code(401).send({ error: 'Unauthorized' });
    return;
  }

  const accessToken = authHeader.replace(new RegExp('\\b[Bb]earer\\s'), '');

  try {
    const { userId } = accessTokenManager.validate(accessToken);
    const user = await userRepository.findById(userId);

    if (user) {
      // Attach userId to request
      request.headers.userId = userId;
    } else {
      reply.code(401).send({ error: 'Unauthorized' });
    }
  } catch {
    reply.code(401).send({ error: 'Unauthorized' });
  }
};
