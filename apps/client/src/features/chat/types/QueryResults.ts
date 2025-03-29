import { UseQueryResult } from '@ts-rest/react-query';
import { ConversationRestApiContract } from '@tsrest-react-boilerplate/api';

export type FindAllConversationQueryResult = UseQueryResult<
  typeof ConversationRestApiContract.findAll
>['data'];

export type FindConversationByIdQueryResult = UseQueryResult<
  typeof ConversationRestApiContract.findById
>['data'];
