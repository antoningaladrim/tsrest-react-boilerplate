export type RefreshToken = {
  userId: string;
  token: string;
  tokenFamily: string;
  active: boolean;
  expiresAt: Date;
};
