import { Prompt } from '@tsrest-react-boilerplate/api';
import { PropsWithChildren } from 'react';
import { ModelSelector } from './ModelSelector';
import { PromptInput } from './PromptInput';

type ChatProps = PropsWithChildren<{
  onPrompt: (prompt: Prompt) => Promise<void>;
  isPending: boolean;
}>;

export const Chat = ({ children, onPrompt, isPending }: ChatProps) => (
  <section className="w-full h-full flex flex-col overflow-y-scroll items-center max-w-6xl mx-auto p-6 pt-10">
    {children}

    <ModelSelector />
    <PromptInput onPrompt={onPrompt} disabled={isPending} />
  </section>
);
