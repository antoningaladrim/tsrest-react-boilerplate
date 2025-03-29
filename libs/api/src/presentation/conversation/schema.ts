import { z } from 'zod';

export const zMessage = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
});

export const zConversation = z.object({
  id: z.string().uuid(),
  description: z.string().optional(),
  messages: zMessage.array().readonly(),
});

export const zCompletionPayload = z.object({
  model: z.string(),
  message: zMessage,
  conversationId: z.string().uuid().nullable(),
});

export const zCompletionResponse = z.object({
  conversationId: z.string().uuid(),
});

export const zFindAllConversationsResponseBody = zConversation
  .omit({
    messages: true,
  })
  .array()
  .readonly();

export type Conversation = z.infer<typeof zConversation>;
export type ChatCompletionMessage = z.infer<typeof zMessage>;
export type ChatCompletionPayload = z.infer<typeof zCompletionPayload>;
export type CompletionResponse = z.infer<typeof zCompletionResponse>;
