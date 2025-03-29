import { ChatCompletionMessage } from '@tsrest-react-boilerplate/api';
import { useCallback, useState } from 'react';

export const useMessageList = () => {
  const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);

  const addMessage = useCallback((message: ChatCompletionMessage) => {
    setMessages((messages) => [...messages, message]);
  }, []);

  return { messages, addMessage };
};
