export class HttpError extends Error {
  status: number;

  constructor(name: string, message: string, status: number) {
    super(message);
    this.name = name;
    this.status = status;
  }
}
