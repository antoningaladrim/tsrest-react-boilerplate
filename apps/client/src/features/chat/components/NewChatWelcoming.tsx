import { FlipWords } from '@/components/ui/flip-words';

const words = ['quantum physics', 'sports', 'history', 'litterature'];

export const NewChatWelcoming = () => (
  <div className="flex-1 w-full flex items-center justify-center">
    <h1 className="text-neutral-400 text-3xl">
      Ask me about <FlipWords words={words} />
    </h1>
  </div>
);
