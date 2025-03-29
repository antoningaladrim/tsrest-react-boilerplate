import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Sidebar } from '@/features/chat/components';
import { Outlet } from 'react-router';

export const ChatLayoutRoute = () => (
  <ProtectedRoute>
    <main className="relative w-screen h-screen overflow-hidden border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800">
      <div className="flex h-full w-full">
        <Sidebar />
        <Outlet />
      </div>
    </main>
  </ProtectedRoute>
);
