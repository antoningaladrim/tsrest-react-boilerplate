import { InternalServerError } from '@tsrest-react-boilerplate/api-errors';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import { CompletionService } from '../domain';

const zCountry = z.object({
  country: z.string(),
});
type Country = z.infer<typeof zCountry>;

export class LiteLLMCompletionService implements CompletionService<Country> {
  client: OpenAI;

  constructor() {
    this.client = new OpenAI();
  }

  complete = async (text: string): Promise<Country> => {
    const chatCompletion = await this.client.beta.chat.completions.parse({
      messages: [
        {
          role: 'system',
          content:
            'You are an expert at locating cities.' +
            'You will be given a city and you should return the country it belongs to.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
      model: 'llama3.2',
      response_format: zodResponseFormat(zCountry, 'country'),
    });

    const completionResult = chatCompletion.choices[0].message.parsed;

    if (completionResult === null) {
      throw InternalServerError(
        chatCompletion.choices[0].message.refusal ?? 'Failed to locate city'
      );
    }

    return completionResult;
  };
}
