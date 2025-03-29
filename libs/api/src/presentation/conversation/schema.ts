import { z } from 'zod';

export const zMessage = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
});

export const zConversation = z.object({
  id: z.string().uuid(),
  model: z.string(),
  description: z.string().optional(),
  messages: zMessage.array().readonly(),
});

export const zCompletionPayload = z.object({
  model: z.string(),
  message: zMessage,
  conversationId: z.string().uuid().nullable(),
});

export type Conversation = z.infer<typeof zConversation>;
export type ChatCompletionMessage = z.infer<typeof zMessage>;
export type ChatCompletionPayload = z.infer<typeof zCompletionPayload>;
