import { FlipWords } from '@/components/ui/flip-words';
import { Spotlight } from '@/components/ui/spotlight';
import { paths } from '@/config/paths';
import { tsr } from '@/lib/apiClient';
import { queryKeys } from '@/lib/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { Prompt } from '@tsrest-react-boilerplate/api';
import { useNavigate, useParams } from 'react-router';
import { Conversation } from './Conversation';
import { PromptInput } from './PromptInput';

const MODEL = 'llama3.2';

const words = ['news', 'geopolitics', 'weather', 'sports', 'entertainment'];

export const Chat = () => {
  const { conversationId } = useParams();

  const { data: conversation } = tsr.conversation.findById.useQuery({
    queryKey: queryKeys.conversation.get(conversationId ?? ''),
    queryData: {
      params: { conversationId: conversationId ?? '' },
    },
    enabled: !!conversationId,
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutateAsync: askMentor,
    error,
    isPending,
  } = tsr.conversation.prompt.useMutation();

  const onPrompt = async (userPrompt: Prompt) => {
    await askMentor(
      {
        body: {
          prompt: userPrompt,
          model: MODEL,
          conversationId: conversationId ?? null,
        },
      },
      {
        onSuccess: ({ body }) => {
          if (conversationId === undefined) {
            queryClient.invalidateQueries({
              queryKey: queryKeys.conversation.list(),
            });
            navigate(paths.chat.getHref(body.conversationId), {
              replace: true,
            });
          }
          queryClient.invalidateQueries({
            queryKey: queryKeys.conversation.get(conversationId ?? ''),
          });
        },
      }
    );
  };

  return (
    <section className="w-full h-full flex flex-col overflow-y-scroll items-center max-w-6xl mx-auto p-6 pt-10">
      {conversation?.body && conversation.body.prompts.length > 0 ? (
        <Conversation
          description={conversation.body.description}
          prompts={conversation.body.prompts}
          isPendingResponse={isPending}
        />
      ) : (
        <div className="flex-1 w-full flex items-center justify-center">
          <h1 className="text-neutral-400 text-3xl">
            Ask me about the <FlipWords words={words} />
          </h1>
        </div>
      )}
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <PromptInput onPrompt={onPrompt} disabled={isPending} />

      {error && <div>{(error as Error).message}</div>}
    </section>
  );
};
