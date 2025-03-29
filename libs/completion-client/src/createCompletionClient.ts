import { ConfigError } from '@tsrest-react-boilerplate/api-errors';
import { OpenAICompletionService } from './infrastructure';

export const createOpenAICompletionClient = () => {
  if (process.env['OPENAI_API_KEY'] === undefined) {
    throw ConfigError('OPENAI_API_KEY is not set');
  }

  return new OpenAICompletionService();
};

export const createLiteLLMCompletionClient = () => {
  if (process.env['OPENAI_API_KEY'] === undefined) {
    throw ConfigError('OPENAI_API_KEY is not set');
  }

  if (process.env['OPENAI_BASE_URL'] === undefined) {
    throw ConfigError('OPENAI_BASE_URL is not set');
  }
  return new OpenAICompletionService();
};
