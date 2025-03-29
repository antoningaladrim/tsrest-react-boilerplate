import { z } from 'zod';

export const zPrompt = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
});

export const zConversation = z.object({
  id: z.string().uuid(),
  description: z.string().optional(),
  prompts: zPrompt.array().readonly(),
});

export const zCompletionPayload = z.object({
  model: z.string(),
  prompt: zPrompt,
  conversationId: z.string().uuid().nullable(),
});

export const zCompletionResponse = z.object({
  conversationId: z.string().uuid(),
});

export const zFindAllConversationsResponseBody = zConversation
  .omit({
    prompts: true,
  })
  .array()
  .readonly();

export type Conversation = z.infer<typeof zConversation>;
export type Prompt = z.infer<typeof zPrompt>;
export type ChatCompletionPayload = z.infer<typeof zCompletionPayload>;
export type CompletionResponse = z.infer<typeof zCompletionResponse>;
