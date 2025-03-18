import { z } from 'zod';

export const zLoginPayload = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginPayload = z.infer<typeof zLoginPayload>;
