import { ChatCompletionPayload } from '@tsrest-react-boilerplate/api';
import { CompletionService } from '@tsrest-react-boilerplate/completion-client';
import { Environment } from 'nunjucks';
import path from 'path';

export class MessagesController {
  constructor(
    private readonly completionService: CompletionService,
    private readonly nunjucks: Environment
  ) {}

  async complete({ messages, model }: ChatCompletionPayload) {
    if (messages.length > 1) {
      return this.completionService.complete({ messages, model });
    }

    const systemPrompt = {
      role: 'system' as const,
      content: this.nunjucks.render(
        path.join('messages', 'systemPrompt.html') // Path in the build folder
      ),
    };

    return this.completionService.complete({
      model,
      messages: [systemPrompt, ...messages],
    });
  }
}
