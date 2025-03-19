import { InternalServerError } from '@tsrest-react-boilerplate/api-errors';
import { extractRawText } from 'mammoth';
import { DocxTextExtractorService } from '../domain';

export class MammothDocxTextExtractorService
  implements DocxTextExtractorService
{
  async extractText(buffer: Buffer): Promise<string> {
    try {
      const result = await extractRawText({ buffer });
      return result.value.trim();
    } catch (e) {
      const error = e as Error;
      throw InternalServerError(
        `Failed to extract text from DOCX: ${error.message}`
      );
    }
  }
}
