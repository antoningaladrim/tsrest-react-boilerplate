import { HttpError } from './HttpError.js';

export const BadRequestError = () => {
  return new HttpError('BadRequestError', 'Bad Request', 400);
};

export const UnauthorizedError = () => {
  return new HttpError('UnauthorizedError', 'Unauthorized', 401);
};

export const ForbiddenError = () => {
  return new HttpError('ForbiddenError', 'Forbidden', 403);
};

export const NotFoundError = () => {
  return new HttpError('NotFoundError', 'Resource Not Found', 404);
};

export const InternalServerError = () => {
  return new HttpError('InternalServerError', 'Internal Server Error', 500);
};

export const TooManyRequestsError = () => {
  return new HttpError('TooManyRequestsError', 'Too Many Requests', 429);
};

export const RequestTimeoutError = () => {
  return new HttpError('RequestTimeoutError', 'Request Timeout', 408);
};
