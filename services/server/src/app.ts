import { clerkPlugin } from '@clerk/fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { generateOpenApi } from '@ts-rest/open-api';
import { apiRestContract } from '@tsrest-react-boilerplate/api';
import Fastify from 'fastify';
import { addConversationRouter, addModelRouter } from './presentation';
import {
  globalErrorHandler,
  protectedRouteHandler,
  routeNotFoundHandler,
} from './presentation/middleware';

const openApiDocument = generateOpenApi(apiRestContract, {
  info: {
    title: 'Adaly chat API',
    version: '1.0.0',
  },
});

const app = Fastify();

app
  .register(fastifySwagger, {
    transformObject: () => openApiDocument,
  })
  .register(fastifySwaggerUI, {
    routePrefix: '/docs',
  });

app.register(clerkPlugin);

app.get('/healthz', (_, res) => {
  res.send({ status: 'ok' });
});

addConversationRouter(app);
addModelRouter(app);

app.addHook('preHandler', protectedRouteHandler);
app.setNotFoundHandler(routeNotFoundHandler);
app.setErrorHandler(globalErrorHandler);

export default app;
