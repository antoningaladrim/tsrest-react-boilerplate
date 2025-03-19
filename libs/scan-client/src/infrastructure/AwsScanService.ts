import {
  AnalyzeDocumentCommandOutput,
  DetectDocumentTextCommand,
  DetectDocumentTextCommandInput,
  TextractClient,
} from '@aws-sdk/client-textract';
import { InternalServerError } from '@tsrest-react-boilerplate/api-errors';
import { z } from 'zod';
import { ScanService } from '../domain';

export const zAwsConfig = z.object({
  region: z.string(),
});
export type AwsConfig = z.infer<typeof zAwsConfig>;

const WHITE_SPACE = ' ';

export class AwsScanService implements ScanService {
  private client: TextractClient;

  constructor(config: AwsConfig) {
    this.client = new TextractClient({
      region: config.region,
      maxAttempts: 3,
      retryMode: 'standard',
    });
  }

  getVersion(): string {
    return `Textract ${this.client.config.apiVersion}`;
  }

  private getPlainTextFromDocResponse(
    response: AnalyzeDocumentCommandOutput
  ): string {
    try {
      return (
        response.Blocks?.filter(
          (block) => block.BlockType === 'WORD' && block.Text !== undefined
        )
          .map((block) => block.Text)
          .join(WHITE_SPACE) ?? ''
      );
    } catch {
      throw InternalServerError(
        'An error occurred while getting the text from the document'
      );
    }
  }

  extractText = async (inputFile: Uint8Array): Promise<string> => {
    const commandInput: DetectDocumentTextCommandInput = {
      Document: {
        Bytes: inputFile,
      },
    };

    const command = new DetectDocumentTextCommand(commandInput);
    const response = await this.client.send(command);

    return this.getPlainTextFromDocResponse(response);
  };
}
