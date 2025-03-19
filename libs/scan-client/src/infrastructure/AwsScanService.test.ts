import { createScanClient } from '../createScanClient';

const client = createScanClient();

describe.skip('AwsScanService', () => {
  it('should be able to get the version of the service', async () => {
    const version = client.getVersion();
    expect(version).toStrictEqual(expect.any(String));
  });

  it('should be able to get text from a file', async () => {
    const response = await fetch('https://jeroen.github.io/images/testocr.png');
    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const text = await client.extractText(uint8Array);

    expect(text).toEqual(
      `This is a lot of 12 point text to test the ocr code and see if it works on all types of file format. The quick brown dog jumped over the lazy fox. The quick brown dog jumped over the lazy fox. The quick brown dog jumped over the lazy fox. The quick brown dog jumped over the lazy fox.`
    );
  });
});
