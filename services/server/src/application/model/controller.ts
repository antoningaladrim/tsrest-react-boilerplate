import { CompletionService } from '@tsrest-react-boilerplate/completion-client';

export class ModelController {
  constructor(private readonly completionService: CompletionService) {}

  async findAll() {
    return this.completionService.getModels();
  }
}
