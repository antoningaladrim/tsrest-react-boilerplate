import {
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PersistenceError } from '@tsrest-react-boilerplate/api-errors';
import { z } from 'zod';
import { StorageClientService } from '../domain';

export const zAwsConfig = z.object({
  region: z.string(),
});

export type AwsConfig = z.infer<typeof zAwsConfig>;

export class AwsStorageClientService implements StorageClientService {
  private client: S3Client;
  private bucket: string;

  constructor(config: AwsConfig, bucket: string) {
    this.client = new S3Client(config);
    this.bucket = bucket;
  }

  objectExists = async (path: string): Promise<boolean> => {
    try {
      const command = new HeadObjectCommand({
        Bucket: this.bucket,
        Key: path,
      });
      await this.client.send(command);
      return true;
    } catch {
      return false;
    }
  };

  putObject = async ({
    path,
    buffer,
  }: {
    path: string;
    buffer: Buffer;
  }): Promise<void> => {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: path,
        Body: buffer,
      });
      await this.client.send(command);
    } catch (e) {
      console.log('Error', e);
      throw PersistenceError('An error occurred while putting the object');
    }
  };

  presignedGetObject = async ({
    path,
    expiration,
  }: {
    path: string;
    expiration?: number;
  }): Promise<string> => {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: path,
      });
      return await getSignedUrl(this.client, command, {
        expiresIn: expiration,
      });
    } catch {
      throw PersistenceError('An error occurred while presigning the object');
    }
  };

  presignedPutObject = async ({
    path,
    expiration,
  }: {
    path: string;
    expiration?: number;
  }): Promise<string> => {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: path,
      });
      return await getSignedUrl(this.client, command, {
        expiresIn: expiration,
      });
    } catch {
      throw PersistenceError('An error occurred while presigning the object');
    }
  };
}
