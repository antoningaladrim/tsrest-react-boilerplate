import { getCompletionClientLive } from '@tsrest-react-boilerplate/completion-client';
import { Environment, FileSystemLoader } from 'nunjucks';
import path from 'path';
import { ConversationController } from './application';
import { getConversationRepositoryLive } from './repositoriesLive';

export const getMessagesControllerLive = () => {
  const CompletionService = getCompletionClientLive();

  const env = new Environment(
    new FileSystemLoader(
      path.join(__dirname, 'prompts', 'conversation', 'prompts')
    )
  );

  const conversationRepository = getConversationRepositoryLive();

  return new ConversationController(
    conversationRepository,
    CompletionService,
    env
  );
};
