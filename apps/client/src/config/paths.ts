export const paths = {
  auth: {
    login: {
      path: '/',
      getHref: (redirectTo?: string | null | undefined) =>
        redirectTo ? `/?redirectTo=${encodeURIComponent(redirectTo)}` : '',
    },
  },

  chat: {
    path: '/chat',
    getHref: () => '/chat',
  },
} as const;
