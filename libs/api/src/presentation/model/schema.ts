import { z } from 'zod';

export const zModel = z.object({
  id: z.string(),
});

export type Model = z.infer<typeof zModel>;
