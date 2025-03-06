import { Button } from '@/components/ui/button';
import { tsr } from '@/lib/api-client';

export const Home = () => {
  const logout = async () => {
    await tsr.auth.logout.mutate({ body: undefined });
  };
  return (
    <div>
      <p>Home</p>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export const ErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};
