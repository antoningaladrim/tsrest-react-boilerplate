import { AuthController } from './application';
import {
  getRefreshTokenRepositoryLive,
  getUserRepositoryLive,
} from './repositoriesLive';

const userRepository = getUserRepositoryLive();
const tokenRepository = getRefreshTokenRepositoryLive();

export const getAuthControllerLive = () => {
  return new AuthController(userRepository, tokenRepository);
};
