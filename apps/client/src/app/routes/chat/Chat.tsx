import { paths } from '@/config/paths';
import {
  Chat,
  Conversation,
  NewChatWelcoming,
} from '@/features/chat/components';
import {
  DEFAULT_CHAT_DESCRIPTION,
  placeholderConversation,
  placeholderQueryResponse,
} from '@/features/chat/constants';
import {
  FindAllConversationQueryResult,
  FindConversationByIdQueryResult,
} from '@/features/chat/types';
import { tsr } from '@/lib/apiClient';
import { queryKeys } from '@/lib/queryKeys';
import { useCompletionModel } from '@/stores';
import { useQueryClient } from '@tanstack/react-query';
import { Prompt } from '@tsrest-react-boilerplate/api';
import { useNavigate, useParams } from 'react-router';

export const ChatRoute = () => {
  const { conversationId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: conversation } = tsr.conversation.findById.useQuery({
    queryKey: queryKeys.conversation.get(conversationId ?? ''),
    queryData: {
      params: { conversationId: conversationId ?? '' },
    },
    enabled: !!conversationId,
  });

  const {
    mutateAsync: prompt,
    isPending,
    variables,
  } = tsr.conversation.prompt.useMutation();

  const onPrompt = async (userPrompt: Prompt) => {
    const model = useCompletionModel.getState().model;

    // In this case a toast is sent from the Chat component
    if (model === undefined) return;

    if (conversationId === undefined) {
      queryClient.setQueryData(
        queryKeys.conversation.list(),
        (prev: FindAllConversationQueryResult) =>
          prev
            ? { ...prev, body: [...prev.body, placeholderConversation] }
            : placeholderQueryResponse
      );
    }

    await prompt(
      {
        body: {
          prompt: userPrompt,
          model,
          conversationId,
        },
      },
      {
        onSuccess: (result) => {
          if (conversationId === undefined) {
            queryClient.invalidateQueries({
              queryKey: queryKeys.conversation.list(),
            });
            navigate(paths.chat.getHref(result.body.conversationId), {
              replace: true,
            });
          } else {
            queryClient.setQueryData(
              queryKeys.conversation.get(conversationId),
              (prev: FindConversationByIdQueryResult) =>
                prev
                  ? {
                      ...prev,
                      body: {
                        ...prev.body,
                        prompts: [
                          ...prev.body.prompts,
                          userPrompt,
                          result.body.response,
                        ],
                      },
                    }
                  : result
            );
          }
        },
      }
    );
  };

  const conversationPrompts = conversation?.body.prompts ?? [];

  return (
    <Chat onPrompt={onPrompt} isPending={isPending}>
      {conversation !== undefined || isPending ? (
        <Conversation
          description={
            conversation?.body.description ?? DEFAULT_CHAT_DESCRIPTION
          }
          prompts={
            isPending
              ? [...conversationPrompts, variables.body.prompt]
              : conversationPrompts
          }
          isPendingResponse={isPending}
        />
      ) : (
        <NewChatWelcoming />
      )}
    </Chat>
  );
};
