import { createDocxTextExtractorClient } from '../createDocxTextExtractorClient';

const client = createDocxTextExtractorClient();

describe('MammothDocxTextExtractorService', () => {
  it('should be able to extract text from a DOCX file', async () => {
    const response = await fetch(
      'https://github.com/rounakdatta/CorrectLy/raw/refs/heads/master/sample.docx'
    );
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const text = await client.extractText(buffer);
    expect(text).toEqual(
      `Hello world. Hello, this is a sample document. I am sit here in the lab. John is played in the hostel. Harry has been go to the company since last month. There has been tremendous progress in ocmputer science in the last feww decades. And credits goes to the rise of develpoment in electronics. The key players in this domain have been competing against each other. Apple is dominate the market with their mobile phones.`
    );
  });
});
