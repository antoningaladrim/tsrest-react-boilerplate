import { ChatCompletionMessage } from '@tsrest-react-boilerplate/api';
import { ChatbotResponse } from './ChatbotResponse';
import { UserMessage } from './UserMessage';

export const Conversation = ({
  messages,
  isPendingResponse,
}: {
  isPendingResponse: boolean;
  messages?: ChatCompletionMessage[];
}) => (
  <div className="flex-1 flex flex-col gap-6 overflow-y-scroll w-full items-center">
    {messages?.map((message, index) =>
      message.role === 'user' ? (
        <UserMessage key={index} content={message.content} />
      ) : (
        <ChatbotResponse key={index} content={message.content} />
      )
    )}
    {isPendingResponse && <div>Chargement...</div>}
  </div>
);
