import { SidebarLink } from '@/components/ui/sidebar';
import { paths } from '@/config/paths';
import { IconPlus } from '@tabler/icons-react';

export const NewConversationButton = () => (
  <SidebarLink
    link={{
      to: paths.chatLayout.getHref(),
      type: 'link',
      label: 'New conversation',
      icon: (
        <IconPlus className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    }}
  />
);
