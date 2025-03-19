import { ConfigError } from '@tsrest-react-boilerplate/api-errors';
import { createMinIOStorageClient } from '../createStorageClient';

const { S3_TEST_BUCKET_NAME } = process.env;

if (!S3_TEST_BUCKET_NAME) {
  throw ConfigError('S3_TEST_BUCKET_NAME is not defined');
}

const client = createMinIOStorageClient(S3_TEST_BUCKET_NAME);

describe('MinIOStorageClientLive', () => {
  const csvOutput = `header1,header2
  value1a,value1b
  value2a,value2b
  value3a,value3b
  value4a,value4b`;

  it('should be able to upload a file to MinIO and then read it', async () => {
    const testPut = await client.putObject({
      path: 'test.csv',
      buffer: Buffer.from(csvOutput, 'utf-8'),
    });

    expect(testPut).toBeUndefined();

    const testGet = await client.getObject('test.csv');

    const content = Uint8Array.from([
      104, 101, 97, 100, 101, 114, 49, 44, 104, 101, 97, 100, 101, 114, 50, 10,
      32, 32, 118, 97, 108, 117, 101, 49, 97, 44, 118, 97, 108, 117, 101, 49,
      98, 10, 32, 32, 118, 97, 108, 117, 101, 50, 97, 44, 118, 97, 108, 117,
      101, 50, 98, 10, 32, 32, 118, 97, 108, 117, 101, 51, 97, 44, 118, 97, 108,
      117, 101, 51, 98, 10, 32, 32, 118, 97, 108, 117, 101, 52, 97, 44, 118, 97,
      108, 117, 101, 52, 98,
    ]);

    const buffer = Buffer.from(content);

    expect(testGet).toEqual(buffer);
  });

  it('should be able to test if an object exists or not', async () => {
    const testExists = await client.objectExists('test.csv');

    expect(testExists).toBeTruthy();

    const testNotExists = await client.objectExists('test-not-exists.csv');

    expect(testNotExists).toBeFalsy();
  });

  it('should be able to generate a presigned URL for an object', async () => {
    const putPresignedObject = await client.presignedPutObject({
      path: 'test-not-exists-yet.csv',
      expiration: 60,
    });

    expect(putPresignedObject).toEqual(expect.any(String));

    const testNotExistsYet = await client.objectExists('test-not-exists.csv');

    expect(testNotExistsYet).toBeFalsy();
  });
});
