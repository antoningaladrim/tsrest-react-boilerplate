import { SidebarLink } from '@/components/ui/sidebar';
import { paths } from '@/config/paths';
import { tsr } from '@/lib/apiClient';
import { queryKeys } from '@/lib/queryKeys';
import { IconMessage } from '@tabler/icons-react';
import { SidebarNewConversationButton } from './SidebarNewConversationButton';

export const SidebarConversations = () => {
  const { data } = tsr.conversation.findAll.useQuery({
    queryKey: queryKeys.conversation.list(),
  });

  if (!data?.body) return <SidebarNewConversationButton />;

  const conversations = data.body;

  return (
    <div className="flex flex-col gap-2">
      <SidebarNewConversationButton />
      {conversations.map((conversation, idx) => (
        <SidebarLink
          key={idx}
          link={{
            type: 'link',
            label: conversation.description ?? `Conversation ${idx + 1}`,
            to: paths.chat.getHref(conversation.id),
            icon: (
              <IconMessage className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
          }}
        />
      ))}
    </div>
  );
};
