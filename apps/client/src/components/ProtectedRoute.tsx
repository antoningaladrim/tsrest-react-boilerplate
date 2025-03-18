import { paths } from '@/config/paths';
import { useAuth } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn } = useAuth();
  const location = useLocation();

  if (!isSignedIn) {
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};
