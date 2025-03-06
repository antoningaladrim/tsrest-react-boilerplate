import cors from '@fastify/cors';
import app from './app';

const start = async () => {
  try {
    const port = parseInt(process.env.PORT ?? '8000') || 8000;

    await app.register(cors, {
      origin: 'http://localhost:4200',
    });

    console.log(`Listening on http://localhost:${port}`);

    await app.listen({ port });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
