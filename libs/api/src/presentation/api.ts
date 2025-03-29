import { initContract } from '@ts-rest/core';
import { ConversationRestApiContract } from './conversation';
import { ModelRestApiContract } from './model';

const c = initContract();

export const apiRestContract = c.router({
  conversation: ConversationRestApiContract,
  model: ModelRestApiContract,
});
