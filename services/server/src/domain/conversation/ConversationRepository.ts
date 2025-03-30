import { Conversation } from '@tsrest-react-boilerplate/api';

export interface ConversationRepository {
  findAll(): Promise<readonly Conversation[]>;
  findById(id: string): Promise<Conversation | null>;
  store(conversation: Conversation): Promise<Conversation>;
}

export class InMemoryConversationRepository implements ConversationRepository {
  private conversations: Map<string, Conversation> = new Map();

  async findAll(): Promise<readonly Conversation[]> {
    return Array.from(this.conversations.values()).sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    );
  }

  async findById(id: string): Promise<Conversation | null> {
    return this.conversations.get(id) || null;
  }

  async store(conversation: Conversation): Promise<Conversation> {
    this.conversations.set(conversation.id, conversation);
    return conversation;
  }
}
