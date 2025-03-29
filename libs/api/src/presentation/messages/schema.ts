import { z } from 'zod';

export const zMessage = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
});

export const zCompletionPayload = z.object({
  model: z.string(),
  messages: zMessage.array(),
});

export type ChatCompletionMessage = z.infer<typeof zMessage>;
export type ChatCompletionPayload = z.infer<typeof zCompletionPayload>;
