import { ConfigError } from '@tsrest-react-boilerplate/api-errors';
import { createAwsStorageClient } from '../createStorageClient';

const { S3_TEST_BUCKET_NAME } = process.env;

if (!S3_TEST_BUCKET_NAME) {
  throw ConfigError('S3_TEST_BUCKET_NAME is not defined');
}

const client = createAwsStorageClient(S3_TEST_BUCKET_NAME);

describe.skip('AwsStorageClientLive', () => {
  const csvOutput = `header1,header2
  value1a,value1b
  value2a,value2b
  value3a,value3b
  value4a,value4b`;

  it('should be able to upload a file to Aws and then read it', async () => {
    const testPut = await client.putObject({
      path: 'test.csv',
      buffer: Buffer.from(csvOutput, 'utf-8'),
    });

    expect(testPut).toBeUndefined();
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
