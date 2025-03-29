export const paths = {
  auth: {
    login: {
      path: '/',
      getHref: (redirectTo?: string | null | undefined) =>
        redirectTo ? `/?redirectTo=${encodeURIComponent(redirectTo)}` : '',
    },
  },

  chatLayout: {
    path: '/chat',
    getHref: () => '/chat',
  },

  chat: {
    path: '/chat/:conversationId?',
    getHref: (conversationId?: string) =>
      `/chat${conversationId ? `/${conversationId}` : ''}`,
  },
} as const;
