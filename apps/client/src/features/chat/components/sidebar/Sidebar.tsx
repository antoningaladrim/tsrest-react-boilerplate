import LogoAdaly from '@/assets/logo-adaly.png';
import {
  Sidebar as AceternitySidebar,
  SidebarBody,
} from '@/components/ui/sidebar';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router';
import { Conversations } from './Conversations';
import { SignoutButton } from './SignoutButton';

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <AceternitySidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto gap-8">
          {open ? <AdalyLogo /> : <AdalyLogoIcon />}
          <Conversations />
        </div>
        <SignoutButton />
      </SidebarBody>
    </AceternitySidebar>
  );
};

const AdalyLogo = () => {
  return (
    <Link
      to="https://galadrim.fr/offres/intelligence-artificielle/"
      className="relative z-20 flex items-center space-x-2 py-1 font-normal text-black"
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
      className="relative z-20 flex items-center space-x-2 py-1 font-normal text-black"
    >
      <img src={LogoAdaly} alt="Logo Adaly" height={20} width={20} />
    </Link>
  );
};
