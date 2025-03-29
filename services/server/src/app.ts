import { clerkPlugin } from '@clerk/fastify';
import Fastify from 'fastify';
import { addMessagesRouter } from './presentation';
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

addMessagesRouter(app);

app.addHook('preHandler', protectedRouteHandler);
app.setNotFoundHandler(routeNotFoundHandler);
app.setErrorHandler(globalErrorHandler);

export default app;
