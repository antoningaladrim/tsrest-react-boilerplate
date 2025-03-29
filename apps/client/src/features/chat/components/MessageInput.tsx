import { ChatCompletionMessage } from '@tsrest-react-boilerplate/api';
import { ChangeEvent, useState } from 'react';

export const MessageInput = ({
  onSendChat,
  disabled,
}: {
  onSendChat: (message: ChatCompletionMessage) => Promise<void>;
  disabled: boolean;
}) => {
  const [input, setInput] = useState('');

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInput('');
    onSendChat({ role: 'user', content: input });
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <input
        name="prompt"
        value={input}
        onChange={onInputChange}
        placeholder="Ask a question"
        className="h-20 w-full rounded-xl p-4 font-medium text-neutral-200 dark:bg-zinc-900 outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-neutral-400 focus-visible:outline-none placeholder:text-neutral-400 focus-visible:ring-[2px] transition duration-400 border-none"
        disabled={disabled}
      />
      <button type="submit" />
    </form>
  );
};
