import { initContract } from '@ts-rest/core';
import { MessagesRestApiContract } from './messages';

const c = initContract();

export const apiRestContract = c.router({
  messages: MessagesRestApiContract,
});
