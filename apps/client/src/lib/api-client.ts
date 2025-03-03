import { initTsrReactQuery } from '@ts-rest/react-query/v5';
import { apiRestContract } from '@tsrest-react-boilerplate/api';

export const tsr = initTsrReactQuery(apiRestContract, {
  baseUrl: 'http://localhost:8000',
  baseHeaders: {
    'x-app-source': 'ts-rest',
  },
});
