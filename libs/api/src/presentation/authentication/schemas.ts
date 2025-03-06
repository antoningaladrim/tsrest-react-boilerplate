import * as z from 'zod';

export const user = z.object({
  username: z.string(),
  createdAt: z.date(),
});

const refreshToken = z.object({
  userId: z.string(),
  token: z.string(),
  tokenFamily: z.string(),
  active: z.boolean(),
  expiresAt: z.date(),
});

export const loginPayload = z.object({
  username: z.string(),
  password: z.string(),
});

export const registerPayload = z.object({
  username: z.string(),
  password: z.string(),
});

export const RefreshTokenResponse = z.object({
  accessToken: z.string(),
  refreshToken,
});

export const LogoutResponse = z.object({
  user,
});

export type User = z.infer<typeof user>;
export type LoginPayload = z.infer<typeof loginPayload>;
export type RegisterPayload = z.infer<typeof registerPayload>;
export type RefreshTokenResponse = z.infer<typeof RefreshTokenResponse>;
