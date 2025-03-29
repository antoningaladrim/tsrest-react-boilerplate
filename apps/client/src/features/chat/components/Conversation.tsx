import { Prompt } from '@tsrest-react-boilerplate/api';
import { ChatbotResponse } from './ChatbotResponse';
import { UserPrompt } from './UserPrompt';
import { Spinner } from '@/components/ui/spinner';

export const Conversation = ({
  description,
  prompts,
  isPendingResponse,
}: {
  description: string;
  isPendingResponse: boolean;
  prompts?: readonly Prompt[];
}) => (
  <div className="flex-1 flex flex-col gap-6 overflow-y-scroll w-full">
    <h1 className="text-2xl font-semibold text-neutral-100">{description}</h1>

    <div className="flex-1 flex flex-col gap-8 w-full items-center">
      {prompts?.map((prompt, index) =>
        prompt.role === 'user' ? (
          <UserPrompt key={index} content={prompt.content} />
        ) : (
          prompt.role === 'assistant' && (
            <ChatbotResponse key={index} content={prompt.content} />
          )
        )
      )}

      {isPendingResponse && (
        <div className="flex justify-start w-full">
          <Spinner />
        </div>
      )}
    </div>
  </div>
);
