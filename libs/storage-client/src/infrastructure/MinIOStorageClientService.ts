import { PersistenceError } from '@tsrest-react-boilerplate/api-errors';
import { Client } from 'minio';
import { z } from 'zod';
import { StorageClientService } from '../domain';

export const zMinioConfig = z.object({
  endPoint: z.string(),
  accessKey: z.string(),
  secretKey: z.string(),
  port: z.string().transform((val) => Number(val)),
  useSSL: z.string().transform((val) => (val === 'true' ? true : false)),
  signedUrlPrefix: z.string(),
});

export type MinIOConfig = z.infer<typeof zMinioConfig>;

export class MinIOStorageClientService implements StorageClientService {
  private client: Client;
  private config: MinIOConfig;
  private bucket: string;

  constructor(config: MinIOConfig, bucket: string) {
    this.config = config;
    this.bucket = bucket;
    this.client = new Client(this.config);
  }

  objectExists = async (path: string): Promise<boolean> => {
    try {
      await this.client.statObject(this.bucket, path);
      return true;
    } catch {
      return false;
    }
  };

  getObject = async (path: string): Promise<Buffer> => {
    try {
      const stream = await this.client.getObject(this.bucket, path);
      const chunks: Uint8Array[] = [];

      for await (const chunk of stream) {
        chunks.push(chunk);
      }

      return Buffer.concat(chunks);
    } catch {
      throw PersistenceError('An error occurred while getting the object');
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
      await this.client.putObject(this.bucket, path, buffer);
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
      const url = expiration
        ? await this.client.presignedGetObject(this.bucket, path, expiration)
        : await this.client.presignedGetObject(this.bucket, path);

      return url.replace(
        `http://${this.config.endPoint}:${this.config.port}`,
        this.config.signedUrlPrefix
      );
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
      const url = expiration
        ? await this.client.presignedPutObject(this.bucket, path, expiration)
        : await this.client.presignedPutObject(this.bucket, path);

      return url.replace(
        `http://${this.config.endPoint}:${this.config.port}`,
        this.config.signedUrlPrefix
      );
    } catch {
      throw PersistenceError('An error occurred while presigning the object');
    }
  };
}
