import {
  ChatCompletionPayload,
  CompletionResponse,
  Prompt,
} from '@tsrest-react-boilerplate/api';
import { NotFoundError } from '@tsrest-react-boilerplate/api-errors';
import { CompletionService } from '@tsrest-react-boilerplate/completion-client';
import { Environment } from 'nunjucks';
import { v4 } from 'uuid';
import { ConversationRepository } from '../../domain';

export class ConversationController {
  constructor(
    private readonly conversationRepository: ConversationRepository,
    private readonly completionService: CompletionService,
    private readonly nunjucks: Environment
  ) {}

  async findAll() {
    return this.conversationRepository.findAll();
  }

  async findById(id: string) {
    const conversation = await this.conversationRepository.findById(id);

    if (!conversation) {
      throw NotFoundError('Conversation not found');
    }

    return conversation;
  }

  async inferDescription({ model, prompt }: { model: string; prompt: Prompt }) {
    const systemPrompt = {
      role: 'system' as const,
      content: this.nunjucks.render(
        'conversationDescriptionInference.prompt.html'
      ),
    };

    return this.completionService.complete({
      model,
      prompts: [systemPrompt, prompt],
    });
  }

  async createFromPromptAndComplete({
    model,
    prompt,
  }: {
    model: string;
    prompt: Prompt;
  }) {
    const systemPrompt = {
      role: 'system' as const,
      content: this.nunjucks.render('completion.prompt.html'),
    };

    const completionPromise = this.completionService.complete({
      model,
      prompts: [systemPrompt, prompt],
    });

    const descriptionPromise = this.inferDescription({
      model,
      prompt,
    });

    const conversationId = v4();

    const [llmResponse, description] = await Promise.all([
      completionPromise,
      descriptionPromise,
    ]);

    const now = new Date();
    await this.conversationRepository.store({
      id: conversationId,
      description: description.content,
      prompts: [systemPrompt, prompt, llmResponse],
      createdAt: now,
      updatedAt: now,
    });

    return { conversationId, response: llmResponse };
  }

  async prompt({
    prompt,
    model,
    conversationId,
  }: ChatCompletionPayload): Promise<CompletionResponse> {
    if (conversationId === undefined) {
      return this.createFromPromptAndComplete({
        model,
        prompt,
      });
    }

    const conversation = await this.findById(conversationId);

    const llmResponse = await this.completionService.complete({
      prompts: [...conversation.prompts, prompt],
      model,
    });

    await this.conversationRepository.store({
      ...conversation,
      prompts: [...conversation.prompts, prompt, llmResponse],
      updatedAt: new Date(),
    });

    return { conversationId: conversation.id, response: llmResponse };
  }
}
