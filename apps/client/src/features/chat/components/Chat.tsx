import { Spotlight } from '@/components/ui/spotlight';
import { tsr } from '@/lib/api-client';
import { ChatCompletionMessage } from '@tsrest-react-boilerplate/api';
import { useMessageList } from '../hooks';
import { Conversation } from './Conversation';
import { MessageInput } from './MessageInput';
import { FlipWords } from '@/components/ui/flip-words';

const MODEL = 'llama3.2';

const words = ['news', 'geopolitics', 'weather', 'sports', 'entertainment'];

export const Chat = () => {
  const { messages, addMessage } = useMessageList();
  const {
    mutateAsync: askMentor,
    error,
    isPending,
  } = tsr.messages.send.useMutation();

  const onSendChat = async (userMessage: ChatCompletionMessage) => {
    addMessage(userMessage);
    const updatedMessages = [...messages, userMessage];

    await askMentor(
      { body: { messages: updatedMessages, model: MODEL } },
      {
        onSuccess: ({ body: response }) => {
          addMessage(response);
        },
      }
    );
  };

  return (
    <section className="w-full h-full flex flex-col overflow-y-scroll items-center max-w-6xl mx-auto p-6">
      {messages.length === 0 ? (
        <div className="flex-1 w-full flex items-center justify-center">
          <h1 className="text-neutral-400 text-3xl">
            Ask me about the <FlipWords words={words} />
          </h1>
        </div>
      ) : (
        <Conversation messages={messages} isPendingResponse={isPending} />
      )}
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <MessageInput onSendChat={onSendChat} disabled={isPending} />

      {error && <div>{(error as Error).message}</div>}
    </section>
  );
};
