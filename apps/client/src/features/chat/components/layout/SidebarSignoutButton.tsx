import { SidebarLink } from '@/components/ui/sidebar';
import { paths } from '@/config/paths';
import { useClerk } from '@clerk/clerk-react';
import { IconLogout } from '@tabler/icons-react';

export const SidebarSignoutButton = () => {
  const { signOut } = useClerk();

  const onSignOut = () => {
    signOut({ redirectUrl: paths.auth.login.getHref() });
  };

  return (
    <div>
      <SidebarLink
        link={{
          type: 'button',
          label: 'Logout',
          onClick: onSignOut,
          icon: (
            <IconLogout className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
          ),
        }}
      />
    </div>
  );
};
