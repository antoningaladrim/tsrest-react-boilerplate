import { AuthController } from './application';

export const getAuthControllerLive = () => {
  return new AuthController();
};
