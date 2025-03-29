import { Prompt } from '@tsrest-react-boilerplate/api';

export interface CompletionService {
  complete(props: { prompts: Prompt[]; model: string }): Promise<Prompt>;
}
