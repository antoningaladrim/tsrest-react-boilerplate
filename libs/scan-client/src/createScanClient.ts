import { ConfigError } from '@tsrest-react-boilerplate/api-errors';
import { AwsScanService, zAwsConfig } from './infrastructure';

export const createScanClient = () => {
  const awsConfig = {
    region: process.env['AWS_REGION'],
  };

  const config = zAwsConfig.safeParse(awsConfig);

  if (!config.success) {
    throw ConfigError('Invalid AWS configuration');
  }

  return new AwsScanService(config.data);
};
