import { ChatLayout } from '@/features/chat/components/Sidebar';

export const Home = () => {
  return <ChatLayout>Chat</ChatLayout>;
};

export const ErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};
