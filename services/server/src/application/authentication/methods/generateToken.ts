import { RefreshTokenRepository } from '../../../domain';
import { accessTokenManager } from '../tokenManager';

export const generateAccessToken = (userId: string) => {
  const signedJWT = accessTokenManager.sign({ userId });
  return signedJWT;
};

export const generateRefreshToken = async ({
  refreshTokenRepository,
  userId,
  tokenFamily,
}: {
  refreshTokenRepository: RefreshTokenRepository;
  userId: string;
  tokenFamily?: string;
}) => {
  const expiresAt = new Date(new Date().getTime() + 31 * 24 * 60 * 60000); // Expire in 31 days

  const token = await refreshTokenRepository.createToken({
    userId,
    tokenFamily,
    expiresAt,
  });

  return token;
};
