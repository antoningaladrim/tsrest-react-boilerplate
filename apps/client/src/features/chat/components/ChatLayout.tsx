import LogoAdaly from '@/assets/logo-adaly.png';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { paths } from '@/config/paths';
import { useClerk } from '@clerk/clerk-react';
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from '@tabler/icons-react';
import { motion } from 'motion/react';
import { ReactNode, useState } from 'react';
import { Link } from 'react-router';

const links = [
  {
    type: 'link',
    label: 'Dashboard',
    to: '#',
    icon: (
      <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    type: 'link',
    label: 'Profile',
    to: '#',
    icon: (
      <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    type: 'link',
    label: 'Settings',
    to: '#',
    icon: (
      <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    type: 'link',
    label: 'Logout',
    to: '#',
    icon: (
      <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
] as const;

export const ChatLayout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const { signOut } = useClerk();

  const onSignOut = () => {
    signOut({ redirectUrl: paths.auth.login.getHref() });
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800">
      <div className="flex h-full w-full">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              {open ? <AdalyLogo /> : <AdalyLogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  type: 'button',
                  label: 'Logout',
                  onClick: onSignOut,
                  icon: (
                    <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>

        {children}
      </div>
    </main>
  );
};

export const AdalyLogo = () => {
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

export const AdalyLogoIcon = () => {
  return (
    <Link
      to="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <img src={LogoAdaly} alt="Logo Adaly" height={20} width={20} />
    </Link>
  );
};
