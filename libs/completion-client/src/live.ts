import { createLiteLLMCompletionClient } from './createCompletionClient';

export const getCompletionClientLive = () => {
  return createLiteLLMCompletionClient();
};
