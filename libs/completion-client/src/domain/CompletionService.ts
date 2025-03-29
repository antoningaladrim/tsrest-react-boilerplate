import { ChatCompletionMessage } from '@tsrest-react-boilerplate/api';

export interface CompletionService {
  complete(props: {
    messages: ChatCompletionMessage[];
    model: string;
  }): Promise<ChatCompletionMessage>;
}
