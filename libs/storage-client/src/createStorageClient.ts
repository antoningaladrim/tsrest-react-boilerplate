import { ConfigError } from '@tsrest-react-boilerplate/api-errors';
import { MinIOStorageClientService, zMinioConfig } from './infrastructure';
import {
  AwsStorageClientService,
  zAwsConfig,
} from './infrastructure/AwsStorageClientService';

export const createMinIOStorageClient = (bucket: string) => {
  const minIOConfig = {
    endPoint: process.env['MINIO_ENDPOINT'],
    accessKey: process.env['MINIO_ACCESS_KEY'],
    secretKey: process.env['MINIO_SECRET_KEY'],
    port: process.env['MINIO_PORT'],
    useSSL: process.env['MINIO_SSL'],
    signedUrlPrefix: process.env['MINIO_SIGNED_URL_PREFIX'],
  };

  const config = zMinioConfig.safeParse(minIOConfig);

  if (!config.success) {
    throw ConfigError('Invalid MinIO configuration');
  }

  return new MinIOStorageClientService(config.data, bucket);
};

export const createAwsStorageClient = (bucket: string) => {
  const awsConfig = {
    region: process.env['AWS_REGION'],
  };

  const config = zAwsConfig.safeParse(awsConfig);

  if (!config.success) {
    throw ConfigError('Invalid AWS configuration');
  }

  return new AwsStorageClientService(config.data, bucket);
};
