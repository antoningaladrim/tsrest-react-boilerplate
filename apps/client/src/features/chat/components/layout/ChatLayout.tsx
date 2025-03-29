import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

export const ChatLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative w-screen h-screen overflow-hidden border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800">
      <div className="flex h-full w-full">
        <Sidebar />

        {children}
      </div>
    </main>
  );
};
