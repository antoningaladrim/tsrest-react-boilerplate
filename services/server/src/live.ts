import { getCompletionClientLive } from '@tsrest-react-boilerplate/completion-client';
import { Environment, FileSystemLoader } from 'nunjucks';
import path from 'path';
import { MessagesController } from './application';

export const getMessagesControllerLive = () => {
  const CompletionService = getCompletionClientLive();

  const env = new Environment(
    new FileSystemLoader(path.join(__dirname, 'prompts'))
  );

  return new MessagesController(CompletionService, env);
};
