export interface StorageClientService {
  putObject(params: { path: string; buffer: Buffer }): Promise<void>;
  presignedGetObject(params: {
    path: string;
    expiration?: number;
  }): Promise<string>;
  presignedPutObject(params: {
    path: string;
    expiration?: number;
  }): Promise<string>;
  objectExists(path: string): Promise<boolean>;
}

export class InMemoryStorageClientService implements StorageClientService {
  storage = new Map<string, Buffer>();

  objectExists = (path: string): Promise<boolean> => {
    return Promise.resolve(this.storage.has(path));
  };

  putObject = (params: { path: string; buffer: Buffer }): Promise<void> => {
    this.storage.set(params.path, params.buffer);
    return Promise.resolve();
  };

  presignedGetObject = (params: {
    path: string;
    expiration?: number;
  }): Promise<string> =>
    Promise.resolve(`get:${params.path}?expires=${params.expiration}`);

  presignedPutObject = (params: {
    path: string;
    expiration?: number;
  }): Promise<string> =>
    Promise.resolve(`put:${params.path}?expires=${params.expiration}`);
}
