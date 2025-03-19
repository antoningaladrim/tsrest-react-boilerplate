import { LiteLLMCompletionService } from './LiteLLMCompletionService';

const completionService = new LiteLLMCompletionService();

describe('LiteLLMCompletionService', () => {
  it('should be able to find a country', async () => {
    const result = await completionService.complete('Paris');
    expect(result.country).toBe('France');
  }, 10000);
});
