import { ConfigError } from '@tsrest-react-boilerplate/api-errors';
import { createMinIOStorageClient } from './createStorageClient';

export const getStorageClientLive = () => {
  const bucketName = process.env['S3_BUCKET_NAME'];

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const isProd = process.env['NODE_ENV'] === 'production';

  if (!bucketName) {
    throw ConfigError('S3_BUCKET_NAME is not set');
  }

  // If you want to use AWS S3 in production instead of MinIO
  // Uncomment the following lines
  // if (isProd) {
  //   return createAwsStorageClient(bucketName);
  // }

  return createMinIOStorageClient(bucketName);
};
