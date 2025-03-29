import { env } from '@/config/env';
import { Clerk } from '@clerk/clerk-js';
import { tsRestFetchApi } from '@ts-rest/core';
import { initTsrReactQuery } from '@ts-rest/react-query/v5';
import { apiRestContract } from '@tsrest-react-boilerplate/api';

const clerk = new Clerk(env.CLERK_PUBLISHABLE_KEY);
const clerkLoadPromise = clerk.load();

export const tsr = initTsrReactQuery(apiRestContract, {
  baseUrl: 'http://localhost:8000',
  baseHeaders: {
    'x-app-source': 'ts-rest',
    'Content-Type': 'application/json',
  },

  api: async (args) => {
    await clerkLoadPromise;
    const token = await clerk.session?.getToken();

    args.headers = {
      ...args.headers,
      Authorization: `Bearer ${token}`,
    };

    return tsRestFetchApi(args);
  },
});
