import { RefreshTokenResponse } from '@tsrest-react-boilerplate/api';
import { RefreshTokenRepository } from '../../../domain';
import { ForbiddenError } from '../../../presentation/errors';
import { generateAccessToken, generateRefreshToken } from './generateToken';

export const refreshToken = async ({
  token,
  refreshTokenRepository,
}: {
  token: string;
  refreshTokenRepository: RefreshTokenRepository;
}): Promise<RefreshTokenResponse> => {
  const tokenData = await refreshTokenRepository.find(token);

  if (!tokenData) throw ForbiddenError();

  const { userId, tokenFamily, active } = tokenData;

  if (active) {
    // Token is valid and hasn't been used yet
    const newRefreshToken = await generateRefreshToken({
      refreshTokenRepository,
      userId,
      tokenFamily,
    });
    const accessToken = generateAccessToken(userId);

    return { accessToken, refreshToken: newRefreshToken };
  } else {
    // Previously refreshed token used, invalidate all tokens in family
    refreshTokenRepository.invalidateTokenFamily(tokenFamily);

    throw ForbiddenError();
  }
};
