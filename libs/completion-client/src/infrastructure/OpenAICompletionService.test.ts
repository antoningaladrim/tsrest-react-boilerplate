import { OpenAICompletionService } from './OpenAICompletionService';

const completionService = new OpenAICompletionService();

describe('LiteLLMCompletionService', () => {
  it('should be able to find a country', async () => {
    const result = await completionService.complete({
      model: 'llama3.2',
      prompts: [{ role: 'user', content: 'What is the capital of France?' }],
    });
    expect(result).toBeDefined();
  }, 10000);

  it('should be able to list available models', async () => {
    const result = await completionService.getModels();
    expect(result).toBeDefined();
  });
});
