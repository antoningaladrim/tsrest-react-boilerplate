import {
  ChatCompletionMessage,
  ChatCompletionPayload,
  CompletionResponse,
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

  async inferDescription({
    model,
    prompt,
  }: {
    model: string;
    prompt: ChatCompletionMessage;
  }) {
    const systemPrompt = {
      role: 'system' as const,
      content: this.nunjucks.render(
        'conversationDescriptionInference.prompt.html'
      ),
    };

    return this.completionService.complete({
      model,
      messages: [systemPrompt, prompt],
    });
  }

  async createFromPromptAndComplete({
    model,
    prompt,
  }: {
    model: string;
    prompt: ChatCompletionMessage;
  }) {
    const systemPrompt = {
      role: 'system' as const,
      content: this.nunjucks.render('completion.prompt.html'),
    };

    const completionPromise = this.completionService.complete({
      model,
      messages: [systemPrompt, prompt],
    });

    const descriptionPromise = this.inferDescription({
      model,
      prompt,
    });

    const [llmResponse, description] = await Promise.all([
      completionPromise,
      descriptionPromise,
    ]);

    const conversationId = v4();
    await this.conversationRepository.store({
      id: conversationId,
      description: description.content,
      messages: [systemPrompt, prompt, llmResponse],
    });

    return { conversationId };
  }

  async sendMessage({
    message,
    model,
    conversationId,
  }: ChatCompletionPayload): Promise<CompletionResponse> {
    if (conversationId === null) {
      return this.createFromPromptAndComplete({
        model,
        prompt: message,
      });
    }

    const conversation = await this.findById(conversationId);

    const llmResponse = await this.completionService.complete({
      messages: [...conversation.messages, message],
      model,
    });

    await this.conversationRepository.store({
      ...conversation,
      messages: [...conversation.messages, message, llmResponse],
    });

    return { conversationId: conversation.id };
  }
}
