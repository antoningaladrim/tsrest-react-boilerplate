import { z } from 'zod';

export const zModel = z.object({
  id: z.string(),
  owned_by: z.string(),
  created: z.number(),
});

export type Model = z.infer<typeof zModel>;
