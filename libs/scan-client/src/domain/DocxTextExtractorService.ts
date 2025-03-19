export interface DocxTextExtractorService {
  extractText(buffer: Buffer): Promise<string>;
}
