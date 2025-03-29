import { Prompt } from '@tsrest-react-boilerplate/api';
import { ChangeEvent, useState } from 'react';

export const PromptInput = ({
  onPrompt,
  disabled,
}: {
  onPrompt: (message: Prompt) => Promise<void>;
  disabled: boolean;
}) => {
  const [input, setInput] = useState('');

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInput('');
    onPrompt({ role: 'user', content: input });
  };

  return (
    <form onSubmit={onSubmit} className="w-full mt-4">
      <input
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
