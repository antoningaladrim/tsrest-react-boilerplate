export const queryKeys = {
  conversation: {
    list: () => ['conversation', 'list'],
    get: (conversationId: string) => ['conversation', conversationId],
  },
};
