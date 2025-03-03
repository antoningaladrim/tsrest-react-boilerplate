import { LoginResponse } from '@tsrest-react-boilerplate/api';
import { FastifyRequest } from 'fastify';
import { UserRepository } from '../../../domain';
import { UnauthorizedError } from '../../../presentation/errors';
import { accessTokenManager } from '../tokenManager';

export const me = async ({
  request,
  userRepository,
}: {
  request: FastifyRequest;
  userRepository: UserRepository;
}): Promise<LoginResponse['user']> => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw UnauthorizedError();
  }

  const accessToken = authHeader.replace(new RegExp('\\b[Bb]earer\\s'), '');

  const { userId } = accessTokenManager.validate(accessToken);
  const user = await userRepository.findById(userId);

  if (user) {
    return user;
  }
  
  throw UnauthorizedError();
};
