import { ChatCompletionMessage } from '@tsrest-react-boilerplate/api';
import { InternalServerError } from '@tsrest-react-boilerplate/api-errors';
import OpenAI from 'openai';
import { CompletionService } from '../domain';

export class OpenAICompletionService implements CompletionService {
  client: OpenAI;

  constructor() {
    this.client = new OpenAI();
  }

  complete = async ({
    messages,
    model,
  }: {
    messages: ChatCompletionMessage[];
    model: string;
  }): Promise<ChatCompletionMessage> => {
    const chatCompletion = await this.client.chat.completions.create({
      messages,
      model,
    });

    const completionResult = chatCompletion.choices[0].message;

    if (completionResult.content === null) {
      throw InternalServerError(
        completionResult.refusal ?? 'Failed to complete the request'
      );
    }

    return {
      role: completionResult.role,
      content: completionResult.content,
    };
  };
}
