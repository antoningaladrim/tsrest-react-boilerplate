import {
  InMemoryRefreshTokenRepository,
  InMemoryUserRepository,
} from './domain';

export const getUserRepositoryLive = () => {
  return new InMemoryUserRepository();
};

export const getRefreshTokenRepositoryLive = () => {
  return new InMemoryRefreshTokenRepository();
};
