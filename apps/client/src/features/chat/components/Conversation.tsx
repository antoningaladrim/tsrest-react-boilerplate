import { ChatCompletionMessage } from '@tsrest-react-boilerplate/api';
import { ChatbotResponse } from './ChatbotResponse';
import { UserMessage } from './UserMessage';

export const Conversation = ({
  description,
  messages,
  isPendingResponse,
}: {
  description?: string;
  isPendingResponse: boolean;
  messages?: readonly ChatCompletionMessage[];
}) => (
  <div className="flex-1 flex flex-col gap-6 overflow-y-scroll w-full">
    {description && (
      <h1 className="text-2xl font-semibold text-neutral-100">{description}</h1>
    )}
    <div className="flex-1 flex flex-col gap-6 w-full items-center">
      {messages?.map((message, index) =>
        message.role === 'user' ? (
          <UserMessage key={index} content={message.content} />
        ) : (
          message.role === 'assistant' && (
            <ChatbotResponse key={index} content={message.content} />
          )
        )
      )}
      {isPendingResponse && <div>Chargement...</div>}
    </div>
  </div>
);
