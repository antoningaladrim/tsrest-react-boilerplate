import { HttpError } from './HttpError.js';

export const BadRequestError = (message?: string) => {
  return new HttpError('BadRequestError', message ?? 'Bad Request', 400);
};

export const UnauthorizedError = (message?: string) => {
  return new HttpError('UnauthorizedError', message ?? 'Unauthorized', 401);
};

export const ForbiddenError = (message?: string) => {
  return new HttpError('ForbiddenError', message ?? 'Forbidden', 403);
};

export const NotFoundError = (message?: string) => {
  return new HttpError('NotFoundError', message ?? 'Resource Not Found', 404);
};

export const InternalServerError = (message?: string) => {
  return new HttpError(
    'InternalServerError',
    message ?? 'Internal Server Error',
    500
  );
};

export const TooManyRequestsError = (message?: string) => {
  return new HttpError(
    'TooManyRequestsError',
    message ?? 'Too Many Requests',
    429
  );
};

export const RequestTimeoutError = (message?: string) => {
  return new HttpError(
    'RequestTimeoutError',
    message ?? 'Request Timeout',
    408
  );
};

export const ConfigError = (message?: string) => {
  return new HttpError('ConfigError', message ?? 'Config Error', 500);
};

export const PersistenceError = (message?: string) => {
  return new HttpError('PersistenceError', message ?? 'Persistence Error', 500);
};
