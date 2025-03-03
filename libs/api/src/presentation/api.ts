import { initContract } from '@ts-rest/core';
import { authRestApiContract } from './authentication';

const c = initContract();

export const apiRestContract = c.router({
  auth: authRestApiContract,
});
