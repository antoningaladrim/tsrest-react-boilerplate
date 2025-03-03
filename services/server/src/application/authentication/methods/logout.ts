import { FastifyRequest } from 'fastify';
import { RefreshTokenRepository } from '../../../domain';
import { UnauthorizedError } from '../../../presentation/errors';

export const logout = async ({
  request,
  refreshTokenRepository,
}: {
  request: FastifyRequest;
  refreshTokenRepository: RefreshTokenRepository;
}): Promise<void> => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw UnauthorizedError();
  }

  const accessToken = authHeader.replace(new RegExp('\\b[Bb]earer\\s'), '');
  refreshTokenRepository.invalidate(accessToken);
};
