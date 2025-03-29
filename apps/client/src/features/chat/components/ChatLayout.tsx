import LogoAdaly from '@/assets/logo-adaly.png';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { paths } from '@/config/paths';
import { tsr } from '@/lib/apiClient';
import { queryKeys } from '@/lib/queryKeys';
import { useClerk } from '@clerk/clerk-react';
import { IconLogout, IconMessage } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { ReactNode, useState } from 'react';
import { Link } from 'react-router';

export const ChatLayout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const { data } = tsr.conversation.findAll.useQuery({
    queryKey: queryKeys.conversation.list(),
  });

  const conversations = data?.body ?? [];

  return (
    <main className="relative w-screen h-screen overflow-hidden border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800">
      <div className="flex h-full w-full">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              {open ? <AdalyLogo /> : <AdalyLogoIcon />}
              {conversations && (
                <div className="mt-8 flex flex-col gap-2">
                  {conversations.map((conversation, idx) => (
                    <SidebarLink
                      key={idx}
                      link={{
                        type: 'link',
                        label:
                          conversation.description ?? `Conversation ${idx + 1}`,
                        to: paths.chat.getHref(conversation.id),
                        icon: (
                          <IconMessage className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                        ),
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            <SignoutButton />
          </SidebarBody>
        </Sidebar>

        {children}
      </div>
    </main>
  );
};

const AdalyLogo = () => {
  return (
    <Link
      to="https://galadrim.fr/offres/intelligence-artificielle/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <img src={LogoAdaly} alt="Logo Adaly" height={20} width={20} />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Adaly Labs
      </motion.span>
    </Link>
  );
};

const AdalyLogoIcon = () => {
  return (
    <Link
      to="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <img src={LogoAdaly} alt="Logo Adaly" height={20} width={20} />
    </Link>
  );
};

const SignoutButton = () => {
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
