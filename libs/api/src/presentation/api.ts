import { initContract } from '@ts-rest/core';
import { ConversationRestApiContract } from './conversation';

const c = initContract();

export const apiRestContract = c.router({
  conversation: ConversationRestApiContract,
});
