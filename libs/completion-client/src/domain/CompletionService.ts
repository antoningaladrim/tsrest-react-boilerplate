export interface CompletionService<T extends object> {
  complete(text: string): Promise<T>;
}
