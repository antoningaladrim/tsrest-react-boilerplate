import { Chat, ChatLayout } from '@/features/chat/components';

export const Home = () => (
  <ChatLayout>
    <Chat />
  </ChatLayout>
);

export const ErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};
