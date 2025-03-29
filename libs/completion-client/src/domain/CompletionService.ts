import {
  ChatCompletionMessage,
  ChatCompletionPayload,
} from '@tsrest-react-boilerplate/api';

export interface CompletionService {
  complete(payload: ChatCompletionPayload): Promise<ChatCompletionMessage>;
}
