import { z } from 'zod';

export const zLoginPayload = z.object({
  username: z.string({ required_error: 'Username is required' }).min(1, {
    message: 'Username must be at least 1 character long',
  }),
  password: z.string({ required_error: 'Password is required' }).min(4, {
    message: 'Password must be at least 4 characters long',
  }),
});

export type LoginPayload = z.infer<typeof zLoginPayload>;
