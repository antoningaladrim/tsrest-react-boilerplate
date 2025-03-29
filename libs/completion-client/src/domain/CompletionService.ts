import { Model, Prompt } from '@tsrest-react-boilerplate/api';

export interface CompletionService {
  getModels(): Promise<Model[]>;
  complete(props: { prompts: Prompt[]; model: string }): Promise<Prompt>;
}
