import { v4 } from 'uuid';

export const DEFAULT_CHAT_DESCRIPTION = 'New chat';

export const placeholderConversation = {
  id: v4(),
  description: DEFAULT_CHAT_DESCRIPTION,
  prompts: [],
};

export const placeholderQueryResponse = {
  status: 200,
  body: placeholderConversation,
  headers: new Headers(),
};
