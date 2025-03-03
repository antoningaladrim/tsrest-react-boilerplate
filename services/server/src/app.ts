import Fastify from 'fastify';
import { addAuthRouter } from './presentation';
import {
  globalErrorHandler,
  routeNotFoundHandler,
} from './presentation/middleware/errors';

const app = Fastify();

app.get('/healthz', (_, res) => {
  res.send({ status: 'ok' });
});

addAuthRouter(app);

app.setNotFoundHandler(routeNotFoundHandler);
app.setErrorHandler(globalErrorHandler);

export default app;
