import { LoginPayload, LoginResponse } from '@tsrest-react-boilerplate/api';
import argon from 'argon2';
import { RefreshTokenRepository, UserRepository } from '../../../domain';
import { UnauthorizedError } from '../../../presentation/errors';
import { generateAccessToken, generateRefreshToken } from './generateToken';

export const login = async ({
  props,
  userRepository,
  refreshTokenRepository,
}: {
  props: LoginPayload;
  userRepository: UserRepository;
  refreshTokenRepository: RefreshTokenRepository;
}): Promise<LoginResponse> => {
  const { username, password } = props;

  const user = await userRepository.findByUsername(username).then((res) => {
    if (res === null) throw UnauthorizedError();
    return res;
  });

  const hashedPass = user.password;
  const isOk = await argon.verify(hashedPass, password);

  if (isOk) {
    const refreshToken = await generateRefreshToken({
      userId: user.id,
      refreshTokenRepository,
    });
    const accessToken = generateAccessToken(user.id);

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const { password: _, ...userRes } = user;

    return { user: userRes, accessToken, refreshToken };
  }

  throw UnauthorizedError();
};
