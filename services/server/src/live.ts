import { getCompletionClientLive } from '@tsrest-react-boilerplate/completion-client';
import { Environment, FileSystemLoader } from 'nunjucks';
import path from 'path';
import { ConversationController, ModelController } from './application';
import { getConversationRepositoryLive } from './repositoriesLive';

const completionService = getCompletionClientLive();

export const getConversationControllerLive = () => {
  const env = new Environment(
    new FileSystemLoader(
      path.join(__dirname, 'prompts', 'conversation', 'prompts')
    )
  );

  const conversationRepository = getConversationRepositoryLive();

  return new ConversationController(
    conversationRepository,
    completionService,
    env
  );
};

export const getModelControllerLive = () => {
  return new ModelController(completionService);
};
