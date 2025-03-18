import { clerkPlugin } from '@clerk/fastify';
import Fastify from 'fastify';
import {
  globalErrorHandler,
  protectedRouteHandler,
  routeNotFoundHandler,
} from './presentation/middleware';

const app = Fastify();

app.register(clerkPlugin);

app.get('/healthz', (_, res) => {
  res.send({ status: 'ok' });
});

app.addHook('preHandler', protectedRouteHandler);
app.setNotFoundHandler(routeNotFoundHandler);
app.setErrorHandler(globalErrorHandler);

export default app;
