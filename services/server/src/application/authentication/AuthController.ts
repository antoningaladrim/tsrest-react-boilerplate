import type {
  LoginPayload,
  LoginResponse,
  RefreshTokenResponse,
} from '@tsrest-react-boilerplate/api';
import { FastifyRequest } from 'fastify';
import { RefreshTokenRepository, UserRepository } from '../../domain';
import { login, logout, me, refreshToken } from './methods';

export class AuthController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository
  ) {}

  async login(props: LoginPayload): Promise<LoginResponse> {
    return login({
      props,
      userRepository: this.userRepository,
      refreshTokenRepository: this.refreshTokenRepository,
    });
  }

  async logout(request: FastifyRequest): Promise<void> {
    return logout({
      request,
      refreshTokenRepository: this.refreshTokenRepository,
    });
  }

  async me(request: FastifyRequest): Promise<LoginResponse['user']> {
    return me({ request, userRepository: this.userRepository });
  }

  async refreshToken(token: string): Promise<RefreshTokenResponse> {
    return refreshToken({
      token,
      refreshTokenRepository: this.refreshTokenRepository,
    });
  }
}
