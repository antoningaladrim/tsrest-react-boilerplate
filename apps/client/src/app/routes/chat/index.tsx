import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';
import { useClerk } from '@clerk/clerk-react';

export const Home = () => {
  const { signOut } = useClerk();

  const onSignOut = () => {
    signOut({ redirectUrl: paths.auth.login.getHref() });
  };

  return (
    <div>
      <p>Home</p>
      <Button onClick={onSignOut}>Logout</Button>
    </div>
  );
};

export const ErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};
