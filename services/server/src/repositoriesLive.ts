import { InMemoryConversationRepository } from './domain';

export const getConversationRepositoryLive = () => {
  return new InMemoryConversationRepository();
};
