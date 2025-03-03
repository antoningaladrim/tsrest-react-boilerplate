import * as z from 'zod';

export const UnauthorizedError = z.object({
  reason: z.string(),
  type: z.literal('UnauthorizedError'),
});

export const InternalServiceError = z.object({
  reason: z.string(),
  type: z.literal('InternalServiceError'),
});
