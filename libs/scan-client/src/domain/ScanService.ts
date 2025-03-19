export interface ScanService {
  getVersion(): string;
  extractText(input: Uint8Array): Promise<string>;
}
